import {
  collection, DocumentData, getDocs, limit, orderBy, Query, query, QueryDocumentSnapshot, startAfter, where,
} from 'firebase/firestore';
import { FilmDto } from '../dto/film.dto';

import { dataBase } from './firebase';
import { FilmMapper } from '../mappers/film.mapper';
import { FilmWithId } from '../models/film-with-id';
import { CollectionDto } from '../dto/collection.dto';

/**
 * Service that provide films.
 */
export namespace FilmsService {
  export type SortDirection = 'desc' | 'asc';
  export type PageDirection = 'previous' | 'next';

  /** Field to sort by. */
  export type SortedColumns =
    | 'title'
    | 'director'
    | 'producer'
    | 'created';

  /**
   * Cursors to get other pages.
   */
  export interface Cursors {
    /** Last visible doc as cursor. */
    readonly lastVisibleDocCursor: QueryDocumentSnapshot<CollectionDto<FilmDto>> | null;

    /** First visible doc as cursor. */
    readonly firstVisibleDocCursor: QueryDocumentSnapshot<CollectionDto<FilmDto>> | null;
  }
  /**
   * Parameters from table to get films fo it.
   */
  export interface TableFilmsParameters {

    /** Quantity of films. */
    readonly limitFilms: number;

    /** Filed to sort by. */
    readonly sortField: SortedColumns;

    /** Direction of sort. */
    readonly sortKey: SortDirection;

    /** String to search in title of film. */
    readonly searchString: string;

    /** Cursors for pagination. */
    readonly cursors: Cursors;
  }

  type FieldDtoMapper = {
    [n in SortedColumns]: string;
  };

  const fieldDtoMapper: FieldDtoMapper = {
    title: 'title',
    director: 'director',
    producer: 'producer',
    created: 'created',
  };

  /** Firestore. */
  const firestore = dataBase;

  /** Default path collection. */
  const pathCollection = 'films';

  /** Default sort to field by. */
  const defaultSortField = 'title';

  /**
   * Get films with reference.
   * @param paginationQuery Query to get films from.
   * @param limitData Limit of films.
   * @param shouldReverse Should get reversed films.
   */
  export async function fetchFilms(
    paginationQuery: Query<CollectionDto<FilmDto>>,
    limitData: number,
    shouldReverse = false,
  ): Promise<{ films: FilmWithId[]; cursors: Cursors; }> {
    let lastVisibleDocCursor: QueryDocumentSnapshot<CollectionDto<FilmDto>>;
    let firstVisibleDocCursor: QueryDocumentSnapshot<CollectionDto<FilmDto>>;
    return getDocs(paginationQuery)
      .then(querySnapshot => {
        if (querySnapshot.docs.length !== 0) {
          let lastDocIdx;
          if (querySnapshot.docs.length < limitData) {
            lastDocIdx = querySnapshot.docs.length - 1;
          } else {
            lastDocIdx = limitData - 1;
          }
          if (shouldReverse) {
            lastVisibleDocCursor = querySnapshot.docs[0] as QueryDocumentSnapshot<CollectionDto<FilmDto>>;
            firstVisibleDocCursor = querySnapshot.docs[lastDocIdx] as QueryDocumentSnapshot<CollectionDto<FilmDto>>;
          } else {
            lastVisibleDocCursor = querySnapshot.docs[lastDocIdx] as QueryDocumentSnapshot<CollectionDto<FilmDto>>;
            firstVisibleDocCursor = querySnapshot.docs[0] as QueryDocumentSnapshot<CollectionDto<FilmDto>>;
          }
        }
        return querySnapshot.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }));
      })
      .then(collectionDtos => collectionDtos.map(dto => ({
        id: dto.id,
        ...FilmMapper.getFromDto(dto.data),
      } as FilmWithId)))
      .then(films => (shouldReverse ? films.reverse() : films))
      .then(films => ({
        cursors: {
          lastVisibleDocCursor,
          firstVisibleDocCursor,
        } as Cursors,
        films,
      }));
  }

  /**
   * Get reference to fetch films for pagination.
   * @param tableFilmsParameters Parameters to get films.
   * @param pageDirection Direction to take films from.
   */
  export function getPaginationQuery(
    tableFilmsParameters: TableFilmsParameters,
    pageDirection: PageDirection | null,
  ): Query<CollectionDto<FilmDto>> {
    const {
      limitFilms,
      sortField,
      sortKey,
      searchString,
      cursors: {
        lastVisibleDocCursor,
        firstVisibleDocCursor,
      },
    } = tableFilmsParameters;
    const referenceCollection = collection(firestore, pathCollection);
    let cursor: QueryDocumentSnapshot<CollectionDto<FilmDto>> | null;
    let paginationQuery: Query<DocumentData>;

    // const querySnapshot = await getDocs(query(referenceCollection));
    if (pageDirection === 'next') {
      cursor = lastVisibleDocCursor;
    } else if (pageDirection === 'previous') {
      cursor = firstVisibleDocCursor;
    } else {
      cursor = null;
    }
    // If search string is not empty we sort by default field.
    // Also, if we get films in first time, we should get them all.
    if (searchString.trim().length !== 0 && cursor) {
      paginationQuery = query(
        referenceCollection,
        where(`fields.${defaultSortField}`, '>=', searchString.trim()),
        where(`fields.${defaultSortField}`, '<=', `${searchString.trim()}\uf8ff`),
        orderBy(`fields.${defaultSortField}`, sortKey),
        startAfter(cursor),
        limit(limitFilms),
      );
    } else if (searchString.trim().length !== 0 && !cursor) {
      paginationQuery = query(
        referenceCollection,
        where(`fields.${defaultSortField}`, '>=', searchString.trim()),
        where(`fields.${defaultSortField}`, '<=', `${searchString.trim()}\uf8ff`),
        orderBy(`fields.${defaultSortField}`, sortKey),
      );
    } else if (searchString.trim().length === 0 && cursor) {
      paginationQuery = query(
        referenceCollection,
        orderBy(`fields.${fieldDtoMapper[sortField]}`, sortKey),
        startAfter(cursor),
        limit(limitFilms),
      );
    } else {
      paginationQuery = query(
        referenceCollection,
        orderBy(`fields.${fieldDtoMapper[sortField]}`, sortKey),
      );
    }
    return (paginationQuery as Query<CollectionDto<FilmDto>>);
  }

  /**
   * Getting films from firestore for table.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  export function getFilms(
    tableFilmsParameters: TableFilmsParameters,
  ): Promise<{ films: FilmWithId[]; cursors: Cursors; }> {
    const { limitFilms } = tableFilmsParameters;
    const collectionRef = getPaginationQuery(tableFilmsParameters, null);
    return fetchFilms(collectionRef, limitFilms);
  }

  /**
   * Get films with given parameters for next page.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  export function getNextPage(
    tableFilmsParameters: TableFilmsParameters,
  ): Promise<{ films: FilmWithId[]; cursors: Cursors; }> {
    const { limitFilms } = tableFilmsParameters;

    const collectionRef = getPaginationQuery(tableFilmsParameters, 'next');

    return fetchFilms(collectionRef, limitFilms);
  }

  /**
   * Get films with given parameters for previous page.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  export function getPreviousPage(
    tableFilmsParameters: TableFilmsParameters,
  ): Promise<{ films: FilmWithId[]; cursors: Cursors; }> {
    const {
      limitFilms, sortKey,
    } = tableFilmsParameters;

    // It needs to make pagination, we should reverse sort key to take previous page,and limit films,
    // then we reverse films again to get them in right order.
    const reversedSortKey: SortDirection = sortKey === 'asc' ? 'desc' : 'asc';
    const paginationQuery = getPaginationQuery(
      {
        ...tableFilmsParameters,
        sortKey: reversedSortKey,
      },
      'previous',
    );

    // Get reverses data because we reverse earlier.
    return fetchFilms(paginationQuery, limitFilms, true);
  }
}

import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';

import { FilmMapper } from '../mappers/film.mapper';
import { Film } from '../models/film';
import { CollectionDto } from '../mappers/dto/collection.dto';
import { FilmDto } from '../mappers/dto/film.dto';
import { FilmWithIdMapperMapper } from '../mappers/film-with-id.mapper';

export type SortDirection = 'desc' | 'asc';
export type PageDirection = 'previous' | 'next';

/** Field to sort by.*/
export type SortColumns = keyof Pick<Film, 'title' | 'director' | 'producer' | 'created'>;

/**
 * Film model with id.
 */
export interface FilmWithId extends Film {

  /** Id of film. */
  readonly id: string;
}

/**
 * Parameters from table to get films fo it.
 */
export interface TableFilmsParameters {

  /** Quantity of films. */
  readonly limitFilms: number;

  /** Filed to sort by. */
  readonly sortField: SortColumns;

  /** Direction of sort. */
  readonly sortKey: SortDirection;

  /** String to search in title of film. */
  readonly searchString: string;
}

type FieldDtoMapper = {
  [n in SortColumns ]: string;
};

/** Convert sorted columns names into collection name.*/
const fieldDtoMapper: FieldDtoMapper = {
  title: 'title',
  director: 'director',
  producer: 'producer',
  created: 'created',
};

/**
 * Service that provide films.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  public constructor(
    private readonly firestore: AngularFirestore,
    private readonly filmMapper: FilmMapper,
    private readonly filmWithIdMapperMapper: FilmWithIdMapperMapper,

  ) {}

  /** Default path collection.*/
  private readonly pathCollection: string = 'films';

  /** Default sort to field by.*/
  private readonly defaultSortField: keyof Film = 'title';

  /** Last visible doc as cursor to paginate data. */
  private lastVisibleDocCursor: QueryDocumentSnapshot<CollectionDto<FilmDto>> | null = null;

  /** First visible doc as cursor to paginate data. */
  private firstVisibleDocCursor: QueryDocumentSnapshot<CollectionDto<FilmDto>> | null = null;

  /**
   * Getting films.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  public getFilms(tableFilmsParameters: TableFilmsParameters): Observable<FilmWithId[]> {
    const { limitFilms } = tableFilmsParameters;
    const collectionRef = this.getPaginationReference(tableFilmsParameters, null);
    return this.getFilmSnapshotChanges(collectionRef, limitFilms);
  }

  /**
   * Get films with given parameters for next page.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  public getNextPage(tableFilmsParameters: TableFilmsParameters): Observable<FilmWithId[]> {
    const { limitFilms } = tableFilmsParameters;

    const collectionRef = this.getPaginationReference(tableFilmsParameters, 'next');

    return this.getFilmSnapshotChanges(collectionRef, limitFilms);
  }

  /**
   * Get films with given parameters for previous page.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  public getPreviousPage(tableFilmsParameters: TableFilmsParameters): Observable<FilmWithId[]> {
    const { limitFilms, sortField, sortKey, searchString } = tableFilmsParameters;

    // It need to make pagination, we should reverse sort key to take previous page,and limit films,
    // then we reverse films again to get them in right order.
    const reversedSortKey: SortDirection = sortKey === 'asc' ? 'desc' : 'asc';
    const collectionRef = this.getPaginationReference(
      { limitFilms, sortField, sortKey: reversedSortKey, searchString },
      'previous',
    );

    // Reverse data, if we reversed it earlier.
    return this.getFilmSnapshotChanges(collectionRef, limitFilms, true);
  }

  /**
   * Get films with reference.
   * @param collectionRef Reference to get films from.
   * @param limitData Limit of films.
   * @param shouldReverse Should get reversed films.
   */
  private getFilmSnapshotChanges(collectionRef: AngularFirestoreCollection<unknown>,
    limitData: number, shouldReverse = false): Observable<FilmWithId[]> {
    return collectionRef.snapshotChanges().pipe(
      tap(data => {
        if (data.length !== 0) {
          let lastDocIdx;
          if (data.length < limitData) {
            lastDocIdx = data.length - 1;
          } else {
            lastDocIdx = limitData - 1;
          }
          this.lastVisibleDocCursor = data[lastDocIdx].payload.doc as QueryDocumentSnapshot<CollectionDto<FilmDto>>;
          this.firstVisibleDocCursor = data[0].payload.doc as QueryDocumentSnapshot<CollectionDto<FilmDto>>;
        }
      }),
      map(data => data.map(docChange => this.filmWithIdMapperMapper.getFromDto(
          docChange.payload.doc.data() as CollectionDto<FilmDto>,
          docChange.payload.doc.id,
      ))),
      map(films => shouldReverse ? films.reverse() : films),
    );
  }

  /**
   * Get reference to fetch films for pagination.
   * @param tableFilmsParameters Parameters to get films.
   * @param pageDirection Direction to take films from.
   */
  private getPaginationReference(
    tableFilmsParameters: TableFilmsParameters,
    pageDirection: PageDirection | null,
  ): AngularFirestoreCollection<unknown> {
    const { limitFilms, sortField, sortKey, searchString } = tableFilmsParameters;
    let collectionRef;
    let cursor: QueryDocumentSnapshot<CollectionDto<FilmDto>> | null;
    if (pageDirection === 'previous') {
      cursor = this.firstVisibleDocCursor;
    } else if (pageDirection === 'next') {
      cursor = this.lastVisibleDocCursor;
    } else {
      cursor = null;
    }

    // If search string is not empty we sort by default field.
    // Also, if we get films in first time, we should get them all.
    if (searchString.trim().length !== 0 && cursor) {
      collectionRef = this.firestore.collection(this.pathCollection, ref => ref
        .where(`fields.${this.defaultSortField}`, '>=', searchString.trim())
        .where(`fields.${this.defaultSortField}`, '<=', `${searchString.trim()}\uf8ff`)
        .orderBy(`fields.${this.defaultSortField}`, sortKey)
        .startAfter(cursor)
        .limit(limitFilms));
    } else if (searchString.trim().length !== 0 && !cursor) {
      collectionRef = this.firestore.collection(this.pathCollection, ref => ref
        .where(`fields.${this.defaultSortField}`, '>=', searchString.trim())
        .where(`fields.${this.defaultSortField}`, '<=', `${searchString.trim()}\uf8ff`)
        .orderBy(`fields.${this.defaultSortField}`, sortKey));
    } else if (searchString.trim().length === 0 && cursor) {
      collectionRef = this.firestore.collection(this.pathCollection, ref => ref
        .orderBy(`fields.${fieldDtoMapper[sortField]}`, sortKey)
        .startAfter(cursor)
        .limit(limitFilms));
    } else {
      collectionRef = this.firestore.collection(this.pathCollection, ref => ref
        .orderBy(`fields.${fieldDtoMapper[sortField]}`, sortKey));
    }
    return collectionRef;
  }
}

import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';

import { FilmMapper } from '../mappers/film.mapper';
import { Film } from '../models/film';
import { CollectionDto } from '../mappers/dto/collection.dto';
import { FilmDto } from '../mappers/dto/film.dto';

export type SortDirection = 'desc' | 'asc';
export type PageDirection = 'previous' | 'next';

/**
 * Parameters from table to get films fo it.
 */
export interface TableFilmsParameters{

  /** Quantity of films. */
  readonly limitFilms: number;

  /** Filed to sort by. */
  readonly sortField: keyof FilmDto;

  /** Direction of sort. */
  readonly sortKey: SortDirection;

  /** String to search in title of film. */
  readonly searchString: string;
}

/**
 * Service that provide films for table.
 */
@Injectable({
  providedIn: 'root',
})
export class TableFilms {

  public constructor(private readonly firestore: AngularFirestore, private readonly filmMapper: FilmMapper) {
  }

  /** Last visible doc as cursor to paginate data. */
  private lastVisibleDocPaginator: QueryDocumentSnapshot<FilmDto> | null = null;

  /** First visible doc as cursor to paginate data. */
  private firstVisibleDocPaginator: QueryDocumentSnapshot<FilmDto> | null = null;

  /**
   * Getting films from firestore for table.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  public getFilms(tableFilmsParameters: TableFilmsParameters): Observable<Film[]> {
    const { limitFilms, sortField, sortKey, searchString } = tableFilmsParameters;
    const pathCollection = 'films';
    const defaultSortField = 'title';
    let collectionRef;
    if (searchString.trim().length !== 0) {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .where(`fields.${defaultSortField}`, '>=', searchString.trim())
        .where(`fields.${defaultSortField}`, '<=', `${searchString.trim()}\uf8ff`)
        .orderBy(`fields.${defaultSortField}`, sortKey));
    } else {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .orderBy(`fields.${sortField}`, sortKey));
    }

    return this.getFilmSnapshotChanges(collectionRef, limitFilms);
  }

  /**
   * Get films with given parameters for next page.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  public getNextPage(tableFilmsParameters: TableFilmsParameters): Observable<Film[]> {
    const { limitFilms } = tableFilmsParameters;

    const collectionRef = this.getPaginationReference(tableFilmsParameters, 'next');

    return this.getFilmSnapshotChanges(collectionRef, limitFilms);
  }

  /**
   * Get films with given parameters for previous page.
   * @param tableFilmsParameters Parameters to get films from database to table.
   */
  public getPreviousPage(tableFilmsParameters: TableFilmsParameters): Observable<Film[]> {
    const { limitFilms, sortField, sortKey, searchString } = tableFilmsParameters;

    // It need to make pagination, we should reverse sort key to take previous page,and limit films,
    // then we reverse films again to get them in right order.
    const reversedSortKey: SortDirection = sortKey === 'asc' ? 'desc' : 'asc';
    const collectionRef = this.getPaginationReference(
      { limitFilms, sortField, sortKey: reversedSortKey, searchString },
      'previous',
    );

    // Get reverses data because we reverse earlier.
    return this.getFilmSnapshotChanges(collectionRef, limitFilms, true);
  }

  /**
   * Getting sorted data from firestore with pathname.
   * @param pathCollection Collection pathname.
   * @param sortKey Fields to sort by.
   */
  public getSortedDataByKey(pathCollection: string,
    sortKey: string): Observable<Film[]> {
    const collectionRef = this.firestore.collection(pathCollection, ref => ref.orderBy(`fields/${sortKey}`));
    return collectionRef.valueChanges().pipe(
      map(data => data.map(filmDoc => this.filmMapper.getFromDto(filmDoc as CollectionDto<FilmDto>))),
    );
  }

  /**
   * Get data with reference from database.
   * @param collectionRef Reference to get data from.
   * @param limitData Limit of data.
   * @param shouldReverse Should get reversed data.
   */
  private getFilmSnapshotChanges(collectionRef: AngularFirestoreCollection<unknown>,
    limitData: number, shouldReverse = false): Observable<Film[]> {
    let films$ = collectionRef.snapshotChanges().pipe(
      tap(data => {
        if (data.length !== 0) {
          let lastDocIdx;
          if (data.length < limitData) {
            lastDocIdx = data.length - 1;
          } else {
            lastDocIdx = limitData - 1;
          }
          this.lastVisibleDocPaginator = data[lastDocIdx].payload.doc as QueryDocumentSnapshot<FilmDto>;
          this.firstVisibleDocPaginator = data[0].payload.doc as QueryDocumentSnapshot<FilmDto>;
        }
      }),
      map(data => data.map(docChange => docChange.payload.doc.data())),
      map(data => data.map(filmDoc => this.filmMapper.getFromDto(filmDoc as CollectionDto<FilmDto>))),
    );
    if (shouldReverse) {
      films$ = films$.pipe(
        map(data => data.reverse()),
      );
    }
    return films$;
  }

  /**
   * Get reference to fetch films for pagination.
   * @param tableFilmsParameters Parameters to get films from database to table.
   * @param pageDirection Direction to take data from.
   */
  private getPaginationReference(tableFilmsParameters: TableFilmsParameters,
    pageDirection: PageDirection): AngularFirestoreCollection<unknown> {
    const { limitFilms, sortField, sortKey, searchString } = tableFilmsParameters;
    const pathCollection = 'films';
    const defaultSortField = 'title';
    let collectionRef;
    let cursor: QueryDocumentSnapshot<FilmDto> | null;
    if (pageDirection === 'previous') {
      cursor = this.firstVisibleDocPaginator;
    } else {
      cursor = this.lastVisibleDocPaginator;
    }
    if (searchString.trim().length !== 0) {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .where(`fields.${defaultSortField}`, '>=', searchString)
        .where(`fields.${defaultSortField}`, '<=', `${searchString}\uf8ff`)
        .orderBy(`fields.${defaultSortField}`, sortKey)
        .startAfter(cursor)
        .limit(limitFilms));
    } else {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .orderBy(`fields.${sortField}`, sortKey)
        .startAfter(cursor)
        .limit(limitFilms));
    }
    return collectionRef;
  }

}
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';

import { FilmMapper } from '../mappers/film.mapper';
import { FilmModel } from '../models/film.model';
import { CollectionDTO } from '../mappers/dto/collectionDTO';
import { FilmDTO } from '../mappers/dto/filmDTO';

/**
 * Firestore database.
 */
@Injectable({
  providedIn: 'root',
})
export class Database {

  public constructor(private firestore: AngularFirestore, private filmMapper: FilmMapper) {
  }

  /** Last visible doc as cursor to paginate data. */
  public lastVisibleDocPaginator: QueryDocumentSnapshot<FilmDTO> | null = null;

  /** First visible doc as cursor to paginate data. */
  public firstVisibleDocPaginator: QueryDocumentSnapshot<FilmDTO> | null = null;

  /**
   * Getting data from firestore with pathname.
   * @param pathCollection Collection pathname.
   */
  public getData = (pathCollection: string): Observable<FilmModel[]> => {
      const collectionRef = this.firestore.collection(pathCollection);
      return collectionRef.valueChanges().pipe(
        map(data => data.map(filmDoc => this.filmMapper.getFromDto(filmDoc as CollectionDTO<FilmDTO>))),
      );
  };

  /**
   * Getting films from firestore for table.
   *  @param limitFilms Quantity of films to fetch.
   *  @param sortField Field name to sort by.
   *  @param sortKey Sort key to sort by.
   *  @param searchString String to search in data.
   */
  public getFilms = (limitFilms: number, sortField: string, sortKey: 'desc' | 'asc', searchString: string): Observable<FilmModel[]> => {
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
  };

  /**
   * Get films of next page.
   * @param limitFilms Quantity of films to fetch.
   * @param sortField Field name to sort by.
   * @param sortKey Sort key to sort by.
   *  @param searchString String to search in data.
   */
  public getNextPage = (limitFilms: number, sortField: string, sortKey: 'desc' | 'asc', searchString: string): Observable<FilmModel[]> => {
    const pathCollection = 'films';
    const defaultSortField = 'title';
    let collectionRef;
    if (searchString.trim().length !== 0) {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .where(`fields.${defaultSortField}`, '>=', searchString)
        .where(`fields.${defaultSortField}`, '<=', `${searchString}\uf8ff`)
        .orderBy(`fields.${defaultSortField}`, sortKey)
        .startAfter(this.lastVisibleDocPaginator)
        .limit(limitFilms));
    } else {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .orderBy(`fields.${sortField}`, sortKey)
        .startAfter(this.lastVisibleDocPaginator)
        .limit(limitFilms));
    }
    return this.getFilmSnapshotChanges(collectionRef, limitFilms);
  };

  /**
   * Get next page of films.
   * @param limitFilms Quantity of films to fetch.
   *  @param sortField Field name to sort by.
   *  @param sortKey Sort key to sort by.
   *  @param searchString String to search in data.
   */
  public getPreviousPage = (limitFilms: number, sortField: string,
                            sortKey: 'desc' | 'asc', searchString: string): Observable<FilmModel[]> => {
    const pathCollection = 'films';
    let reversedSortKey: 'desc' | 'asc';
    const defaultSortField = 'title';
    let collectionRef;

    // It need to make pagination, we should reverse sort key to take pre
    if (sortKey === 'asc') {
      reversedSortKey = 'desc';
    } else {
      reversedSortKey = 'asc';
    }
    if (searchString.trim().length !== 0) {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .where(`fields.${defaultSortField}`, '>=', searchString)
        .where(`fields.${defaultSortField}`, '<=', `${searchString}\uf8ff`)
        .orderBy(`fields.${defaultSortField}`, reversedSortKey)
        .startAfter(this.firstVisibleDocPaginator)
        .limit(limitFilms));
    } else {
      collectionRef = this.firestore.collection(pathCollection, ref => ref
        .orderBy(`fields.${sortField}`, reversedSortKey)
        .startAfter(this.firstVisibleDocPaginator)
        .limit(limitFilms));
    }

    // Get reverses data because we reverse earlier.
    return this.getFilmSnapshotChanges(collectionRef, limitFilms, true);
  };

  /**
   * Getting sorted data from firestore with pathname.
   * @param pathCollection Collection pathname.
   * @param sortKey Fields to sort by.
   */
  public getSortedDataByKey = (pathCollection: string, sortKey: string): Observable<FilmModel[]> => {
      const collectionRef = this.firestore.collection(pathCollection, ref => ref.orderBy(`fields/${sortKey}`));
      return collectionRef.valueChanges().pipe(
        map(data => data.map(filmDoc => this.filmMapper.getFromDto(filmDoc as CollectionDTO<FilmDTO>))),
      );
    };

  /**
   * Get data with reference from database.
   * @param collectionRef Reference to get data from.
   * @param limitData Limit of data.
   * @param shouldReverse Should get reversed data.
   */
  private getFilmSnapshotChanges = (collectionRef: AngularFirestoreCollection<unknown>,
                                    limitData: number, shouldReverse = false): Observable<FilmModel[]> => {
    let films$ = collectionRef.snapshotChanges().pipe(
      tap(data => {
        if (data.length !== 0) {
          let lastDocIdx;
          if (data.length < limitData) {
            lastDocIdx = data.length - 1;
          } else {
            lastDocIdx = limitData - 1;
          }
          this.lastVisibleDocPaginator = data[lastDocIdx].payload.doc as QueryDocumentSnapshot<FilmDTO>;
          this.firstVisibleDocPaginator = data[0].payload.doc as QueryDocumentSnapshot<FilmDTO>;
        }
      }),
      map(data => data.map(docChange => docChange.payload.doc.data())),
      map(data => data.map(filmDoc => this.filmMapper.getFromDto(filmDoc as CollectionDTO<FilmDTO>))),
    );
    if (shouldReverse) {
      films$ = films$.pipe(
        map(data => data.reverse()),
      );
    }
    return films$;
  };

}

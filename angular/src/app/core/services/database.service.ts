import { Injectable } from '@angular/core';

import {collection, DocumentData, Firestore, getDocs, orderBy, query, QuerySnapshot} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class Database {

  constructor(private firestore:Firestore) {}
    /**
     * Getting data from firestore with pathname.
     * @param pathCollection Collection pathname.
     */
    getData = (pathCollection: string): Promise<QuerySnapshot<DocumentData>> => getDocs(collection(this.firestore, pathCollection));

    /**
     * Getting sorted data from firestore with pathname.
     * @param pathCollection Collection pathname.
     * @param sortKey Fields to sort by.
     */
    getSortedDataByKey = (pathCollection: string, sortKey: string): Promise<QuerySnapshot<DocumentData>> => {
      const queryWithSorting = query(collection(this.firestore, pathCollection), orderBy(`fields/${sortKey}`));
      return getDocs(queryWithSorting);
    };


}

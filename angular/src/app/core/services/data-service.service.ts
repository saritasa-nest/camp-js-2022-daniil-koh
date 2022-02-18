import { Injectable } from '@angular/core';
import {collection, DocumentData, Firestore, getDocs, QuerySnapshot} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private firestore:Firestore) {
    /**
     * Getting data from db with pathname.
     * @param pathCollection Collection pathname.
     */
    const getData = (pathCollection: string): Promise<QuerySnapshot<DocumentData>> => getDocs(collection(this.firestore, pathCollection));

    /**
     * Getting sorted data from db with pathname.
     * @param pathCollection Collection pathname.
     * @param sortKey Fields to sort by.
     */
    const getSortedDataByKey = (pathCollection: string, sortKey: string): Promise<QuerySnapshot<DocumentData>> => {
      const queryWithSorting = query(collection(db, pathCollection), orderBy(`fields/${sortKey}`));
      return getDocs(queryWithSorting);
    };

    /**
     * Sign in web app.
     * @param email Email.
     * @param password Password.
     */
    const signIn = async(email: string, password: string): Promise<void> => {
      await signInWithEmailAndPassword(auth, email, password);
    };

  }
}

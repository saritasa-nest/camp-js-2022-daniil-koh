import { collection, DocumentData, getDocs, QuerySnapshot, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { db, auth } from './init';

// Methods--------------------------------------------------------------------------------------------------------------------

/**
 * Getting data from db with pathname.
 * @param pathCollection Collection pathname.
 */
export const getData = (pathCollection: string): Promise<QuerySnapshot<DocumentData>> => getDocs(collection(db, pathCollection));

/**
 * Getting sorted data from db with pathname.
 * @param pathCollection Collection pathname.
 * @param sortKey Fields to sort by.
 */
export const getSortedDataByKey = (pathCollection: string, sortKey: string): Promise<QuerySnapshot<DocumentData>> => {
  const queryWithSorting = query(collection(db, pathCollection), orderBy(`fields/${sortKey}`));
  return getDocs(queryWithSorting);
};

/**
 * Sign in web app.
 * @param email Email.
 * @param password Password.
 */
export const signIn = async(email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

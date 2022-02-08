import { collection, DocumentData, getDocs, QuerySnapshot, query, orderBy, doc, getDoc, DocumentSnapshot, where, documentId } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { db, auth } from './init';

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
  const queryWithSorting = query(collection(db, pathCollection), orderBy(`fields.${sortKey}`));
  return getDocs(queryWithSorting);
};

/**
 * Sign in web app.
 * @param email Email.
 * @param password Password.
 */
export const logIn = async(email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out from web app.
 */
export const logOut = async(): Promise<void> => {
  await signOut(auth);
};

/**
 * Get film by id in web app.
 * @param filmId String to get film.
 */
export const getFilm = (filmId: string): Promise<DocumentSnapshot<DocumentData>> => getDoc(doc(db, 'films', filmId));

/**
 * Get field by id and path.
 * @param collectionPath Pathname of collection.
 * @param fieldIds Array of needed ids.
 */
export const getFieldsByIds = (collectionPath: string, fieldIds: string[]): Promise<QuerySnapshot<DocumentData>> => {
  const q = query(collection(db, collectionPath), where(documentId(), 'in', fieldIds));
  return getDocs(q);
};

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
 * @param sortKey F
 * ields to sort by.
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
 * Get docs by id and path.
 * @param collectionPath Pathname of collection.
 * @param fieldIds Array of needed ids.
 */
export const getDocSnapByIds = (collectionPath: string, fieldIds: string[]): Promise<QuerySnapshot<DocumentData>[]> => {
  const col = collection(db, collectionPath);
  const batches = [];

  while (fieldIds.length) {
    // firestore limits batches to 10
    const batch = fieldIds.splice(0, 10);
    const q = query(col, where(documentId(), 'in', batch));

    // add the batch request to to a queue
    batches.push(getDocs(q));
  }

  // after all of the data is fetched, return it
  return Promise.all(batches)
    .catch(() => []);
};

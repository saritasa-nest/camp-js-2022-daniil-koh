import { collection, DocumentData, getDocs, getFirestore, QuerySnapshot, query, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';


export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBKPLNeEY4yJUg0eA60u8nKg30q08zGaSM',
  authDomain: 'vanilla-feff9.firebaseapp.com',
  projectId: 'vanilla-feff9',
  storageBucket: 'vanilla-feff9.appspot.com',
  messagingSenderId: '941812910791',
  appId: '1:941812910791:web:c9c94f814bb018d121cce2',
});

const db = getFirestore(firebaseApp);
export const auth = getAuth();

// Methods--------------------------------------------------------------------------------------------------------------------

export const getData = (pathCollection: string): Promise<QuerySnapshot<DocumentData>> => getDocs(collection(db, pathCollection));

export const getSortedByData = (pathCollection: string, sortKey: string): Promise<QuerySnapshot<DocumentData>> => {
  const queryWithSorting = query(collection(db, pathCollection), orderBy(`fields/${sortKey}`));
  return getDocs(queryWithSorting);
};

export const signIn = async(email: string, password: string): Promise<void> => {
  signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      throw new Error(error);
    });
};

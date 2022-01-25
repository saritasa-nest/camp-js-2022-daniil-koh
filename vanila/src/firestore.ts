import { collection, query, getDocs,getFirestore  } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app"

export  const firebaseApp = initializeApp({
    apiKey: "AIzaSyBKPLNeEY4yJUg0eA60u8nKg30q08zGaSM",
    authDomain: "vanilla-feff9.firebaseapp.com",
    projectId: "vanilla-feff9",
    storageBucket: "vanilla-feff9.appspot.com",
    messagingSenderId: "941812910791",
    appId: "1:941812910791:web:c9c94f814bb018d121cce2"
})

const db = getFirestore();
const auth = getAuth();


//Methods--------------------------------------------------------------------------------------------------------------------

export const getData = async () => {
  const q = query(collection(db, "films"))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
  }

export const signIn = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user:any  = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode:any = error.code;
      const errorMessage: any = error.message;
      console.log(errorCode, errorMessage)
    });
}

export const monitorAuthState = new Promise(((resolve, reject) =>{
  onAuthStateChanged(auth, user => {
    if (user){
      resolve(user)
    }else{
      reject()
    }
  })
}))


import {
  getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged,
} from 'firebase/auth';
import { firebaseApp } from './firebase';

export namespace AuthService {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);

  /**
   * Get authorization status.
   */
  export async function getAuthState(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, user => {
        resolve(!!user);
      }, err => {
        reject(err);
      });
    });
  }

  /**
   * Sign in to system with Google Popup.
   */
  export async function signInByGoogle(): Promise<boolean> {
    const { user } = await signInWithPopup(auth, provider);
    return !!user;
  }

  /**
   * Log out.
   */
  export async function logout(): Promise<void> {
    return signOut(auth);
  }
}

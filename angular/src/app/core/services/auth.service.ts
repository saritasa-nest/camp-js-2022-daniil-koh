import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, mapTo, Observable, throwError } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';
import firebase from 'firebase/compat';

/** Service to auth user.*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public constructor(public auth: AngularFireAuth) {
  }

  // public authSubject = new BehaviorSubject<boolean>(authState());

  /**
   * Return stream to detect auth state changes.
   */
  public getStateChange(): Observable<firebase.User | null> {
    return this.auth.authState;
  }

  /**
   * Login in system with mail and password.
   * @param email User's mail.
   * @param password User's password.
   */
  public loginWithEmailAndPassword(email: string, password: string): Observable<void> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((err: FirebaseError) => throwError(() => err)),
      mapTo(void 0),
    );
  }

  /**
   * Register new user with email and password.
   * @param email New user's mail.
   * @param password New user's password.
   */
  public registerWithEmailAndPassword(email: string, password: string): Observable<void> {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      catchError((err: FirebaseError) => throwError(() => err)),
      mapTo(void 0),
    );
  }

  /**
   * Log out.
   */
  public logout(): Observable<void> {
    return from(this.auth.signOut());
  }

}

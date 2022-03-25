
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, defer, map, mapTo, Observable, throwError } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';

import { FirebaseErrorMapper } from '../mappers/firebase-error.mapper';

/** Service to auth user.*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public constructor(
    private readonly auth: AngularFireAuth,
    private readonly firebaseErrorMapper: FirebaseErrorMapper,
  ) {}

  /**
   * Return stream to detect auth state changes.
   */
  public getStateChange(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(user => !!user),
    );
  }

  /**
   * Login in system with mail and password.
   * @param email User's mail.
   * @param password User's password.
   */
  public loginWithEmailAndPassword(email: string, password: string): Observable<void> {
    return defer(() => this.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        catchError((err: FirebaseError) => throwError(() => this.firebaseErrorMapper.map(err))),
        mapTo(void 0),
      );
  }

  /**
   * Register new user with email and password.
   * @param email New user's mail.
   * @param password New user's password.
   */
  public registerWithEmailAndPassword(email: string, password: string): Observable<void> {
    return defer(() => this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      catchError((err: FirebaseError) => throwError(() => this.firebaseErrorMapper.map(err))),
      mapTo(void 0),
    );
  }

  /**
   * Log out.
   */
  public logout(): Observable<void> {
    return defer(() => this.auth.signOut()).pipe(
      catchError((err: FirebaseError) => throwError(() => err)),
      mapTo(void 0),
    );
  }

}

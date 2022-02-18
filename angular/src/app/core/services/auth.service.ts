import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) {}

  /**
   * Login in web application.
   * @param email User email to login.
   * @param password User password to login.
   */
  login = (email:string, password:string): void => {
     this.auth.signInWithEmailAndPassword(email, password);
  }

  logout = (): void => {
    this.auth.signOut()
  }
}

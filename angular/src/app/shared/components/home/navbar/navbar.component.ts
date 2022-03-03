import { Component } from '@angular/core';

// TODO This component in progress!!!
// TODO Connect auth state Subscriber Template with Rx.

/**
 * Top navbar.
 */
@Component({
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  /** Auth state. (In progress). */
  public isAuth = true;
}

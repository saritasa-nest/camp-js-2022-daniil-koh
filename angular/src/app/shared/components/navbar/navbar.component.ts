import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalAuthComponent } from '../modal-auth/modal-auth.component';
import { AuthService } from '../../../core/services/auth.service';

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
export class NavbarComponent implements AfterViewInit {
  public constructor(public authService: AuthService, public dialog: MatDialog) { }

  /** Auth state. (In progress). */
  public isAuth = true;

  /**
   * Open auth dialog.
   */
  public openAuthDialog(): void {
    this.dialog.open(ModalAuthComponent, {
      width: '250px',
    });

  }

  /**
   * Open auth dialog.
   */
  public logout(): void {
    this.authService.logout();
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this.authService.getStateChange().subscribe(user => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

}

import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { throwError } from 'rxjs';

import { ModalAuthComponent } from '../home/modal-auth/modal-auth.component';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Top navbar.
 */
@Component({
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  public constructor(private readonly authService: AuthService, private readonly dialog: MatDialog) { }

  /** Auth state.*/
  public isAuth = false;

  /**
   * Open auth dialog.
   */
  public openAuthDialog(): void {
    this.dialog.open(ModalAuthComponent, {
      width: '450px',
    });

  }

  /**
   * Open auth dialog.
   */
  public logout(): void {
    this.authService.logout().subscribe({
      error: err => throwError(() => err),
    });
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this.authService.getStateChange().subscribe(user => {
      this.isAuth = user;
    });
  }
}

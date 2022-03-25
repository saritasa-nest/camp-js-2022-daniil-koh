import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef, AfterViewInit,
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../core/services/auth.service';

/**
 * Auth dialog.
 */
@UntilDestroy()
@Component({
  selector: 'sw-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAuthComponent implements AfterViewInit {

  public constructor(
    private readonly dialogRef: MatDialogRef<ModalAuthComponent>,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
  ) {}

  /** Flag to valid login fields.*/
  public loginValid = false;

  /** Value of username field.*/
  public username = '';

  /** Values of password field.*/
  public password = '';

  @ViewChild('emailInput') private emailInput!: ElementRef<HTMLInputElement>;

  @ViewChild('passwordInput') private passwordInput!: ElementRef<HTMLInputElement>;

  /**
   * If get authentication error, show error snackbar.
   * @param message Message to show on snackbar.
   */
  private showMessageAuthSnackBar(message: string): void {
    const horizontalPosition = 'right';
    const verticalPosition = 'bottom';
    const duration = 4000;
    const closeTitle = 'Close';

    this.snackBar.open(message, closeTitle, {
      horizontalPosition,
      verticalPosition,
      duration,
    });
  }

  /**
   * Login to system with email and password.
   */
  public login(): void {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    this.authService.loginWithEmailAndPassword(email, password)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(
        {
          error: error => this.showMessageAuthSnackBar(error),
        },
      );
  }

  /**
   * Sign up to system with email and password.
   */
  public signUp(): void {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    this.authService.registerWithEmailAndPassword(email, password)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe({
        error: error => this.showMessageAuthSnackBar(error),
      });
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this.authService.getStateChange()
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(isAuth => {
      const loggedInMessage = 'You are successfully logged in.';
        if (isAuth) {
          this.showMessageAuthSnackBar(loggedInMessage);
          this.dialogRef.close();
        }
      });
  }
}

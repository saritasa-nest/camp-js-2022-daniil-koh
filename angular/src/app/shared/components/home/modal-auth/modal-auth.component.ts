import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../../core/services/auth.service';

/**
 * Auth dialog.
 */
@Component({
  selector: 'sw-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAuthComponent implements AfterViewInit, OnDestroy {

  public constructor(public authService: AuthService, public dialogRef: MatDialogRef<ModalAuthComponent>) { }

  /** Flag to valid login fields.*/
  public loginValid = true;

  /** Value of username field.*/
  public username = '';

  /** Values of password field.*/
  public password = '';

  /** Subject to destroy stream when life cycle of component is close to end.*/
  public destroy$ = new Subject<void>();

  @ViewChild('emailInput') private emailInput!: ElementRef<HTMLInputElement>;

  @ViewChild('passwordInput') private passwordInput!: ElementRef<HTMLInputElement>;

  /**
   * Login to system.
   */
  public login(): void {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    this.authService.loginWithEmailAndPassword(email, password);
  }

  /**
   *
   */
  public register(): void {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    this.authService.registerWithEmailAndPassword(email, password);
  }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit(): void {
    this.authService.getStateChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // eslint-disable-next-line no-empty
        if (data !== null) {

        }
      });
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
  }

}

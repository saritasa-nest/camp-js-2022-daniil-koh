import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';

import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

const NAVBAR_MAT_MODULES = [
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatNativeDateModule,
];

/** Root module. */
@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ...NAVBAR_MAT_MODULES,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    MatDatepickerModule,

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TableComponent } from './shared/components/table/table.component';

import {environment} from '../environments/environment.prod';
import {provideFirebaseApp, initializeApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import { AuthModalComponent } from './shared/components/auth-modal/auth-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";

/** Root module. */
@NgModule({
  declarations: [AppComponent, NavbarComponent, TableComponent, AuthModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

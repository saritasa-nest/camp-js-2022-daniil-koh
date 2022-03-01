import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { MatSortModule } from '@angular/material/sort';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AngularFireModule } from '@angular/fire/compat';

import { MatInputModule } from '@angular/material/input';

import { environment } from '../environments/environment.prod';

import { TableComponent } from './shared/components/table/table.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/** Root module. */
@NgModule({
  declarations: [AppComponent, NavbarComponent, TableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

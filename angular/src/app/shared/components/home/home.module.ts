import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { TableComponent } from './table/table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const EXPORTED_DECLARATIONS = [
  NavbarComponent,
  TableComponent,
  HomeComponent,
];
const MAT_MODULES = [
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
];

/** Home module. */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [CommonModule, MAT_MODULES, HomeRoutingModule],
})
export class HomeModule {
}

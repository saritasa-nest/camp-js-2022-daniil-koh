import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { PipesModule } from '../../pipes/pipes.module';

import { TableComponent } from '../../components/table/table.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const EXPORTED_DECLARATIONS = [
  TableComponent,
  HomeComponent,
];
const MAT_MODULES = [
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatInputModule,
  MatSortModule,
];

/** Home module. */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    CommonModule,
    MAT_MODULES,
    HomeRoutingModule,
    PipesModule,
  ],
})
export class HomeModule {
}

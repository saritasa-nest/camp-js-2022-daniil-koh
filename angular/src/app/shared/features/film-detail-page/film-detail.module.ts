import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonModule } from '@angular/material/button';

import { MatNativeDateModule } from '@angular/material/core';

import { PipesModule } from '../../pipes/pipes.module';

import { FilmDetailRoutingModule } from './film-detail-routing.module';
import { FilmDetailPageComponent } from './film-detail-page.component';

const MAT_MODULES = [
  MatProgressSpinnerModule,
  MatButtonModule,
  MatNativeDateModule,
];

/** Detail page module.*/
@NgModule({
  declarations: [FilmDetailPageComponent],
  imports: [
    CommonModule,
    FilmDetailRoutingModule,
    FlexLayoutModule,
    PipesModule,
    ...MAT_MODULES,
  ],
})
export class FilmDetailModule { }

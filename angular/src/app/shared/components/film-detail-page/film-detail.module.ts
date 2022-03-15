import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonModule } from '@angular/material/button';

import { FilmDetailRoutingModule } from './film-detail-routing.module';
import { FilmDetailPageComponent } from './film-detail-page.component';

/** Detail page module.*/
@NgModule({
  declarations: [FilmDetailPageComponent],
  imports: [
    CommonModule,
    FilmDetailRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class FilmDetailModule { }

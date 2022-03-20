import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { PipesModule } from '../../pipes/pipes.module';

import { EditFilmComponent } from './edit-film.component';
import { EditFilmRoutingModule } from './edit-film-routing.module';

const MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatSelectModule,
];

/** Edit page module. */
@NgModule({
  declarations: [EditFilmComponent],
  imports: [
    CommonModule,
    EditFilmRoutingModule,
    ...MAT_MODULES,
    ReactiveFormsModule,
    MatButtonModule,
    PipesModule,
  ],
})
export class EditFilmModule { }

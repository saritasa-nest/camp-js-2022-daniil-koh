import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../core/guards/auth.guard';

import { EditFilmComponent } from './edit-film.component';

const routes: Routes = [
  {
    path: '',
    component: EditFilmComponent,
    canActivate: [AuthGuard],
  },
];

/** Edit module routing.*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFilmRoutingModule { }

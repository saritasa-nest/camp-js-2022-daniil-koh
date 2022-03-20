import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../core/guards/auth.guard';

import { FilmDetailPageComponent } from './film-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: FilmDetailPageComponent,
    canActivate: [AuthGuard],
  },
];

/** Detail page routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmDetailRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'details',
    loadChildren: () => import('./shared/features/film-detail-page/film-detail.module').then(m => m.FilmDetailModule),
  },
  {
    path: 'edit',
    loadChildren: () => import('./shared/features/edit-film-page/edit-film.module').then(m => m.EditFilmModule),
  },
  {
    path: '**', redirectTo: '',
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

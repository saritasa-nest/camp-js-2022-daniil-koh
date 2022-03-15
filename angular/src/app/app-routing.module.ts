import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/components/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'details',
    loadChildren: () => import('./shared/components/film-detail-page/film-detail.module').then(m => m.FilmDetailModule),
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

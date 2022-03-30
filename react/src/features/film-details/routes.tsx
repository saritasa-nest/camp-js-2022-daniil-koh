import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { AuthGuard } from '../../routes';

const FilmDetailsPage = lazy(() => import('./pages/FilmDetailsPage')
  .then(module => ({ default: module.FilmDetailsPage })));

export const filmDetailsRoutes: RouteObject[] = [
  {
    path: 'details',
    element: <AuthGuard redirectPath="/auth" />,
    children: [
      {
        index: true,
        element: <FilmDetailsPage />,
      },
    ],
  },
];

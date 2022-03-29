import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '../../routes';

const FilmsPage = lazy(() => import('./pages/FilmsPage').then(module => ({ default: module.FilmsPage })));

export const filmsRoutes: RouteObject[] = [
  {
    path: 'films',
    element: <AuthGuard redirectPath="/auth" />,
    children: [
      {
        index: true,
        element: <FilmsPage />,
      },
    ],
  },
];

import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { VFC } from 'react';
import { authRoutes } from '../features/auth/routes';
import { filmsRoutes } from '../features/films/routes';

const routes: RouteObject[] = [
  ...filmsRoutes,
  ...authRoutes,
  {
    path: '*',
    element: <Navigate to="films" replace />,
  },
];

export const RootRouter: VFC = () => useRoutes(routes);

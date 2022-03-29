import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '../../routes';

const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthGuard redirectPath="films" needAuth={false} />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
    ],
  },
];

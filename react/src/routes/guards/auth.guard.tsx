import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, VFC } from 'react';
import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectAuthStatus, selectIsUserLoading } from '../../store/user/selectors';
import { getAuth } from '../../store/user/dispatchers';

interface Props {
  /** Path to redirect if user not authorized. */
  readonly redirectPath: string;

  /** Does component need authorization status. */
  readonly needAuth?: boolean;
}

/**
 * Check auth state and redirect if condition is false.
 * @param redirectPath Path to redirect.
 * @param needAuth True if component need authentication.
 */
const AuthGuard: VFC<Props> = ({
  redirectPath,
  needAuth = true,
}) => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectAuthStatus);
  const loading = useAppSelector(selectIsUserLoading);

  /**
   * Get auth state when guard rendered.
   */
  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress color="inherit" />;
  }
  if (isAuthorized !== needAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
export default AuthGuard;

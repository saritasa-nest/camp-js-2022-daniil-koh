import {
  AppBar, Box, Button, IconButton, Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useCallback, VFC } from 'react';
import './Navbar.css';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectAuthStatus } from '../../../../store/user/selectors';
import { logOut } from '../../../../store/user/dispatchers';

export const Navbar: VFC = () => {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const logoutHandler = useCallback(
    (): void => {
      dispatch(logOut());
    },
    [dispatch],
  );

  /**
   * Navigate to table.
   */
  const backToTable = useCallback((): void => {
    navigate('/films');
  }, [navigate]);

  /**
   * If user is not authenticated, navigate return to auth page.
   */
  const loginHandler = useCallback((): void => {
    navigate('/auth');
  }, [navigate]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="navbar"
      >
        <Toolbar
          className="navbar"
        >
          <IconButton
            className="menu-button"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={backToTable}
          >
            <HomeIcon />
          </IconButton>
          <div className="navbar-button">
            {isAuthorized
              ? (
                <Button
                  className="navbar-logout-button"
                  color="inherit"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              )
              : (
                <Button
                  className="navbar-login-button"
                  color="inherit"
                  onClick={loginHandler}
                >
                  Login
                </Button>
              )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

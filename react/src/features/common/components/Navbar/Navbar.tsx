import {
  AppBar, Box, Button, IconButton, Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { VFC } from 'react';
import './Navbar.css';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectAuthStatus } from '../../../../store/user/selectors';
import { logOut } from '../../../../store/user/dispatchers';

const Navbar: VFC = () => {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    dispatch(logOut());
  };

  const loginHandler = (): void => {
    navigate('/auth');
  };
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
          >
            <MenuIcon />
          </IconButton>
          <div className="navbar-button">
            {isAuthorized
              ? (
                <Button
                  className="navbar-logout-button"
                  color="inherit"
                  onClick={() => logoutHandler()}
                >
                  Logout
                </Button>
              )
              : (
                <Button
                  className="navbar-login-button"
                  color="inherit"
                  onClick={() => loginHandler()}
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

export default Navbar;
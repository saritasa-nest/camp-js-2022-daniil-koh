import { VFC } from 'react';
import { Box, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import './AuthPage.css';
import { useAppDispatch } from '../../../../store';
import { signIn } from '../../../../store/user/dispatchers';

export const AuthPage: VFC = () => {
  const dispatch = useAppDispatch();
  const signUpWithGoogleHandler = (): void => {
    dispatch(signIn());
  };
  return (
    <Box
      className="auth-container"
    >
      <h3 className="auth-title">
        Sign Up
      </h3>
      <Box className="sign-up-button-container">
        <Button
          onClick={() => signUpWithGoogleHandler()}
          type="button"
          className="sign-up-button"
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
      </Box>
    </Box>
  );
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/api/services/auth.service';

export const signIn = createAsyncThunk(
  'user/signIn',
  AuthService.signInByGoogle,
);

export const logOut = createAsyncThunk(
  'user/logOut',
  AuthService.logout,
);

export const getAuth = createAsyncThunk(
  'user/getAuth',
  AuthService.getAuthState,
);

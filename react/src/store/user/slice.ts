import { createSlice } from '@reduxjs/toolkit';

import { initialState, UserState } from './state';
import { logOut, signIn, getAuth } from './dispatchers';
import { getCasesReducers } from '../statusReducers';

const { pendingReducer, rejectedReducer } = getCasesReducers<UserState>();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(signIn.pending, pendingReducer)
    .addCase(signIn.fulfilled, (state, { payload }) => {
      state.isAuthorized = payload;
      state.loading = false;
    })
    .addCase(signIn.rejected, rejectedReducer)
    .addCase(logOut.pending, pendingReducer)
    .addCase(logOut.fulfilled, state => {
      state.isAuthorized = false;
      state.loading = false;
    })
    .addCase(logOut.rejected, rejectedReducer)
    .addCase(getAuth.pending, pendingReducer)
    .addCase(getAuth.fulfilled, (state, { payload }) => {
      state.isAuthorized = payload;
      state.loading = false;
    })
    .addCase(getAuth.rejected, rejectedReducer)

  ,
});

import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Select user authorization from store. */
export const selectAuthStatus = createSelector(
  (state: RootState) => state.user.isAuthorized,
  isAuthorized => isAuthorized,
);

/** Selects users loading state. */
export const selectIsUserLoading = createSelector((state: RootState) => state.user.loading, loading => loading);

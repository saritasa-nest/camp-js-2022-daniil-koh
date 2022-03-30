import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
/** Select film details. */
export const selectFilmDetails = createSelector(
  (state: RootState) => state.filmDetails.filmDetails,
  details => details,
);

/** Select loading status. */
export const selectFilmDetailsLoading = createSelector(
  (state: RootState) => state.filmDetails.loading,
  loading => loading,
);

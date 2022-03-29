import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all posts from store. */
export const selectFilms = createSelector((state: RootState) => state.films.films, films => films);
/** Selects posts loading state. */
export const selectFilmsLoading = createSelector((state: RootState) => state.films.loading, loading => loading);
/** Select cursors. */
export const selectFilmsCursors = createSelector((state: RootState) => state.films.cursors, cursors => cursors);
/** Select search string. */
export const selectSearchString = createSelector(
  (state: RootState) => state.films.searchingString,
  searchingString => searchingString,
);

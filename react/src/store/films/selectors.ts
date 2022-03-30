import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { filmsAdapter } from './state';

/** Selects films loading state. */
export const selectFilmsLoading = createSelector((state: RootState) => state.films.loading, loading => loading);
/** Select cursors. */
export const selectFilmsCursors = createSelector((state: RootState) => state.films.cursors, cursors => cursors);
/** Select search string. */
export const selectSearchString = createSelector(
  (state: RootState) => state.films.searchingString,
  searchingString => searchingString,
);
export const {
  /** Selects all films from store. */
  selectAll: selectFilms,
} = filmsAdapter.getSelectors<RootState>(state => state.films);

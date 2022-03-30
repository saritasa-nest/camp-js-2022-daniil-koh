import { createSlice } from '@reduxjs/toolkit';

import { filmsAdapter, initialState } from './state';
import { getCasesReducers } from '../statusReducers';
import { getAllFilms, getNextPage, getPreviousPage } from './dispatchers';

const { pendingReducer, rejectedReducer } = getCasesReducers<typeof initialState>();

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setSearchStringChange: (state, { payload }) => {
      state.searchingString = payload;
    },
  },
  extraReducers: builder => builder
    .addCase(getAllFilms.pending, pendingReducer)
    .addCase(getAllFilms.fulfilled, (state, action) => {
      filmsAdapter.removeAll(state);
      filmsAdapter.setAll(state, action.payload.films);
      state.cursors = action.payload.cursors;
      state.loading = false;
    })
    .addCase(getNextPage.rejected, rejectedReducer)
    .addCase(getNextPage.pending, pendingReducer)
    .addCase(getNextPage.fulfilled, (state, action) => {
      filmsAdapter.removeAll(state);
      filmsAdapter.setAll(state, action.payload.films);
      state.cursors = action.payload.cursors;
      state.loading = false;
    })
    .addCase(getPreviousPage.rejected, rejectedReducer)
    .addCase(getPreviousPage.pending, pendingReducer)
    .addCase(getPreviousPage.fulfilled, (state, action) => {
      filmsAdapter.removeAll(state);
      filmsAdapter.setAll(state, action.payload.films);
      state.cursors = action.payload.cursors;
      state.loading = false;
    })
    .addCase(getAllFilms.rejected, rejectedReducer),

});

export const { setSearchStringChange } = filmsSlice.actions;

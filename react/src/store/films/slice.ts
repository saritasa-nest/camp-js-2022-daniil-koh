import { createSlice } from '@reduxjs/toolkit';

import { castDraft } from 'immer';
import { FilmsState, initialState } from './state';
import { getCasesReducers } from '../statusReducers';
import { getAllFilms, getNextPage, getPreviousPage } from './dispatchers';

const { pendingReducer, rejectedReducer } = getCasesReducers<FilmsState>();

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    searchStringChange: (state, { payload }) => {
      state.searchingString = payload;
    },
  },
  extraReducers: builder => builder
    .addCase(getAllFilms.pending, pendingReducer)
    .addCase(getAllFilms.fulfilled, (state, action) => {
      state.films = castDraft(action.payload.films);
      state.cursors = action.payload.cursors;
      state.loading = false;
    })
    .addCase(getNextPage.rejected, rejectedReducer)
    .addCase(getNextPage.pending, pendingReducer)
    .addCase(getNextPage.fulfilled, (state, action) => {
      state.films = castDraft(action.payload.films);
      state.cursors = action.payload.cursors;
      state.loading = false;
    })
    .addCase(getPreviousPage.rejected, rejectedReducer)
    .addCase(getPreviousPage.pending, pendingReducer)
    .addCase(getPreviousPage.fulfilled, (state, action) => {
      state.films = castDraft(action.payload.films);
      state.cursors = action.payload.cursors;
      state.loading = false;
    })
    .addCase(getAllFilms.rejected, rejectedReducer),

});

export const { searchStringChange } = filmsSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

import { castDraft } from 'immer';
import { initialState } from './state';
import { getCasesReducers } from '../statusReducers';
import { getFilmDetails } from './dispatchers';

const { pendingReducer, rejectedReducer } = getCasesReducers<typeof initialState>();

export const filmDetailsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getFilmDetails.pending, pendingReducer)
    .addCase(getFilmDetails.fulfilled, (state, action) => {
      state.filmDetails = castDraft(action.payload);
      state.loading = false;
    })
    .addCase(getFilmDetails.rejected, rejectedReducer),
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from 'src/api/services/films.service';

export const getAllFilms = createAsyncThunk(
  'films/getAll',
  FilmsService.getFilms,
);
export const getNextPage = createAsyncThunk(
  'films/next',
  FilmsService.getNextPage,
);
export const getPreviousPage = createAsyncThunk(
  'films/previous',
  FilmsService.getPreviousPage,
);

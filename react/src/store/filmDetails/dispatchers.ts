import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmDetailsService } from '../../api/services/film-details.service';

export const getFilmDetails = createAsyncThunk(
  'filmDetails/get',
  FilmDetailsService.getFilmDetails,
);

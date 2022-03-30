import { FilmWithId } from 'src/api/models/film-with-id';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { DefaultInitialState } from '../../models/defaultState';
import { FilmsService } from '../../api/services/films.service';

/**
 * Films adapter.
 */
export const filmsAdapter = createEntityAdapter<FilmWithId>({
  selectId: film => film.id,
});

/**
 * Posts state.
 */
export interface FilmsState extends DefaultInitialState {

  /** Cursors for pagination. */
  readonly cursors: FilmsService.Cursors;

  /** String to search in films. */
  readonly searchingString: string;
}

export const initialState = filmsAdapter.getInitialState<FilmsState>({
  loading: false,
  searchingString: '',
  cursors: {
    firstVisibleDocCursor: null,
    lastVisibleDocCursor: null,
  },
});

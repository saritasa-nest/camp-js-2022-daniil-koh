import { FilmWithId } from 'src/api/models/film-with-id';
import { DefaultInitialState } from '../../models/defaultState';
import { FilmsService } from '../../api/services/films.service';

/**
 * Posts state.
 */
export interface FilmsState extends DefaultInitialState {
  /** Films list. */
  readonly films: FilmWithId[];

  /** Cursors for pagination. */
  readonly cursors: FilmsService.Cursors;

  /** String to search in films. */
  readonly searchingString: string;
}

export const initialState: FilmsState = {
  loading: false,
  films: [],
  searchingString: '',
  cursors: {
    firstVisibleDocCursor: null,
    lastVisibleDocCursor: null,
  },
};

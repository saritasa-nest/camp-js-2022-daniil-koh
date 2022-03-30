import { DefaultInitialState } from '../../models/defaultState';
import { Film } from '../../api/models/film';

/**
 * Film details state.
 */
export interface FilmDetailsState extends DefaultInitialState {
  /** Cursors for pagination. */
  readonly filmDetails: Film | null;
}

export const initialState: FilmDetailsState = {
  filmDetails: null,
  loading: false,
};

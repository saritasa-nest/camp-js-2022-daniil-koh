import { Film } from './film';

/**
 * Film model with id.
 */
export interface FilmWithId extends Film {

  /** Id of film. */
  readonly id: string;
}

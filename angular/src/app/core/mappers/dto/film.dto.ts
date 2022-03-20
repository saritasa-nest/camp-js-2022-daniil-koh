/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Data of film that stored in database.
 */
export interface FilmDto {

  /**
   * Array of primary keys of characters.
   */
  readonly characters: readonly string[];

  /**
   * Date when film was created.
   */
  readonly created: string;

  /**
   * Director of the film.
   */
  readonly director: string;

  /**
   * It is primary key of this episode.
   */
  readonly episode_id: number;

  /**
   * Description text in the film beginning.
   */
  readonly opening_crawl: string;

  /**
   * Array of primary keys of planets.
   */
  readonly planets: readonly string[];

  /**
   * String of producers(separated by ",") or producer.
   */
  readonly producer: string;

  /**
   * Date of release.
   */
  readonly release_date: string;

  /**
   * Array of primary keys .
   */
  readonly species: readonly string[];

  /**
   * Array of primary keys of starships in film.
   */
  readonly starships: readonly string[];

  /**
   * Title of film.
   */
  readonly title: string;

  /**
   * Array of primary keys of starships in film.
   */
  readonly vehicles: readonly string[];
}

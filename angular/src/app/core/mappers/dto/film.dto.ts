/**
 * Data of film that stored in database.
 */
export interface FilmDto {

  /**
   * Array of primary keys of characters.
   */
  readonly characters: readonly number[];

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
  readonly planets: readonly number[];

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
  readonly species: readonly number[];

  /**
   * Array of primary keys of starships in film.
   */
  readonly starships: readonly number[];

  /**
   * Title of film.
   */
  readonly title: string;

  /**
   * Array of primary keys of starships in film.
   */
  readonly vehicles: readonly number[];
}

/**
 * Film data.
 */
export interface Film {

  /**
   * Array of primary keys of characters.
   */
  readonly characters: readonly number[];

  /**
   * Date when film was created.
   */
  readonly created: Date;

  /**
   * Director of the film.
   */
  readonly director: string;

  /**
   *It is primary key of this episode.
   */
  readonly episodeId: number;

  /**
   * Description text in the film beginning.
   */
  readonly openingCrawl: string;

  /**
   * Array of primary keys of planets.
   */
  readonly planets: readonly number[];

  /**
   * String of producers(separated by ",") or producer.
   */
  readonly producer: readonly string[];

  /**
   * Date of release.
   */
  readonly releaseDate: Date;

  /**
   * Array of primary keys .
   */
  readonly species: readonly number[];

  /**
   *Array of primary keys of starships in film.
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

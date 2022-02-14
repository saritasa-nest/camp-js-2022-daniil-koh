/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Film characteristics.
 */
export interface FilmDTO {

  /**
   * Array of primary keys of characters.
   */
  readonly characters: string[];

  /**
   * Date when film was created.
   */
  readonly created: string;

  /**
   * Director of the film.
   */
  readonly director: string;

  /**
   *It is primary key of this episod.
   */
  readonly episode_id: number;

  /**
   * Description text in the film beginning.
   */
  readonly opening_crawl: string;

  /**
   * Array of primary keys of planets.
   */
  readonly planets: string[];

  /**
   * String of producers(separated by ",") or producer.
   */
  readonly producer: string;

  /**
   * Date of release.
   */
  readonly release_date: string;

  /**
   *Array of primary keys .
   */
  readonly species: string[];

  /**
   *Array of primary keys of starships in film.
   */
  readonly starships: string[];

  /**
   *Title of film.
   */
  readonly title: string;

  /**
   * Array of primary keys of starships in film.
   */
  readonly vehicles: string[];
}

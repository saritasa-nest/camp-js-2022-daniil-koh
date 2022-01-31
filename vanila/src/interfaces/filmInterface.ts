import { CollectionInterface } from './collectionInterface';

/**
 * Film characteristics.
 */
export interface FilmInterface extends CollectionInterface {

  /**
   * Fields of film characteristics.
   */
  fields: {

    /**
     * Array of primary keys of characters.
     */
    characters: [number];

    /**
     * Date when film was created.
     */
    created: string;

    /**
     * Director of the film.
     */
    director: string;

    /**
     *It is primary key of this episod.
     */
    episode_id: number;

    /**
     * Description text in the film beginning.
     */
    opening_crawl: string;

    /**
     * Array of primary keys of planets.
     */
    planets: [number];

    /**
     * String of producers(separated by ",") or producer.
     */
    producer: string;

    /**
     * Date of release.
     */
    release_date: string;

    /**
     *Array of primary keys .
     */
    species: [number];

    /**
     *Array of primary keys of starships in film.
     */
    starships: [number];

    /**
     *Title of film.
     */
    title: string;

    /**
     * Array of primary keys of starships in film.
     */
    vehicles: [number];
  };
}

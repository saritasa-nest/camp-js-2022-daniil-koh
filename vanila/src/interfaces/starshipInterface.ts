import { CollectionInterface } from './collectionInterface';

/**
 * Starships characteristics.
 */
export interface StarshipInterface extends CollectionInterface{

  /**
   * Fields of characteristics.
   */
  fields: {

    /**
     *MLGT.
     */
    MLGT: string;

    /**
     * Hyperdrive rating.
     */
    hyperdriveRating: string;

    /**
     * Class of starship.
     */
    starhipClass: string;
  };
}

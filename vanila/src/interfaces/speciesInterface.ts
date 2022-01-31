import { CollectionInterface } from './collectionInterface';

/**
 * Planet characteristics.
 */
export interface SpeciesInterface extends CollectionInterface{

  /**
   * Charactistic filds of species.
   */
  fields: {

    /**
     * Species average height.
     */
    averageHeight: string;

    /**
     * Average lifespan of species.
     */
    averageLifespan: string;

    /**
     * Classification of species.
     */
    classification: string;

    /**
     * Date of creation.
     */
    created: string;

    /**
     *Species designation.
     */
    designation: string;

    /**
     * Date of edition.
     */
    edited: string;

    /**
     * Eye colors.
     */
    eyeColors: string;

    /**
     * Hair color.
     */
    hair_colors: string;

    /**
     * Primary key of homeland planet.
     */
    homeworld: number;

    /**
     * Language of species.
     */
    language: string;

    /**
     * Name of species.
     */
    name: string;

    /**
     * Array of primary keys of people.
     */
    people: [number];

    /**
     * Skin color.
     */
    skinColors: string;
  };
}

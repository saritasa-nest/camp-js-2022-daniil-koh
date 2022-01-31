import { CollectionInterface } from './collectionInterface';

/**
 * Characteristics of people.
 */
export interface PeopleInterface extends CollectionInterface {

  /**
   * Fields of people characteristics.
   */
  fields: {

    /**
     * Birthday year.
     */
    birthYear: string;

    /**
     *Date of creation.
     */
    created: string;

    /**
     * Date of edition.
     */
    edited: string;

    /**
     * Color of eyes.
     */
    eyeColor: string;

    /**
     * Gender.
     */
    gender: string;

    /**
     * Color of Hair.
     */
    hair_color: string;

    /**
     * Height in sm.
     */
    height: string;

    /**
     * Primary key of homeland planet.
     */
    homeworld: number;

    /**
     * Mass of people.
     */
    mass: string;

    /**
     * Name op people.
     */
    name: string;

    /**
     * Color of skin.
     */
    skinColor: string;
  };
}

import { CollectionInterface } from './collectionInterface';

/**
 * Planet characteristics.
 */
export interface PlanetInterface extends CollectionInterface{

  /**
   * Fields of planet characteristics.
   */
  fields: {

    /**
     *Planet Climate.
     */
    climate: string;

    /**
     * Date of creation.
     */
    created: string;

    /**
     * Diameter of planet.
     */
    diameter: string;

    /**
     *Date of edition.
     */
    edited: string;

    /**
     * Gravity type.
     */
    gravity: string;

    /**
     * Planet name.
     */
    name: string;

    /**
     * Orbital period.
     */
    orbitalPeriod: string;

    /**
     * Planet population.
     */
    population: string;

    /**
     * Rotation period .
     */
    rotationPeriod: string;

    /**
     *Type of water surface.
     */
    surfaceWater: string;

    /**
     * Types of terrains.
     */
    terrain: string;
  };
}

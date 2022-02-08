/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Planet characteristics.
 */
export interface PlanetDTO {

  /**
   *Planet Climate.
   */
  readonly climate: string;

  /**
   * Date of creation.
   */
  readonly created: string;

  /**
   * Diameter of planet.
   */
  readonly diameter: string;

  /**
   *Date of edition.
   */
  readonly edited: string;

  /**
   * Gravity type.
   */
  readonly gravity: string;

  /**
   * Planet name.
   */
  readonly name: string;

  /**
   * Orbital period.
   */
  readonly orbital_period: string;

  /**
   * Planet population.
   */
  readonly population: string;

  /**
   * Rotation period .
   */
  readonly rotation_period: string;

  /**
   *Type of water surface.
   */
  readonly surface_water: string;

  /**
   * Types of terrains.
   */
  readonly terrain: string;
}

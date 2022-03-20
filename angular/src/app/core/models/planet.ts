/**
 * Data of planet that store in database.
 */
export interface Planet {

  /**
   * Planet climate.
   */
  readonly climate: string;

  /**
   * Date of creation.
   */
  readonly created: Date;

  /**
   * Diameter of planet.
   */
  readonly diameter: number;

  /**
   * Date of edition.
   */
  readonly edited: Date;

  /**
   * Gravity type.
   */
  readonly gravity: number;

  /**
   * Planet name.
   */
  readonly name: string;

  /**
   * Orbital period.
   */
  readonly orbitalPeriod: number;

  /**
   * Planet population.
   */
  readonly population: number;

  /**
   * Rotation period.
   */
  readonly rotationPeriod: number;

  /**
   * Type of water surface.
   */
  readonly surfaceWater: number;

  /**
   * Types of terrains.
   */
  readonly terrain: string;
}

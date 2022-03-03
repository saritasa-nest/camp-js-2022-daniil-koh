/**
 * Data of planet that store in database.
 */
export interface PlanetDto {

  /**
   * Planet climate.
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
   * Date of edition.
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly orbital_period: string;

  /**
   * Planet population.
   */
  readonly population: string;

  /**
   * Rotation period.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly rotation_period: string;

  /**
   * Type of water surface.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly surface_water: string;

  /**
   * Types of terrains.
   */
  readonly terrain: string;
}

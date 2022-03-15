/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Data of species that store in database.
 */
export interface SpeciesDto {

  /**
   * Species average height.
   */
  readonly average_height: string;

  /**
   * Average lifespan of species.
   */
  readonly average_lifespan: string;

  /**
   * Classification of species.
   */
  readonly classification: string;

  /**
   * Date of creation.
   */
  readonly created: string;

  /**
   * Species designation.
   */
  readonly designation: string;

  /**
   * Date of edition.
   */
  readonly edited: string;

  /**
   * Eye colors separated by ','.
   */
  readonly eye_colors: string;

  /**
   * Hair colors separated by ','.
   */
  readonly hair_colors: string;

  /**
   * Primary key of homeland planet.
   */
  readonly home_world: number;

  /**
   * Language of species.
   */
  readonly language: string;

  /**
   * Name of species.
   */
  readonly name: string;

  /**
   * Array of primary keys of people.
   */
  readonly people: readonly number[];

  /**
   * Skin colors separated by ','.
   */
  readonly skin_colors: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Data of species that store in database.
 */
export interface SpeciesDto {

  /**
   * Species average height.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly average_height: string;

  /**
   * Average lifespan of species.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly eye_colors: string;

  /**
   * Hair colors separated by ','.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly hair_colors: string;

  /**
   * Primary key of homeland planet.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
  readonly people: ReadonlyArray<number>;

  /**
   * Skin colors separated by ','.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly skin_colors: string;
}

/**
 * Planet characteristics.
 */
export interface SpeciesDTO {

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
   *Species designation.
   */
  readonly designation: string;

  /**
   * Date of edition.
   */
  readonly edited: string;

  /**
   * Eye colors.
   */
  readonly eye_colors: string;

  /**
   * Hair color.
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
  readonly people: ReadonlyArray<number>;

  /**
   * Skin color.
   */
  readonly skin_colors: string;
}

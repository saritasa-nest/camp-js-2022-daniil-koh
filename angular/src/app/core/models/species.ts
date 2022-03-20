/**
 * Data of species that store in database.
 */
export interface Species {

  /**
   * Species average height.
   */
  readonly averageHeight: number;

  /**
   * Average lifespan of species.
   */
  readonly averageLifespan: number;

  /**
   * Classification of species.
   */
  readonly classification: string;

  /**
   * Date of creation.
   */
  readonly created: Date;

  /**
   * Species designation.
   */
  readonly designation: string;

  /**
   * Date of edition.
   */
  readonly edited: Date;

  /**
   * Eye colors separated by ','.
   */
  readonly eyeColors: string;

  /**
   * Hair colors separated by ','.
   */
  readonly hairColors: string;

  /**
   * Primary key of homeland planet.
   */
  readonly homeWorld: string;

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
  readonly people: readonly string[];

  /**
   * Skin colors separated by ','.
   */
  readonly skinColors: string;
}

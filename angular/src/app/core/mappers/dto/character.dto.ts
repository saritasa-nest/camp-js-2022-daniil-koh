/**
 * Character data that store in database.
 */
export interface CharacterDto {

  /**
   * Birthday year.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly birth_year: string;

  /**
   * Date of creation.
   */
  readonly created: string;

  /**
   * Date of edition.
   */
  readonly edited: string;

  /**
   * Color of eyes.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly eye_color: string;

  /**
   * Gender.
   */
  readonly gender: string;

  /**
   * Color of hair.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly hair_color: string;

  /**
   * Height in cm.
   */
  readonly height: string;

  /**
   * Primary key of homeland planet.
   */
  readonly homeworld: number;

  /**
   * Mass of people.
   */
  readonly mass: string;

  /**
   * Name of people.
   */
  readonly name: string;

  /**
   * Color of skin.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly skin_color: string;
}

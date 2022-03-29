/**
 * Character data.
 */
export interface Character {

  /**
   * Birthday year.
   */
  readonly birthYear: Date;

  /**
   * Date of creation.
   */
  readonly created: Date;

  /**
   * Date of edition.
   */
  readonly edited: Date;

  /**
   * Color of eyes.
   */
  readonly eyeColor: string;

  /**
   * Gender.
   */
  readonly gender: string;

  /**
   * Color of hair.
   */
  readonly hairColor: string;

  /**
   * Height in cm.
   */
  readonly height: number;

  /**
   * Primary key of homeland planet.
   */
  readonly homeWorld: string;

  /**
   * Mass of people.
   */
  readonly mass: number;

  /**
   * Name of people.
   */
  readonly name: string;

  /**
   * Color of skin.
   */
  readonly skinColor: string;
}

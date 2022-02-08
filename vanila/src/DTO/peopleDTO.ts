/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Characteristics of people.
 */
export interface PeopleDTO {

  /**
   * Birthday year.
   */
  readonly birth_year: string;

  /**
   *Date of creation.
   */
  readonly created: string;

  /**
   * Date of edition.
   */
  readonly edited: string;

  /**
   * Color of eyes.
   */
  readonly eye_color: string;

  /**
   * Gender.
   */
  readonly gender: string;

  /**
   * Color of Hair.
   */
  readonly hair_color: string;

  /**
   * Height in sm.
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
   * Name op people.
   */
  readonly name: string;

  /**
   * Color of skin.
   */
  readonly skin_color: string;
}

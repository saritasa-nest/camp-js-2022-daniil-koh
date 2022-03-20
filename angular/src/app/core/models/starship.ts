/**
 * Starship data that store in database.
 */
export interface Starship {

  /**
   * Mega light per hour.
   */
  readonly megaLight: number;

  /**
   * Hyper drive rating.
   */
  readonly hyperDriveRating: number;

  /**
   * Class of starship.
   */
  readonly starshipClass: string;
}

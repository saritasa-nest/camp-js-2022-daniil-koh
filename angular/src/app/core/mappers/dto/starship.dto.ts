/**
 * Starship data that store in database.
 */
export interface StarshipDto {

  /**
   * Megalight.
   */
  readonly MLGT: string;

  /**
   * Hyperdrive rating.
   */
  readonly hyperdrive_rating: string;

  /**
   * Class of starship.
   */
  readonly starship_class: string;
}

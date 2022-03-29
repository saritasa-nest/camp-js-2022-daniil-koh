/**
 * Starship data that store in database.
 */
export interface StarshipDto {

  /**
   * Megalights per hour.
   */
  readonly MGLT: string;

  /**
   * Hyperdrive rating.
   */
  readonly hyperdrive_rating: string;

  /**
   * Class of starship.
   */
  readonly starship_class: string;
}

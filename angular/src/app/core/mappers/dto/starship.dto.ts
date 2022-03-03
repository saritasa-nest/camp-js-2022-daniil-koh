/**
 * Starship data that store in database.
 */
export interface StarshipDto {

  /**
   * Megalight.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly MLGT: string;

  /**
   * Hyperdrive rating.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly hyperdrive_rating: string;

  /**
   * Class of starship.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly starhip_class: string;
}

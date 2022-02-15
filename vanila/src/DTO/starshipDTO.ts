/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Starships characteristics.
 */
export interface StarshipDTO {

  /**
   *Megalight.
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

/**
 * Transport characteristics.
 */
export interface TransportDTO {

  /**
   * Cargo capacity.
   */
  cargoCapacity: string;

  /**
   * Consumables.
   */
  consumables: string;

  /**
   * Price in credits.
   */
  costInCredits: string;

  /**
   * Date of creation.
   */
  created: string;

  /**
   *Crew id.
   */
  crew: string;

  /**
   * Edited date.
   */
  edited: string;

  /**
   * Length of transport.
   */
  length: string;

  /**
   * Name of manufacturer.
   */
  manufacturer: string;

  /**
   * Max atmospheric speed.
   */
  maxAtmospheringSpeed: string;

  /**
   * Transport model.
   */
  model: string;

  /**
   * Transport name.
   */
  name: string;

  /**
   *Quality of passengers.
   */
  passengers: string;
}

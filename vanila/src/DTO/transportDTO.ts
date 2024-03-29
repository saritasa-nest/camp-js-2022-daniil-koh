/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Transport characteristics.
 */
export interface TransportDTO {

  /**
   * Cargo capacity.
   */
  readonly cargo_capacity: string;

  /**
   * Consumables.
   */
  readonly consumables: string;

  /**
   * Price in credits.
   */
  readonly cost_in_credits: string;

  /**
   * Date of creation.
   */
  readonly created: string;

  /**
   *Crew id.
   */
  readonly crew: string;

  /**
   * Edited date.
   */
  readonly edited: string;

  /**
   * Length of transport.
   */
  readonly length: string;

  /**
   * Name of manufacturer.
   */
  readonly manufacturer: string;

  /**
   * Max atmospheric speed.
   */
  readonly max_atmosphering_speed: string;

  /**
   * Transport model.
   */
  readonly model: string;

  /**
   * Transport name.
   */
  readonly name: string;

  /**
   *Quality of passengers.
   */
  readonly passengers: string;
}

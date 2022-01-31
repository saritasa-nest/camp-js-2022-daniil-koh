import { CollectionInterface } from './collectionInterface';

/**
 * Vehicle characteristics.
 */
export interface VehicleInterface extends CollectionInterface{

  /**
   * Characteristic fieds.
   */
  fields: {

    /**
     * Class of vehicle.
     */
    vehicleClass: string;
  };
}

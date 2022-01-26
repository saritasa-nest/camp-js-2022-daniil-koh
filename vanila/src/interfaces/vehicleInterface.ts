import {CollectionInterface} from "./collectionInterface";

export interface VehicleInterface extends CollectionInterface{
  fields: {
    vehicle_class: string
  }
}

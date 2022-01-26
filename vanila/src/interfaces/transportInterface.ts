import {CollectionInterface} from "./collectionInterface";

export interface TransportInterface extends CollectionInterface {
  fields: {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: string;
    crew: string;
    edited: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
  }
}

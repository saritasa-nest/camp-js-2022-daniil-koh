import {CollectionInterface} from "./collectionInterface";

export interface StarshipInterface extends CollectionInterface{
  fields: {
    MLGT: string,
    hyperdrive_rating:string;
    starhip_class:string
  }
}

import {CollectionInterface} from "./collectionInterface";

export interface PlanetInterface extends CollectionInterface{
  fields: {
    climate: string;
    created:string;
    diameter: string;
    edited:string;
    gravity:string;
    name:string;
    orbital_period:string;
    population:string;
    rotation_period:string;
    surface_water:string;
    terrain:string;
  }
}

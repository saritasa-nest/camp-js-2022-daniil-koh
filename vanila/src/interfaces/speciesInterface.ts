import {CollectionInterface} from "./collectionInterface";

export interface SpeciesInterface extends CollectionInterface{
  fields:{
    average_height: string;
    average_lifespan: string;
    classification: string;
    created: string;
    designation: string;
    edited: string;
    eye_colors: string;
    hair_colors: string;
    homeworld: number;
    language: string;
    name: string;
    people: [number]
    skin_colors: string
  }
}

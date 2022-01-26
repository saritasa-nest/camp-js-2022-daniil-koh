import {CollectionInterface} from "./collectionInterface";

export interface PeopleInterface extends CollectionInterface {
  fields: {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: number;
    mass: string;
    name: string;
    skin_color: string;
  },
}

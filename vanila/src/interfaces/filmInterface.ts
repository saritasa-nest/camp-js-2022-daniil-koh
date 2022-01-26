import {CollectionInterface} from './collectionInterface'

export interface FilmInterface extends CollectionInterface {
  fields: {
    characters: [number];
    created: string;
    director: string;
    episod_id: number;
    opening_crawl: string;
    planets: [number];
    producer: string;
    release_date: string;
    species: [number];
    starships: [number];
    title: string;
    vehicles: [number]
  };
}


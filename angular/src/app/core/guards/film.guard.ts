/* eslint-disable*/
/*
 * Generated type guards for "film.ts".
 * WARNING: Do not manually change this file.
 */
import { Film } from '../models/film';

export function isFilm(obj: any, _argumentName?: string): obj is Film {
  return (
    (obj !== null &&
            typeof obj === 'object' ||
            typeof obj === 'function') &&
        Array.isArray(obj.charactersIds) &&
        obj.charactersIds.every((e: any) =>
          typeof e === 'string') &&
        obj.created instanceof Date &&
        typeof obj.director === 'string' &&
        typeof obj.episodeId === 'number' &&
        typeof obj.openingCrawl === 'string' &&
        Array.isArray(obj.planets) &&
        obj.planets.every((e: any) =>
          typeof e === 'string') &&
        Array.isArray(obj.producer) &&
        obj.producer.every((e: any) =>
          typeof e === 'string') &&
        obj.releaseDate instanceof Date &&
        Array.isArray(obj.species) &&
        obj.species.every((e: any) =>
          typeof e === 'string') &&
        Array.isArray(obj.starships) &&
        obj.starships.every((e: any) =>
          typeof e === 'string') &&
        typeof obj.title === 'string' &&
        Array.isArray(obj.vehicles) &&
        obj.vehicles.every((e: any) =>
          typeof e === 'string')
  );
}

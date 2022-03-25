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
        Array.isArray(obj.planetsIds) &&
        obj.planetsIds.every((e: any) =>
          typeof e === 'string') &&
        Array.isArray(obj.producer) &&
        obj.producer.every((e: any) =>
          typeof e === 'string') &&
        obj.releaseDate instanceof Date &&
        Array.isArray(obj.speciesIds) &&
        obj.speciesIds.every((e: any) =>
          typeof e === 'string') &&
        Array.isArray(obj.starshipsIds) &&
        obj.starshipsIds.every((e: any) =>
          typeof e === 'string') &&
        typeof obj.title === 'string' &&
        Array.isArray(obj.vehiclesIds) &&
        obj.vehiclesIds.every((e: any) =>
          typeof e === 'string')
  );
}

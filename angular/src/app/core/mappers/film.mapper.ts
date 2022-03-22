import { Injectable } from '@angular/core';

import { Film } from '../models/film';

import { FilmDto } from './dto/film.dto';
import { CollectionDto } from './dto/collection.dto';

/** Mapper to transform dto to model. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper {

  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  public getFromDto(dto: CollectionDto<FilmDto>): Film {
    return {
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      releaseDate: new Date(dto.fields.release_date),
      charactersIds: dto.fields.characters,
      created: new Date(dto.fields.created),
      director: dto.fields.director,
      planets: dto.fields.planets,
      producer: dto.fields.producer.split(',').map(producer => producer.trim()),
      species: dto.fields.species,
      starships: dto.fields.starships,
      title: dto.fields.title,
      vehicles: dto.fields.vehicles,
    };
  }
}

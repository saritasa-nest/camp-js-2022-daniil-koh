import { Injectable } from '@angular/core';

import { FilmModel } from '../models/film.model';

import { FilmDTO } from './dto/filmDTO';
import { CollectionDTO } from './dto/collectionDTO';

/** Class to transform dto to model. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper {

  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  public getFromDto(dto: CollectionDTO<FilmDTO>): FilmModel {
    return {
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      releaseDate: dto.fields.release_date,
      ...dto.fields,
    };
  }
}

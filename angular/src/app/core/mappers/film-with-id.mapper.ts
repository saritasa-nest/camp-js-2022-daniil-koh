import { Injectable } from '@angular/core';

import { FilmWithId } from '../services/films.service';

import { CollectionDto } from './dto/collection.dto';
import { FilmDto } from './dto/film.dto';
import { FilmMapper } from './film.mapper';

/** Mapper to merge film data and its id. */
@Injectable({
  providedIn: 'root',
})
export class FilmWithIdMapperMapper {
  public constructor(
    private readonly filmMapper: FilmMapper,
  ) {}

  /**
   * Transform dto to model.
   * @param dto Dto data.
   * @param id Id of film.
   */
  public getFromDto(dto: CollectionDto<FilmDto>, id: string): FilmWithId {
    return {
      ...this.filmMapper.getFromDto(dto),
      id,
    };
  }
}

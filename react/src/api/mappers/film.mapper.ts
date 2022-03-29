/** Mapper to transform dto to model. */
import { CollectionDto } from '../dto/collection.dto';
import { FilmDto } from '../dto/film.dto';
import { Film } from '../models/film';

export namespace FilmMapper {

  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  export function getFromDto(dto: CollectionDto<FilmDto>): Film {
    return {
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      releaseDate: new Date(dto.fields.release_date),
      charactersIds: dto.fields.characters,
      created: new Date(dto.fields.created),
      director: dto.fields.director,
      planetsIds: dto.fields.planets,
      producer: dto.fields.producer.split(',').map(producer => producer.trim()),
      speciesIds: dto.fields.species,
      starshipsIds: dto.fields.starships,
      title: dto.fields.title,
      vehiclesIds: dto.fields.vehicles,
    };
  }
}

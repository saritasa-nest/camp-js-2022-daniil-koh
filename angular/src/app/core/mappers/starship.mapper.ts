import { Injectable } from '@angular/core';

import { Starship } from '../models/starship';

import { StarshipDto } from './dto/starship.dto';
import { CollectionDto } from './dto/collection.dto';

/** Mapper to transform dto to model. */
@Injectable({
  providedIn: 'root',
})
export class StarshipMapper {

  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  public getFromDto(dto: CollectionDto<StarshipDto>): Starship {
    return {
      megaLight: Number(dto.fields.MGLT),
      hyperDriveRating: Number(dto.fields.hyperdrive_rating),
      starshipClass: dto.fields.starship_class,
    };
  }
}

import { Species } from '../models/species';
import { CollectionDto } from '../dto/collection.dto';
import { SpeciesDto } from '../dto/species.dto';

/** Mapper to transform dto to model. */
export class SpeciesMapper {
  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  public getFromDto(dto: CollectionDto<SpeciesDto>): Species {
    return {
      averageHeight: Number(dto.fields.average_height),
      averageLifespan: Number(dto.fields.average_lifespan),
      created: new Date(dto.fields.created),
      designation: dto.fields.designation,
      edited: new Date(dto.fields.edited),
      eyeColors: dto.fields.name,
      hairColors: dto.fields.hair_colors,
      homeWorld: dto.fields.home_world,
      language: dto.fields.language,
      name: dto.fields.name,
      people: dto.fields.people,
      skinColors: dto.fields.skin_colors,
      classification: dto.fields.classification,
    };
  }
}

import { Character } from '../models/character';
import { CollectionDto } from '../dto/collection.dto';
import { CharacterDto } from '../dto/character.dto';

/** To transform dto to model. */
export class CharacterMapper {
  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  public getFromDto(dto: CollectionDto<CharacterDto>): Character {
    return {
      birthYear: new Date(dto.fields.birth_year),
      created: new Date(dto.fields.created),
      edited: new Date(dto.fields.edited),
      eyeColor: dto.fields.eye_color,
      gender: dto.fields.gender,
      hairColor: dto.fields.hair_color,
      height: Number(dto.fields.height),
      homeWorld: dto.fields.homeworld,
      mass: Number(dto.fields.mass),
      name: dto.fields.name,
      skinColor: dto.fields.skin_color,
    };
  }
}

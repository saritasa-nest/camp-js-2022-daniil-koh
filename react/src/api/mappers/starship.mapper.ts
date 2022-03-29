import { Starship } from '../models/starship';
import { CollectionDto } from '../dto/collection.dto';
import { StarshipDto } from '../dto/starship.dto';
/** Mapper to transform dto to model. */
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

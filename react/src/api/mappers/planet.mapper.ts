import { Planet } from '../models/planet';
import { PlanetDto } from '../dto/planet.dto';
import { CollectionDto } from '../dto/collection.dto';

/** Mapper to transform dto to model. */
export class PlanetMapper {
  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  public getFromDto(dto: CollectionDto<PlanetDto>): Planet {
    return {
      climate: dto.fields.climate,
      created: new Date(dto.fields.created),
      diameter: Number(dto.fields.diameter),
      edited: new Date(dto.fields.edited),
      gravity: Number(dto.fields.gravity),
      name: dto.fields.name,
      orbitalPeriod: Number(dto.fields.orbital_period),
      population: Number(dto.fields.population),
      rotationPeriod: Number(dto.fields.rotation_period),
      surfaceWater: Number(dto.fields.surface_water),
      terrain: dto.fields.terrain,
    };
  }
}

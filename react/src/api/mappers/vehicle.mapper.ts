import { Vehicle } from '../models/vehicle';
import { CollectionDto } from '../dto/collection.dto';
import { VehicleDto } from '../dto/vehicle.dto';

/** Mapper to transform dto to model. */
export class VehicleMapper {
  /**
   * Transform dto to model.
   * @param dto Dto data.
   */
  public getFromDto(dto: CollectionDto<VehicleDto>): Vehicle {
    return {
      vehicleClass: dto.fields.vehicle_class,
    };
  }
}

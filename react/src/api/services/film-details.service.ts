import {
  collection,
  doc,
  DocumentData,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { dataBase } from './firebase';
import { Film } from '../models/film';
import { FilmDto } from '../dto/film.dto';
import { CollectionDto } from '../dto/collection.dto';
import { CharacterDto } from '../dto/character.dto';
import { PlanetDto } from '../dto/planet.dto';
import { SpeciesDto } from '../dto/species.dto';
import { StarshipDto } from '../dto/starship.dto';
import { VehicleDto } from '../dto/vehicle.dto';
import { TransportDto } from '../dto/transport.dto';
import { FilmMapper } from '../mappers/film.mapper';

type DtoFilmDetails =
  | CharacterDto
  | PlanetDto
  | SpeciesDto
  | StarshipDto
  | TransportDto
  | VehicleDto;

export namespace FilmDetailsService {
  /** Firestore. */
  const firestore = dataBase;
  /** Default path collection. */
  const filmPathCollection = 'films';

  /**
   * Get docs by id and path.
   * @param collectionPath Pathname of collection.
   * @param fieldIds Array of needed ids.
   */
  export async function getDocSnapByIds(fieldIds: readonly string[], collectionPath: string): Promise<DocumentData[]> {
    const col = collection(firestore, collectionPath);
    const ids = [...fieldIds];
    const batches = [];
    while (ids.length) {
      // Firestore limits batches to 10.
      const batch = ids.splice(0, 10);
      const dataQuery = query(col, where(documentId(), 'in', batch));

      // Add the batch request to to a queue.
      batches.push(getDocs(dataQuery).then(docSnap => docSnap.docs.map(detailDoc => detailDoc.data())));
    }
    // After all the data is fetched, return it.
    return Promise.all(batches)
      .then(data => data.flat());
  }

  /**
   * Get field data by its name.
   * @param filmDetails Details film as document.
   * @param fieldName Key of film detail data.
   */
  export function getDataDtoByFieldName<T extends DtoFilmDetails>(
    filmDetails: CollectionDto<T>[],
    fieldName: keyof T,
  ): unknown[] {
    return filmDetails.map(dto => {
      if (!dto.fields || !dto.fields[fieldName]) {
        return '';
      }
      return dto.fields[fieldName];
    });
  }

  /**
   * Get all film details.
   * @param filmData Collection film dto.
   */
  export async function formatFilmDetails(filmData: CollectionDto<FilmDto>): Promise<CollectionDto<FilmDto>> {
    return Promise.all([
      getDocSnapByIds(filmData.fields.characters, 'people') as Promise<CollectionDto<CharacterDto>[]>,
      getDocSnapByIds(filmData.fields.planets, 'planets') as Promise<CollectionDto<PlanetDto>[]>,
      getDocSnapByIds(filmData.fields.species, 'species') as Promise<CollectionDto<SpeciesDto>[]>,
      getDocSnapByIds(filmData.fields.starships, 'starships') as Promise<CollectionDto<StarshipDto>[]>,
      getDocSnapByIds(filmData.fields.vehicles, 'vehicles') as Promise<CollectionDto<VehicleDto>[]>,
    ])
      .then(details => details)
      .then(details => ({
        model: filmData.model,
        pk: filmData.pk,
        fields: {
          characters: getDataDtoByFieldName<CharacterDto>(details[0], 'name'),
          planets: getDataDtoByFieldName<PlanetDto>(details[1], 'name'),
          species: getDataDtoByFieldName<SpeciesDto>(details[2], 'name'),
          starships: getDataDtoByFieldName<StarshipDto>(details[3], 'starship_class'),
          vehicles: getDataDtoByFieldName<VehicleDto>(details[4], 'vehicle_class'),
          episode_id: filmData.fields.episode_id,
          title: filmData.fields.title,
          director: filmData.fields.director,
          created: filmData.fields.created,
          release_date: filmData.fields.release_date,
          opening_crawl: filmData.fields.opening_crawl,
          producer: filmData.fields.producer,
        },
      } as CollectionDto<FilmDto>));
  }

  /**
   * Get film details.
   * @param id Film id.
   */
  export async function getFilmDetails(id: string): Promise<Film> {
    return getDoc(
      doc(firestore, filmPathCollection, id),
    )
      .then(filmDoc => formatFilmDetails(filmDoc.data() as CollectionDto<FilmDto>))
      .then(filmDto => FilmMapper.getFromDto(filmDto));
  }

}

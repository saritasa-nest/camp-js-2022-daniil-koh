import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';

import { first, forkJoin, map, Observable, switchMap } from 'rxjs';

import { documentId } from '@angular/fire/firestore';

import { FilmMapper } from '../mappers/film.mapper';
import { CollectionDto } from '../mappers/dto/collection.dto';
import { FilmDto } from '../mappers/dto/film.dto';
import { CharacterDto } from '../mappers/dto/character.dto';
import { PlanetDto } from '../mappers/dto/planet.dto';
import { SpeciesDto } from '../mappers/dto/species.dto';
import { StarshipDto } from '../mappers/dto/starship.dto';
import { TransportDto } from '../mappers/dto/transport.dto';
import { VehicleDto } from '../mappers/dto/vehicle.dto';
import { Film } from '../models/film';

type CollectionsToGetById =
  | 'people'
  | 'planets'
  | 'species'
  | 'starships'
  | 'vehicles';

type DtoFilmDetails =
  | CharacterDto
  | PlanetDto
  | SpeciesDto
  | StarshipDto
  | TransportDto
  | VehicleDto;

/**
 * Service that provide film details.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmDetailsService {

  public constructor(
    private readonly firestore: AngularFirestore,
    private readonly filmMapper: FilmMapper,
  ) {}

  /** Default path collection.*/
  private pathCollection = 'films';

  /**
   * Get all formatted film fields.
   * @param filmId Film id.
   */
  public getFilmDetails(filmId: string): Observable<Film> {
    const docPath = `${this.pathCollection}/${filmId}`;
    return this.firestore.doc(docPath).snapshotChanges()
      .pipe(
        map(data => data.payload.data() as CollectionDto<FilmDto>),
        switchMap(filmDto => this.formatFilmDoc(filmDto)),
      );
  }

  /**
   * Transform film data.
   * @param filmData Film data to transform.
   * @private
   */
  private formatFilmDoc(filmData: CollectionDto<FilmDto>): Observable<Film> {
    return forkJoin({
      characters: this.getDetailsByIds<CharacterDto>(filmData.fields.characters, 'people'),
      planets: this.getDetailsByIds<PlanetDto>(filmData.fields.planets, 'planets'),
      species: this.getDetailsByIds<SpeciesDto>(filmData.fields.species, 'species'),
      starships: this.getDetailsByIds<StarshipDto>(filmData.fields.starships, 'starships'),
      vehicles: this.getDetailsByIds<VehicleDto>(filmData.fields.vehicles, 'vehicles'),
    })
      .pipe(
        map(data => ({
          model: filmData.model,
          pk: filmData.pk,

          fields: {
            characters: this.getDataDtoByFieldName<CharacterDto>(data.characters, 'name'),
            planets: this.getDataDtoByFieldName<PlanetDto>(data.planets, 'name'),
            species: this.getDataDtoByFieldName<SpeciesDto>(data.species, 'name'),
            starships: this.getDataDtoByFieldName<StarshipDto>(data.starships, 'starship_class'),
            vehicles: this.getDataDtoByFieldName<VehicleDto>(data.vehicles, 'vehicle_class'),
            episode_id: filmData.fields.episode_id,
            title: filmData.fields.title,
            director: filmData.fields.director,
            created: filmData.fields.created,
            release_date: filmData.fields.release_date,
            opening_crawl: filmData.fields.opening_crawl,
            producer: filmData.fields.producer,
          },
        } as CollectionDto<FilmDto>)),
        map(data => this.filmMapper.getFromDto(data)),
      );
  }

  /**
   * Get document data from firestore by id.
   * @param ids Ids to get data by.
   * @param collection Collection to get document data from.
   * @private
   */
  private getDetailsByIds<T extends DtoFilmDetails>(
    ids: readonly string[],
    collection: CollectionsToGetById,
  ): Observable<CollectionDto<T>[]> {
    const batches: Observable<DocumentChangeAction<unknown>[]>[] = [];
    const fieldIds = [...ids];
    while (fieldIds.length) {
      // firestore limits batches to 10
      const batch = fieldIds.splice(0, 10);

      // add the batch request to to array
      batches.push(
        this.firestore.collection(collection, ref => ref
          .where(documentId(), 'in', batch)).snapshotChanges()
          .pipe(
            first(),
          ),
      );
    }
    return forkJoin(batches).pipe(
      map(data => data.flat()),
      map(data => data.map(element => (element.payload.doc.data() as CollectionDto<T>))),
    );
  }

  /**
   * Get field data by its name.
   * @param filmDetails Details film as document.
   * @param fieldName Key of film detail data.
   * @private
   */
  private getDataDtoByFieldName<T extends DtoFilmDetails>(filmDetails: CollectionDto<T>[], fieldName: keyof T): unknown[] {
    return filmDetails.map(dto => (dto.fields[fieldName]));
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreDocument,
  DocumentChangeAction,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';

import { catchError, first, forkJoin, from, iif, map, mapTo, Observable, of, switchMap, throwError } from 'rxjs';

import { documentId } from '@angular/fire/firestore';

import { FirebaseError } from 'firebase/app';

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
import { FilmDetails } from '../models/film-details';
import { DocumentDataWithId } from '../models/document-data-with-id';

import { Character } from '../models/character';
import { Planet } from '../models/planet';
import { Species } from '../models/species';
import { Starship } from '../models/starship';
import { Vehicle } from '../models/vehicle';
import { CharacterMapper } from '../mappers/character.mapper';
import { PlanetMapper } from '../mappers/planet.mapper';
import { SpeciesMapper } from '../mappers/species.mapper';
import { StarshipMapper } from '../mappers/starship.mapper';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { UpdatedDetails } from '../../shared/features/edit-film-page/edit-film.component';
type Models =
  | Character
  | Planet
  | Species
  | Starship
  | Vehicle;

type DtoFilmDetails =
  | CharacterDto
  | PlanetDto
  | SpeciesDto
  | StarshipDto
  | TransportDto
  | VehicleDto;

type Collections =
  | 'people'
  | 'planets'
  | 'species'
  | 'starships'
  | 'vehicles';

/** Fields to show user.*/
type DtoFieldsToShow =
  | 'name'
  | 'starship_class'
  | 'vehicle_class';

type CollectionToField = {
  [n in Collections]: DtoFieldsToShow;
};

const collectionToFieldConverter: CollectionToField = {
  people: 'name',
  planets: 'name',
  species: 'name',
  starships: 'starship_class',
  vehicles: 'vehicle_class',
};

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
    private readonly characterMapper: CharacterMapper,
    private readonly planetMapper: PlanetMapper,
    private readonly speciesMapper: SpeciesMapper,
    private readonly starshipMapper: StarshipMapper,
    private readonly vehicleMapper: VehicleMapper,
  ) {}

  /** Default path collection.*/
  private filmPathCollection = 'films';

  /**
   * Delete film from firestore.
   * @param filmId Film id.
   */
  public deleteFilm(filmId: string): Observable<void> {
    return from(this.getFilmDocument(filmId).delete());
  }

  /**
   * Update film details in firestore.
   * @param filmId Film id.
   * @param editedDetails New details to update.
   */
  public updateDetails(filmId: string, editedDetails: UpdatedDetails): Observable<void> {
    return this.getFilmDocument(filmId).valueChanges()
      .pipe(
        map(filmDto => (filmDto as CollectionDto<FilmDto>)),
        switchMap(filmDto =>
          of({
            pk: filmDto.pk || null,
            model: filmDto.model || null,
            fields: {
              director: editedDetails.director || null,
              created: editedDetails.createdDate.toISOString() || null,
              release_date: editedDetails.releaseDate.toISOString() || null,
              producer: editedDetails.producer || null,
              opening_crawl: editedDetails.openingCrawl || null,
              episode_id: filmDto.fields.episode_id || null,
              title: editedDetails.title || null,
              species: editedDetails.species || null,
              starships: editedDetails.starships || null,
              vehicles: filmDto.fields.vehicles || null,
              planets: editedDetails.planets || null,
              characters: editedDetails.characters || null,
            },
          } as CollectionDto<FilmDto>)),
        switchMap(data => from(this.getFilmDocument(filmId).update(data))),
        catchError((err: FirebaseError) => throwError(() => err)),
        mapTo(void 0),
      );

  }

  /**
   * Get all film details.
   */
  public getAllDetails(): Observable<FilmDetails> {
    return forkJoin({
      charactersDocs: this.getCollection('people'),
      planetsDocs: this.getCollection('planets'),
      speciesDocs: this.getCollection('species'),
      starshipsDocs: this.getCollection('starships'),
      vehiclesDocs: this.getCollection('vehicles'),
    }).pipe(
      map(data => ({
        characters: this.getDataWithIds<CharacterDto>(data.charactersDocs, this.characterMapper.getFromDto),
        planets: this.getDataWithIds<PlanetDto>(data.planetsDocs, this.planetMapper.getFromDto),
        species: this.getDataWithIds<SpeciesDto>(data.speciesDocs, this.speciesMapper.getFromDto),
        starships: this.getDataWithIds<StarshipDto>(data.starshipsDocs, this.starshipMapper.getFromDto),
        vehicles: this.getDataWithIds<VehicleDto>(data.vehiclesDocs, this.vehicleMapper.getFromDto),
      } as FilmDetails)),
    );
  }

  /**
   * Get all formatted film fields.
   * @param filmId Film id.
   * @param convertId Need to convert ids.
   */
  public getFilmDetails(filmId: string, convertId = true): Observable<Film> {
    return this.getFilmDocument(filmId).valueChanges()
      .pipe(
        map(filmDto => {
          if (filmDto) {
            return filmDto;
          }
            return {} as CollectionDto<FilmDto>;
        }),
        switchMap(filmDto =>
            iif(
              () => convertId,
              this.formatFilmDoc(filmDto),
              of(this.filmMapper.getFromDto(filmDto)),
            )),
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
    ids: readonly string[] | undefined,
    collection: Collections,
  ): Observable<CollectionDto<T>[]> {

    // To avoid iterable error.
    if (!ids) {
      return of([{}] as CollectionDto<T>[]);
    }
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
    return filmDetails.map(dto => {
      if (!dto.fields || !dto.fields[fieldName]) {
        return '';
      }
      return dto.fields[fieldName];
    });
  }

  /**
   * Get collection.
   * @param collectionName Collection name.
   */
  private getCollection(collectionName: Collections): Observable<QueryDocumentSnapshot<unknown>[]> {
    return this.firestore.collection(collectionName, ref => ref
      .orderBy(`fields.${collectionToFieldConverter[collectionName]}`, 'asc')).snapshotChanges()
      .pipe(
        map(documentChangeActions => documentChangeActions.map(action => action.payload.doc)),
        first(),
      );
  }

  /**
   * Get doc data with ids.
   * @param documents Documents to get data from.
   * @param mapper Function to transform doc data.
   * @private
   */
  private getDataWithIds<T extends DtoFilmDetails>(
    documents: QueryDocumentSnapshot<unknown>[],
    mapper: (dto: CollectionDto<T>) => Models,
  ): DocumentDataWithId<Models>[] {
    return documents
      .map(document => ({
      id: document.id,
      data: mapper(document.data() as CollectionDto<T>),
      } as DocumentDataWithId<Models>));
  }

  private getFilmDocument(filmId: string): AngularFirestoreDocument<CollectionDto<FilmDto>> {
    return this.firestore.doc<CollectionDto<FilmDto>>(`${this.filmPathCollection}/${filmId}`);
  }
}

import {
  DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue,
} from 'firebase/firestore';
import { FilmDto } from 'src/api/dto/film.dto';
import { Film } from 'src/api/models/film';
import { CollectionDto } from '../../dto/collection.dto';
import { FilmMapper } from '../film.mapper';
import { FilmWithId } from '../../models/film-with-id';

export const filmConverter: FirestoreDataConverter<Film> = {
  toFirestore(modelObject: WithFieldValue<Film>): DocumentData {
    return {
      director: modelObject.director || null,
      created: modelObject.created || null,
      release_date: modelObject.releaseDate || null,
      producer: modelObject.producer || null,
      opening_crawl: modelObject.openingCrawl || null,
      episode_id: modelObject.episodeId || null,
      title: modelObject.title || null,
      species: modelObject.speciesIds || null,
      starships: modelObject.starshipsIds || null,
      vehicles: modelObject.vehiclesIds || null,
      planets: modelObject.planetsIds || null,
      characters: modelObject.charactersIds || null,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): FilmWithId {
    return {
      id: snapshot.id,
      ...FilmMapper.getFromDto(snapshot.data() as CollectionDto<FilmDto>),
    } as FilmWithId;
  },
};

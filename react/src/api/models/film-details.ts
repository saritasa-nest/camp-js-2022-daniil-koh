import { DocumentDataWithId } from './document-data-with-id';
import { Character } from './character';
import { Planet } from './planet';
import { Species } from './species';
import { Starship } from './starship';
import { Vehicle } from './vehicle';

/** All details from film series. */
export interface FilmDetails {

  /** All film characters. */
  readonly characters: DocumentDataWithId<Character>[];

  /** All film planets. */
  readonly planets: DocumentDataWithId<Planet>[];

  /** All film species. */
  readonly species: DocumentDataWithId<Species>[];

  /** All film starships. */
  readonly starships: DocumentDataWithId<Starship>[];

  /** All film vehicles. */
  readonly vehicles: DocumentDataWithId<Vehicle>[];
}

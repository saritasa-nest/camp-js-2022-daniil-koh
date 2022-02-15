import { FilmDTO } from '../DTO/filmDTO';

import { PlanetDTO } from '../DTO/planetDTO';
import { SpeciesDTO } from '../DTO/speciesDTO';
import { StarshipDTO } from '../DTO/starshipDTO';
import { VehicleDTO } from '../DTO/vehicleDTO';
import { PeopleDTO } from '../DTO/peopleDTO';

import { getDocsByIds } from './getDocsByIds';
import { getFormattedDTOData } from './getFormattedDTOData';

/**
 * Details of film.
 */
interface FilmDetails{

  /** Characters that were in film.*/
  readonly charactersNames: string[];

  /** Film title.*/
  readonly filmTitle: string;

  /** Planet names that were in films.*/
  readonly planetsNames: string[];

  /** Names of species that were in films. */
  readonly speciesNames: string[];

  /** Classes of starships  that were in film. */
  readonly starshipsClasses: string[];

  /** Classes of vehicles classes that were in film. */
  readonly vehiclesClasses: string[];

  /** Film director. */
  readonly director: string;

  /** Date of creation. */
  readonly created: string;

  /** Producers or producer. */
  readonly producer: string;

  /** Date of release. */
  readonly releaseDate: string;

  /** Crawl in the beginning of film. */
  readonly openingCrawl: string;
}

/**
 * Get all details about films.
 */
export async function getFilmDetails(): Promise<FilmDetails> {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const detailSearchParams = (Object.fromEntries(urlSearchParams.entries()));
  const { id } = detailSearchParams;

  // Get fields from db to fill detail page.
  const DTOFormFilm = await getFormattedDTOData<FilmDTO>(id);
  const DTOFormPlanets = await getDocsByIds<PlanetDTO>('planets', DTOFormFilm.fields.planets);
  const DTOFormSpecies = await getDocsByIds<SpeciesDTO>('species', DTOFormFilm.fields.species);
  const DTOFormStarships = await getDocsByIds<StarshipDTO>('starships', DTOFormFilm.fields.starships);
  const DTOFormVehicles = await getDocsByIds<VehicleDTO>('vehicles', DTOFormFilm.fields.vehicles);
  const DTOFormCharacters = await getDocsByIds<PeopleDTO>('people', DTOFormFilm.fields.characters);

  // Get titles from DTOs.
  const planetsNames = DTOFormPlanets.map(planetDTO => planetDTO.fields.name);
  const speciesNames = DTOFormSpecies.map(speciesDTO => speciesDTO.fields.name);
  const starshipsClasses = DTOFormStarships.map(starshipDTO => starshipDTO.fields.starship_class);
  const vehiclesClasses = DTOFormVehicles.map(vehicleDTO => vehicleDTO.fields.vehicle_class);
  const charactersNames = DTOFormCharacters.map(vehicleDTO => vehicleDTO.fields.name);

  const { director, created, producer, release_date: releaseDate, opening_crawl: openingCrawl } = DTOFormFilm.fields;

  const filmTitle = DTOFormFilm.fields.title;
  return {
    charactersNames,
    filmTitle,
    planetsNames,
    speciesNames,
    starshipsClasses,
    vehiclesClasses,
    director,
    created,
    producer,
    releaseDate,
    openingCrawl,
  };
}

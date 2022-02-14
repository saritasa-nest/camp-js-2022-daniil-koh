import { getFormattedDTOData } from '../middlewares/getFormattedDTOData';
import { FilmDTO } from '../DTO/filmDTO';
import { getDocsByIds } from '../middlewares/getDocsByIds';
import { PlanetDTO } from '../DTO/planetDTO';
import { SpeciesDTO } from '../DTO/speciesDTO';
import { StarshipDTO } from '../DTO/starshipDTO';
import { VehicleDTO } from '../DTO/vehicleDTO';
import { PeopleDTO } from '../DTO/peopleDTO';

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
async function getDetails(): Promise<FilmDetails> {
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

  console.log('starships', DTOFormStarships);

  // Get titles from DTOs.
  const planetsNames = DTOFormPlanets.map(planetDTO => planetDTO.fields.name);
  const speciesNames = DTOFormSpecies.map(speciesDTO => speciesDTO.fields.name);
  const starshipsClasses = DTOFormStarships.map(starshipDTO => starshipDTO.fields.starhip_class);
  const vehiclesClasses = DTOFormVehicles.map(vehicleDTO => vehicleDTO.fields.vehicle_class);
  const charactersNames = DTOFormCharacters.map(vehicleDTO => vehicleDTO.fields.name);
  console.log('starships', starshipsClasses);

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

/**
 * Set data on detail page.
 */
export async function setDetails(): Promise<void> {
  const {
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
  } = await getDetails();
  const titleElement = document.querySelector('.title-input') as HTMLDivElement;
  const directorElement = document.querySelector('.director-input') as HTMLDivElement;
  const producerElement = document.querySelector('.producer-input') as HTMLDivElement;
  const createdElement = document.querySelector('.created-input') as HTMLDivElement;
  const charactersElement = document.querySelector('.characters-input') as HTMLDivElement;
  const planetsElement = document.querySelector('.planets-input') as HTMLDivElement;
  const speciesElement = document.querySelector('.species-input') as HTMLDivElement;
  const starshipsElement = document.querySelector('.starships-input') as HTMLDivElement;
  const vehiclesElement = document.querySelector('.vehicles-input') as HTMLDivElement;
  const releaseElement = document.querySelector('.release-input') as HTMLDivElement;
  const openingCrawlElement = document.querySelector('.opening-crawl-input') as HTMLDivElement;

  console.log('Does it work?');
  titleElement.innerText = filmTitle ;
  directorElement.innerText = director;
  producerElement.innerText = producer;
  createdElement.innerText = created;
  charactersElement.innerText = charactersNames.join(',');
  planetsElement.innerText = planetsNames.join(',');
  speciesElement.innerText = speciesNames.join(',');
  starshipsElement.innerText = starshipsClasses.join(',');
  vehiclesElement.innerText = vehiclesClasses.join(',');
  releaseElement.innerText = releaseDate;
  openingCrawlElement.innerText = openingCrawl;
}

import { getFilmDetails } from '../middlewares/getFilmDetails';

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
  } = await getFilmDetails();
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

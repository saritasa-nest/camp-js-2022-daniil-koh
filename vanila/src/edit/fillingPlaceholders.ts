import { getFilmDetails } from '../middlewares/getFilmDetails';

/**
 * Fill placeholders by exciting data.
 */
export async function fillingPlaceholders(): Promise<void> {
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
  const titleElement = document.querySelector('.title-textarea') as HTMLTextAreaElement;
  const directorElement = document.querySelector('.director-textarea') as HTMLTextAreaElement;
  const producerElement = document.querySelector('.producer-textarea') as HTMLTextAreaElement;
  const createdElement = document.querySelector('.created-textarea') as HTMLTextAreaElement;
  const charactersElement = document.querySelector('.characters-textarea') as HTMLTextAreaElement;
  const planetsElement = document.querySelector('.planets-textarea') as HTMLTextAreaElement;
  const speciesElement = document.querySelector('.species-textarea') as HTMLTextAreaElement;
  const starshipsElement = document.querySelector('.starships-textarea') as HTMLTextAreaElement;
  const vehiclesElement = document.querySelector('.vehicles-textarea') as HTMLTextAreaElement;
  const releaseElement = document.querySelector('.release-textarea') as HTMLTextAreaElement;
  const openingCrawlElement = document.querySelector('.opening-crawl-textarea') as HTMLTextAreaElement;

  titleElement.value = filmTitle ;
  directorElement.value = director;
  producerElement.value = producer;
  createdElement.value = created;
  charactersElement.value = charactersNames.join(',');
  planetsElement.value = planetsNames.join(',');
  speciesElement.value = speciesNames.join(',');
  starshipsElement.value = starshipsClasses.join(',');
  vehiclesElement.value = vehiclesClasses.join(',');
  releaseElement.value = releaseDate;
  openingCrawlElement.value = openingCrawl;

};

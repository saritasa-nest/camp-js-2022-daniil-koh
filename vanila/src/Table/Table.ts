import { getAuthStatus } from '../index';
import { formateCollectionData } from '../middlewares/formateCollectionData';

// import {capitalizeFirstLetter} from "../StringFormatter/capitalizeFirstLetter";
import { FilmInterface } from '../interfaces/filmInterface';

const tableElement = document.createElement('table');
tableElement.className = 'data';
tableElement.innerHTML = (`
        <thead>
          <tr class="columns-titles">
          </tr>
        </thead>
        <tbody class="elements">
        </tbody>`);

const titlesForColumns = ['Title', 'Director', 'Producer', 'Release'];

//  TODO sortTable(idx)

/**
 * Set films in table.
 * @param films Film collection from firestore.
 */
function setFilmsInTable(films: FilmInterface[]): void {
  const tableBody: Element = tableElement.getElementsByClassName('elements')[0];
  for (const [idx, film] of films.entries()) {
    const row: HTMLTableRowElement = document.createElement('tr');
    row.id = String(idx);

    // fields to show
    const { director, releaseDate, producer, title } = film.fields;

    const directorEl: HTMLTableCellElement = document.createElement('td');
    const releaseDateEl: HTMLTableCellElement = document.createElement('td');
    const producerEl: HTMLTableCellElement = document.createElement('td');
    const titleEL: HTMLTableCellElement = document.createElement('td');

    directorEl.className = 'director';
    releaseDateEl.className = 'release-date';
    producerEl.className = 'producer';
    titleEL.className = 'title';

    directorEl.innerHTML = director;
    releaseDateEl.innerHTML = releaseDate;
    producerEl.innerHTML = producer;
    titleEL.innerHTML = title;

    row.append(directorEl, releaseDateEl, producerEl, titleEL);
    tableBody.appendChild(row);
  }
}

/**
 * Set titles for columns.
 */
function setColumnsNamesInTable(): void {
  const columnsTitles: Element = tableElement.getElementsByClassName('columns-titles')[0];
  columnsTitles.innerHTML = '';

  // eslint-disable-next-line no-unused-vars
  for (const [, title] of titlesForColumns.entries()) {
    const colNameEl: HTMLTableCellElement = document.createElement('th');
    colNameEl.innerHTML = title;

    // TODO colNameEl.onclick = () => sortTable(idx);

    columnsTitles.appendChild(colNameEl);
  }
}

/**
 * Return a table and render it during life cycle of element.
 */
export const table = (): HTMLTableElement => {
  // const tableElement: Element = document.getElementsByClassName('table')[0]
  initializeTable();
  return getElement();

  /**
   * Init table.
   */
  function initializeTable(): void {
    if (getAuthStatus()) {
      formateCollectionData('films').then(data => {
        const films = <FilmInterface[]>data;
        if (films.length !== 0) {
          setColumnsNamesInTable();
          setFilmsInTable(films);
        } else {
          tableElement.innerHTML = 'No films';
        }
      })
        .catch(er => {
          throw new Error(er);
        });
    }

  }

  /**
   * Return Table element.
   */
  function getElement(): HTMLTableElement {
    return tableElement;
  }

};

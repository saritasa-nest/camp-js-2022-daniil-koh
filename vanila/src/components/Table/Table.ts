import { getFormattedCollectionData } from '../../middlewares/getFormattedCollectionData';
import { FilmDTO } from '../../DTO/filmDTO';
import { CollectionDTO } from '../../DTO/collectionDTO';

import { changePage, initPagination } from './Pagination';

// Create auth variable to induct how show table for user.
// @ts-ignore
let isAuthedTable = false;

/**
 * Change auth status.
 * @param flag Value of status.
 */
export const changeAuthTableStatus = (flag: boolean): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isAuthedTable = flag;
};

const tableElement = document.createElement('table');
tableElement.classList.add('data');
tableElement.innerHTML = (`
        <thead>
          <tr class="columns-titles">
          </tr>
        </thead>
        <tbody class="elements">
        </tbody>`);

const titlesForColumns = ['Title', 'Director', 'Producer', 'Release'];

/**
 * Make a request to db to sort data.
 * @param sortKey Column name to sort by.
 */
export function sortTable(sortKey: string): void {
  getFormattedCollectionData('films', sortKey).then(data => {
    const films = <CollectionDTO<FilmDTO>[]> data;
    if (films.length !== 0) {
      initPagination(films);
      setFilmsInTable(changePage(1));
    } else {
      tableElement.innerHTML = 'No films';
    }
  });

}

/**
 * Set films in table.
 * @param films Film collection from firestore.
 */
export function setFilmsInTable(films: CollectionDTO<FilmDTO>[]): void {
  const tableBody = tableElement.querySelector<HTMLTableElement>('.elements');
  if (tableBody !== null) {
    tableBody.innerHTML = '';
    for (const [idx, film] of films.entries()) {
      const row: HTMLTableRowElement = document.createElement('tr');
      row.id = String(idx);

      // fields to show
      const { director, release_date, producer, title } = film.fields;
      const directorEl: HTMLTableCellElement = document.createElement('td');
      const releaseDateEl: HTMLTableCellElement = document.createElement('td');
      const producerEl: HTMLTableCellElement = document.createElement('td');
      const titleEL: HTMLTableCellElement = document.createElement('td');

      directorEl.className = 'director';
      releaseDateEl.className = 'release-date';
      producerEl.className = 'producer';
      titleEL.className = 'title';

      directorEl.innerHTML = director;
      releaseDateEl.innerHTML = release_date;
      producerEl.innerHTML = producer;
      titleEL.innerHTML = title;

      row.append(titleEL, directorEl, producerEl, releaseDateEl);

      // if (isAuthedTable) {
      //   row.addEventListener('click', () => {
      //
      //   });
      //   row.classList.add('waves-effect');
      // }
      tableBody.appendChild(row);
    }
  }
}

/**
 * Set titles for columns.
 */
function setColumnsNamesInTable(): void {
  const columnsTitles: Element = <Element>tableElement.querySelector('.columns-titles');
  columnsTitles.innerHTML = '';

  for (const title of titlesForColumns) {
    const colNameEl: HTMLTableCellElement = document.createElement('th');
    colNameEl.innerHTML = title;
    columnsTitles.appendChild(colNameEl);
  }
}

/**
 * Init table.
 */
function initializeTable(): void {
  getFormattedCollectionData<FilmDTO>('films').then(data => {
    const films = <CollectionDTO<FilmDTO>[]>data;
    if (films.length !== 0) {
      setColumnsNamesInTable();
      initPagination(films);
      setFilmsInTable(changePage(1));
    } else {
      tableElement.innerHTML = 'No films';
    }
  })
    .catch(er => {
      throw new Error(er);
    });
}

/**
 * Return Table element.
 */
function getElement(): HTMLTableElement {
  return tableElement;
}

/**
 * Return a table and render it during life cycle of element.
 */
export const table = (): HTMLTableElement => {
  initializeTable();
  return getElement();

};

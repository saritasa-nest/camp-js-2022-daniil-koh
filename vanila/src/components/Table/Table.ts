import {
  getFormattedCollectionDataWithId,
} from '../../middlewares/getFormattedCollectionDataWithId';
import { FilmDTO } from '../../DTO/filmDTO';

import { CollectionDocument } from '../../Interfaces/collectionDocument';

import { changePage, initPagination } from './Pagination';

// Create auth variable to induct how show table for user.
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
  getFormattedCollectionDataWithId<FilmDTO>('films', sortKey).then(filmsDocs => {
    if (filmsDocs.length !== 0) {
      initPagination(filmsDocs);
      setFilmsInTable(changePage(1));
    } else {
      tableElement.innerHTML = 'No films';
    }
  });

}

/**
 * Set films in table.
 * @param filmsDocs Film collection from firestore.
 */
export function setFilmsInTable(filmsDocs: CollectionDocument<FilmDTO>[]): void {
  const tableBody = tableElement.querySelector<HTMLTableElement>('.elements');
  if (tableBody !== null) {
    tableBody.innerHTML = '';
    for (const filmDoc of filmsDocs) {
      const { id, dataDTO } = filmDoc;
      const row: HTMLTableRowElement = document.createElement('tr');
      row.id = String(id);

      // fields to show
      const { director, release_date, producer, title } = dataDTO.fields;
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

      if (isAuthedTable) {
        // eslint-disable-next-line no-loop-func
        row.addEventListener('click', () => {
          window.location.href = `/detail/?id=${id}`;
        });
      }
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
  getFormattedCollectionDataWithId<FilmDTO>('films').then(filmsDocs => {
    if (filmsDocs.length !== 0) {
      setColumnsNamesInTable();
      initPagination(filmsDocs);
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
 * Init table, return it after initialization.
 */
export const getTable = (): HTMLTableElement => {
  initializeTable();
  return tableElement;
};

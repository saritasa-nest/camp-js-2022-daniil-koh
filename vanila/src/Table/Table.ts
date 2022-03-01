import { getFormattedCollectionData } from '../middlewares/getFormattedCollectionData';
import { FilmDTO } from '../DTO/filmDTO';
import { CollectionDTO } from '../DTO/collectionDTO';

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

/**
 * Set films in table.
 * @param films FilmModel collection from firestore.
 */
function setFilmsInTable(films: CollectionDTO<FilmDTO>[]): void {
  const tableBody = tableElement.querySelector<HTMLTableSectionElement>('.elements');
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
      tableBody.appendChild(row);
    }
  }
}

/**
 * Set titles for columns.
 */
function setColumnsNamesInTable(): void {
  const columnsTitles = tableElement.querySelector<HTMLTableRowElement>('.columns-titles');
  if (columnsTitles !== null) {
    columnsTitles.innerHTML = '';

    for (const title of titlesForColumns) {
      const colNameEl: HTMLTableCellElement = document.createElement('th');
      colNameEl.innerHTML = title;

      // TODO colNameEl.onclick = () => sortTable(idx);

      columnsTitles.appendChild(colNameEl);
    }
  }
}

/**
 * Init table.
 */
function initializeTable(): void {
  getFormattedCollectionData<FilmDTO>('films').then(data => {
    const films = data;
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

/**
 * Return a table and render it during life cycle of element.
 */
export const table = (): HTMLTableElement => {
  initializeTable();
  return tableElement;
};

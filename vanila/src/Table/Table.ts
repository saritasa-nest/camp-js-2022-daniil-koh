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

//  TODO sortTable(idx)
// const sortingKeys = ["title", "director", "producer", 'release_date'];

// function sortTable(sortColumnName: string) {
//   const idxOfSortingKey = titlesForColumns.indexOf(sortColumnName)
//   const sortKey = sortingKeys[idxOfSortingKey]
//   formatCollectionData('films', sortKey).then(data => {
//     const films = <FilmInterface[]>data;
//     if (films.length !== 0) {
//       setFilmsInTable(films);
//     } else {
//       tableElement.innerHTML = 'No films';
//     }
//   })
//
// }

/**
 * Set films in table.
 * @param films Film collection from firestore.
 */
function setFilmsInTable(films: CollectionDTO<FilmDTO>[]): void {
  const tableBody: Element = tableElement.getElementsByClassName('elements')[0];
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

/**
 * Set titles for columns.
 */
function setColumnsNamesInTable(): void {
  const columnsTitles: Element = <Element>tableElement.querySelector('.columns-titles');
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
  initializeTable();
  return getElement();

  /**
   * Init table.
   */
  function initializeTable(): void {
    getFormattedCollectionData<FilmDTO>('films').then(data => {
      const films = <CollectionDTO<FilmDTO>[]>data;
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
   * Return Table element.
   */
  function getElement(): HTMLTableElement {
    return tableElement;
  }

};

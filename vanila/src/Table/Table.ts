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

/**
 * Sort table by clicked column.
 * @param n Clicked column.
 */
function sortTable(n: number): void {
  let rows: HTMLCollectionOf<HTMLTableRowElement>;
  let i: number;
  let currentRowElement: Element;
  let nextRowElement: Element;
  let switchcount = 0;
  let switching = true;
  let shouldSwitch = false;
  let dir = 'asc';

  // Set the sorting direction to ascending:
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = tableElement.getElementsByTagName('tr');

    /* Loop through all table rows (except the
    first, which contains table headers): */
    if (rows.length !== 0) {
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;

        currentRowElement = rows[i].getElementsByTagName('TD')[n];
        nextRowElement = rows[i + 1].getElementsByTagName('TD')[n];

        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir === 'asc') {
          if (currentRowElement.innerHTML.toLowerCase() > nextRowElement.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (currentRowElement.innerHTML.toLowerCase() < nextRowElement.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
        switching = true;

        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }
}

/**
 *
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
  for (const [idx, title] of titlesForColumns.entries()) {
    const colNameEl: HTMLTableCellElement = document.createElement('th');
    colNameEl.innerHTML = title;
    colNameEl.onclick = () => sortTable(idx);
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
  async function initializeTable(): Promise<void> {
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

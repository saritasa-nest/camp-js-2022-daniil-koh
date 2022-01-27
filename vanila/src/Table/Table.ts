import {getAuthStatus} from "../index";
import {formateCollectionData} from "../middlewares/formateCollectionData";
// import {capitalizeFirstLetter} from "../StringFormatter/capitalizeFirstLetter";
import {FilmInterface} from "../interfaces/filmInterface";


const TEMPLATE_El = document.createElement("table")
TEMPLATE_El.className = 'data'
TEMPLATE_El.innerHTML = (`
        <thead>
          <tr class="columns-titles">
          </tr>
        </thead>
        <tbody class="elements">
        </tbody>`)

const titlesForColumns = ["Title", "Director", "Producer", "Release"]

export const Table = () => {
  // const tableElement: Element = document.getElementsByClassName('table')[0]
  setDataInTable()
  return getElement()

  async function setDataInTable() {
    if (getAuthStatus()) {
      formateCollectionData('films').then(data => {
        const films = <FilmInterface[]>data
        console.log(films)
        console.log(films.length)
        if (films.length !== 0) {
          const columnsTitles: Element = TEMPLATE_El.getElementsByClassName('columns-titles')[0]
          console.log('really?')
          columnsTitles.innerHTML=''
          for (let [idx, title] of titlesForColumns.entries()) {
            const colNameEl: HTMLTableCellElement = document.createElement('th')
            colNameEl.innerHTML = title
            colNameEl.onclick = () => sortTable(idx);
            columnsTitles.appendChild(colNameEl)
          }
          const tableBody:Element = TEMPLATE_El.getElementsByClassName('elements')[0]
          for (let [idx, film] of films.entries()){
            let row: HTMLTableRowElement = document.createElement('tr')
            row.id = String(idx)
            //fields to show
            const {director, release_date, producer, title} = film.fields

            const directorEl: HTMLTableCellElement = document.createElement('td' )
            const releaseDateEl: HTMLTableCellElement = document.createElement('td')
            const producerEl: HTMLTableCellElement = document.createElement('td')
            const titleEL: HTMLTableCellElement = document.createElement('td')

            directorEl.className = 'director'
            releaseDateEl.className = 'release-date'
            producerEl.className = 'producer'
            titleEL.className = 'title'

            directorEl.innerHTML = director
            releaseDateEl.innerHTML = release_date
            producerEl.innerHTML = producer
            titleEL.innerHTML = title

            row.append(directorEl,releaseDateEl,producerEl,titleEL)
            tableBody.appendChild(row)
          }
        } else {
          TEMPLATE_El.innerHTML = "No films"
        }
      })
        .catch(er => {
          console.log(er)
        })
    }

  }

  function getElement(): Element {
    return TEMPLATE_El
  }

  function sortTable(n: number) {
    let rows: HTMLCollectionOf<HTMLTableRowElement>;
    let i: number;
    let currentRowElement: Element;
    let nextRowElement: Element;
    let switchcount: number = 0;
    let switching: boolean = true;
    let shouldSwitch: boolean = false;
    let dir: string = "asc";

    // Set the sorting direction to ascending:
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = TEMPLATE_El.getElementsByTagName('tr');
      /* Loop through all table rows (except the
      first, which contains table headers): */
      if (rows.length !== 0) {
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;

          currentRowElement = rows[i].getElementsByTagName("TD")[n];
          nextRowElement = rows[i + 1].getElementsByTagName("TD")[n];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (currentRowElement.innerHTML.toLowerCase() > nextRowElement.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
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
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      } else {

      }
    }
  }
}

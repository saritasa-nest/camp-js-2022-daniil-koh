import { CollectionDTO } from '../../DTO/collectionDTO';
import { FilmDTO } from '../../DTO/filmDTO';

import { setFilmsInTable } from './Table';

const PAGINATION_ELEMENT = document.createElement('ul');
PAGINATION_ELEMENT.classList.add('pagination');
PAGINATION_ELEMENT.innerHTML = `
<li class="disabled btn_prev"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
<section class="pages"></section>
<li class="waves-effect btn_next"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`;
let current_page = 1;
const records_per_page = 3;

let films: CollectionDTO<FilmDTO>[] = [];

/**
 * Change page.
 * @param pageNum Number page.
 */
function pageHandler(pageNum: number): void {
  if (current_page !== pageNum) {
    setFilmsInTable(changePage(pageNum));
  }
}

/**
 * Go to prev page.
 */
function prevPage(): CollectionDTO<FilmDTO>[] {
  if (current_page > 1) {
    return changePage(current_page - 1);
  }
  return [];

}

/**
 * Go to next page.
 */
function nextPage(): CollectionDTO<FilmDTO>[] {
  if (current_page < numPages()) {
    return changePage(current_page + 1);
  }
  return [];

}

/**
 * Change page number.
 * @param page Num of page.
 */
export function changePage(page: number): CollectionDTO<FilmDTO>[] {
  if (numPages() !== 0) {
    const btnNext = <HTMLLIElement>PAGINATION_ELEMENT.querySelector('.btn_next');
    const btnPrev = <HTMLLIElement>PAGINATION_ELEMENT.querySelector('.btn_prev');
    const data: CollectionDTO<FilmDTO>[] = [];
    let selectedPage: number;

    // Validate page
    if (page < 1) {
      selectedPage = 1;
    } else if (page > numPages()) {
      selectedPage = numPages();
    } else {
      selectedPage = page;
    }

    for (let i = (selectedPage - 1) * records_per_page; i < (selectedPage * records_per_page); i++) {
      data.push(films[i]);
    }

    const previousLi = <HTMLLIElement>PAGINATION_ELEMENT.querySelector(`#\\3${current_page}`);
    previousLi.className = 'waves-effect';
    const selectedLi = <HTMLLIElement>PAGINATION_ELEMENT.querySelector(`#\\3${selectedPage}`);
    selectedLi.className = 'active blue-grey lighten-1';
    current_page = selectedPage;

    if (selectedPage === 1) {
      btnPrev.className = 'disabled btn_prev';
    } else {
      btnPrev.className = 'waves-effect btn_prev';
    }

    if (selectedPage === numPages()) {
      btnNext.className = 'disabled btn_next';
    } else {
      btnNext.className = 'waves-effect btn_next';
    }

    return data;
  }
  return [];

}

/**
 * Return quantity of pages.
 */
function numPages(): number {
  return Math.ceil(films.length / records_per_page);
}

/**
 * Init data and generate digits for pages.
 * @param data Films in order.
 */
export function initPagination(data: CollectionDTO<FilmDTO>[]): void {
  const pages = <HTMLTableSectionElement>PAGINATION_ELEMENT.querySelector('.pages');
  const btnNext = <HTMLLIElement>PAGINATION_ELEMENT.querySelector('.btn_next');
  const btnPrev = <HTMLLIElement>PAGINATION_ELEMENT.querySelector('.btn_prev');

  films = data;
  pages.innerHTML = '';
  for (let i = 0; i < numPages(); i++) {
    const li = document.createElement('li');
    li.classList.add('waves-effect');
    li.addEventListener('click', () => pageHandler(i + 1));
    li.id = String(i + 1);
    const a = document.createElement('a');
    a.href = '#!';
    a.innerHTML = String(i + 1);
    li.append(a);
    pages.append(li);
  }
  if (numPages() === 0) {
    btnNext.style.visibility = 'hidden';
    btnPrev.style.visibility = 'hidden';
  } else {
    btnNext.style.visibility = 'visible';
    btnPrev.style.visibility = 'visible';
  }
}

PAGINATION_ELEMENT.querySelector('.btn_next')?.addEventListener('click', () => {
  if (current_page !== numPages() && numPages() !== 0) {
    setFilmsInTable(nextPage());
  }
});
PAGINATION_ELEMENT.querySelector('.btn_prev')?.addEventListener('click', () => {
  if (current_page !== 1) {
    setFilmsInTable(prevPage());
  }
});

export const pagination = (): HTMLUListElement => PAGINATION_ELEMENT;

// Init to first time.
initPagination([]);

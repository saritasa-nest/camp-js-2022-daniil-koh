import { FilmDTO } from '../../DTO/filmDTO';

import { CollectionDocument } from '../../Interfaces/collectionDocument';

import { setFilmsInTable } from './Table';

const paginationElement = document.createElement('ul');
paginationElement.classList.add('pagination');
paginationElement.innerHTML = `
<li class="disabled btn_prev">
  <a>
    <i class="material-icons">chevron_left</i>
  </a>
</li>
<section class="pages"></section>
<li class="waves-effect btn_next">
  <a>
    <i class="material-icons">chevron_right</i>
  </a>
</li>
`;
let currentPage = 1;
const records_per_page = 3;

let filmsDocs: CollectionDocument<FilmDTO>[] = [];

/**
 * Change page.
 * @param pageNum Number page.
 */
function pageHandler(pageNum: number): void {
  if (currentPage !== pageNum) {
    setFilmsInTable(changePage(pageNum));
  }
}

/**
 * Go to prev page.
 */
function goPrevPage(): CollectionDocument<FilmDTO>[] {
  if (currentPage > 1) {
    return changePage(currentPage - 1);
  }
  return [];

}

/**
 * Go to next page.
 */
function goNextPage(): CollectionDocument<FilmDTO>[] {
  if (currentPage < getNumPages()) {
    return changePage(currentPage + 1);
  }
  return [];

}

/**
 * Change page number.
 * @param page Num of page.
 */
export function changePage(page: number): CollectionDocument<FilmDTO>[] {
  if (getNumPages() !== 0) {
    const buttonNext = <HTMLLIElement>paginationElement.querySelector('.btn_next');
    const buttonPrev = <HTMLLIElement>paginationElement.querySelector('.btn_prev');
    const data: CollectionDocument<FilmDTO>[] = [];
    let selectedPage: number;

    // Validate page
    if (page < 1) {
      selectedPage = 1;
    } else if (page > getNumPages()) {
      selectedPage = getNumPages();
    } else {
      selectedPage = page;
    }

    for (let i = (selectedPage - 1) * records_per_page; i < (selectedPage * records_per_page); i++) {
      data.push(filmsDocs[i]);
    }

    const previousLi = <HTMLLIElement>paginationElement.querySelector(`#\\3${currentPage}`);
    previousLi.className = 'waves-effect';
    const selectedLi = <HTMLLIElement>paginationElement.querySelector(`#\\3${selectedPage}`);
    selectedLi.className = 'active blue-grey lighten-1';
    currentPage = selectedPage;

    if (selectedPage === 1) {
      buttonPrev.className = 'disabled btn_prev';
    } else {
      buttonPrev.className = 'waves-effect btn_prev';
    }

    if (selectedPage === getNumPages()) {
      buttonNext.className = 'disabled btn_next';
    } else {
      buttonNext.className = 'waves-effect btn_next';
    }

    return data;
  }
  return [];

}

/**
 * Return quantity of pages.
 */
function getNumPages(): number {
  return Math.ceil(filmsDocs.length / records_per_page);
}

/**
 * Init data and generate digits for pages.
 * @param data Films in order.
 */
export function initPagination(data: CollectionDocument<FilmDTO>[]): void {
  const pages = <HTMLTableSectionElement>paginationElement.querySelector('.pages');
  const buttonNext = <HTMLLIElement>paginationElement.querySelector('.btn_next');
  const buttonPrev = <HTMLLIElement>paginationElement.querySelector('.btn_prev');

  filmsDocs = data;
  pages.innerHTML = '';

  for (let i = 0; i < getNumPages(); i++) {
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
  if (getNumPages() === 0) {
    buttonNext.style.visibility = 'hidden';
    buttonPrev.style.visibility = 'hidden';
  } else {
    buttonNext.style.visibility = 'visible';
    buttonPrev.style.visibility = 'visible';
  }
}

paginationElement.querySelector('.btn_next')?.addEventListener('click', () => {
                if (currentPage !== getNumPages() && getNumPages() !== 0) {
                setFilmsInTable(goNextPage());
              }
              });
paginationElement.querySelector('.btn_prev')?.addEventListener('click', () => {
                if (currentPage !== 1) {
                setFilmsInTable(goPrevPage());
              }
              });

export const pagination = (): HTMLUListElement => paginationElement;

// Init to first time.
initPagination([]);

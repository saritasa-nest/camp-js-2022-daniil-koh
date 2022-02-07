import { sortTable } from '../Table/Table';

const SELECT_DIV_ELEMENT = document.createElement('div');
SELECT_DIV_ELEMENT.classList.add('input-field', 'col', 's4');
SELECT_DIV_ELEMENT.innerHTML =
  `<select class="select-sort-key">
    <option value="" disabled selected>Sort by</option>
    <option value="title">Title</option>
    <option value="director">Director</option>
    <option value="producer">Producer</option>
    <option value="release_date">Release</option>
    </select>
    `;

export const selectSort = (): HTMLDivElement => {
  initStyles();
  return getElement();

  /**
   * Get select element.
   */
    function getElement(): HTMLDivElement {
      return SELECT_DIV_ELEMENT;
    }

  /**
   * Init materialize css for select.
   * Materialize css is so dumb, and you need to use setTimeout to avoid error.
   */
  function initStyles(): void {
    setTimeout(() => {
      M.FormSelect.init(<HTMLSelectElement>SELECT_DIV_ELEMENT.querySelector('select'));
      SELECT_DIV_ELEMENT.addEventListener('change', event => sortTable((<HTMLTextAreaElement>event.target).value));
    });
  }
};

// import { sortTable } from '../Table/Table';

const SELECT_DIV_ELEMENT = document.createElement('div');
SELECT_DIV_ELEMENT.className = 'input-field col s12';
SELECT_DIV_ELEMENT.innerHTML =
  `<select>
    <option value="" disabled selected>Choose your option</option>
    <option value="title">Title</option>
    <option value="director">Director</option>
    <option value="producer">Producer</option>
    <option value="release_date">Release</option>
    </select>
    `;

export const selectSort = (): HTMLDivElement => {
  // SELECT_DIV_ELEMENT.addEventListener('select', event => sortTable((<HTMLTextAreaElement>event.target).value));
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
    });
  }
};

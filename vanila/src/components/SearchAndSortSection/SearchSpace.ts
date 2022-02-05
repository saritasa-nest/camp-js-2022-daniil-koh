// import { selectSort } from './SelectSort';
import { search } from './Search';
import { selectSort } from './SelectSort';

const SPACE_ELEMENT = document.createElement('div');
SPACE_ELEMENT.className = 'search-space ';

export const searchSpace = (): HTMLDivElement => {

  initSpace();

  return getElement();

  /**
   * Get div element.
   */
  function getElement(): HTMLDivElement {
    return SPACE_ELEMENT;
  }

  /**
   * Append search and select elements.
   */
  function initSpace(): void {
    const row = document.createElement('div');
    row.className = 'row';
    row.append(search(), selectSort());
    SPACE_ELEMENT.append(row);
    SPACE_ELEMENT.append(document.createElement('hr'));
  }
};

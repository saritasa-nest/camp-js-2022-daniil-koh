import { getSearchField } from './Search';
import { selectSort } from './SelectSort';

const SPACE_ELEMENT = document.createElement('div');
SPACE_ELEMENT.classList.add('search-space');

/**
 * Append search and select elements.
 */
function initSpace(): void {
  const row = document.createElement('div');
  row.classList.add('row');
  row.append(getSearchField(), selectSort());
  SPACE_ELEMENT.append(row);
  SPACE_ELEMENT.append(document.createElement('hr'));
}

export const searchSpace = (): HTMLDivElement => SPACE_ELEMENT;

initSpace();

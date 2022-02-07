const SEARCH_ELEMENT: HTMLInputElement = document.createElement('input');
SEARCH_ELEMENT.id = 'search';
SEARCH_ELEMENT.classList.add('search', 'col', 's8');
SEARCH_ELEMENT.placeholder = 'Search';

export const search = (): HTMLInputElement => {

  return getElement();

  /**
   * Get search element.
   */
  function getElement(): HTMLInputElement {
    return SEARCH_ELEMENT;
  }
};

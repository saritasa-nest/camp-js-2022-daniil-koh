const searchElement: HTMLInputElement = document.createElement('input');
searchElement.id = 'search';
searchElement.classList.add('search', 'col', 's8');
searchElement.placeholder = 'Search';

/**
 * Return search field element.
 */
export const getSearchField = (): HTMLInputElement => searchElement;

import { table } from './Table';
import { pagination } from './Pagination';

const TABLE_AREA_EL = document.createElement('div');
TABLE_AREA_EL.classList.add('table-area');
const tableElement: HTMLTableElement = table();
const paginationElement: HTMLUListElement = pagination();
paginationElement.classList.add('col-md-12', 'center', 'text-center');
const row = document.createElement('div');
row.classList.add('row');
row.append(paginationElement);
TABLE_AREA_EL.append(tableElement, row);

export const tableArea = (): HTMLDivElement => TABLE_AREA_EL;

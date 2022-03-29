import { VFC } from 'react';
import FilmsTable from '../../components/table/FilmsTable';
import { TextFieldFilm } from '../../components/textFieldFilm';

export const FilmsPage: VFC = () => (
  <>
    <TextFieldFilm />
    <FilmsTable />
  </>
);

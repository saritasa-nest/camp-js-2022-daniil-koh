import { VFC } from 'react';
import { FilmsTable } from '../../components/table';
import { TextFieldFilm } from '../../components/textFieldFilm';

export const FilmsPage: VFC = () => (
  <>
    <TextFieldFilm />
    <FilmsTable />
  </>
);

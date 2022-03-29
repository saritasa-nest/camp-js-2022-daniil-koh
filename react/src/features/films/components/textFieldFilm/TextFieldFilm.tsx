import { ChangeEvent, VFC } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectSearchString } from '../../../../store/films/selectors';
import { searchStringChange } from '../../../../store/films/slice';
import './TextFieldFilm.css';

export const TextFieldFilm: VFC = () => {
  const dispatch = useAppDispatch();
  const searchString = useAppSelector(selectSearchString);

  /**
   * Change text field state.
   * @param event Event.
   */
  const inputChangesHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    dispatch(searchStringChange(event.target.value));
  };

  return (
    <TextField
      className="text-field-films"
      id="standard-basic"
      variant="standard"
      value={searchString}
      onChange={event => inputChangesHandler(event)}
    />
  );
};

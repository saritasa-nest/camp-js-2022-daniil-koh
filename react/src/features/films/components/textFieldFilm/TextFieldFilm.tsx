import { ChangeEvent, useCallback, VFC } from 'react';
import { TextField } from '@mui/material';
import './TextFieldFilm.css';
import { setSearchStringChange } from '../../../../store/films/slice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectSearchString } from '../../../../store/films/selectors';

export const TextFieldFilm: VFC = () => {
  const dispatch = useAppDispatch();
  const searchString = useAppSelector(selectSearchString);

  /**
   * Change text field state.
   * @param event Event.
   */
  const inputChangesHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
      dispatch(setSearchStringChange(event.target.value));
    },
    [dispatch],
  );

  return (
    <TextField
      className="text-field-films"
      id="standard-basic"
      variant="standard"
      value={searchString}
      onChange={inputChangesHandler}
    />
  );
};

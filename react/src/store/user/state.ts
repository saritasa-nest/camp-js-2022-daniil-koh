import { DefaultInitialState } from '../../models/defaultState';
/**
 * User state.
 */
export interface UserState extends DefaultInitialState{
  /** Authorization user state. */
  readonly isAuthorized: boolean;
}

export const initialState: UserState = {
  loading: false,
  isAuthorized: false,
};

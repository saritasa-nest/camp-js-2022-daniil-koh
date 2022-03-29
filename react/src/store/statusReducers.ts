import { CaseReducer } from '@reduxjs/toolkit';
import { DefaultInitialState } from '../models/defaultState';

/**
 * Object of default status reducers.
 */
interface CaseReducers<T> {
  /** Case reducer for pending status. */
  pendingReducer: CaseReducer<T>;
  /** Case reducer for rejected status. */
  rejectedReducer: CaseReducer<T>;
}

/**
 * Get default reducers.
 */
export function getCasesReducers<T extends DefaultInitialState>(): CaseReducers<T> {
  return {
    pendingReducer: state => {
      state.loading = true;
    },
    rejectedReducer: (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.loading = false;
    },
  };
}

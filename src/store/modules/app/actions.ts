import { createAction } from 'redux-actions';

// Action types
export const SEARCH_START = 'app/SEARCH_START';
export const SEARCH_DONE = 'app/SEARCH_DONE';
export const PUSH_RESULTS = 'app/PUSH_RESULTS';

// Action creators
export const searchStart = createAction(SEARCH_START);
export const searchDone = createAction(SEARCH_DONE);
export const pushResults = createAction(PUSH_RESULTS);

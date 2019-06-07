import { createAction } from 'redux-actions';

export const ADD_VISITED_LINE = 'line/ADD_VISITED_LINE';
export const CLEAR_VISITED_LINES = 'line/CLEAR_VISITED_LINES';

export const addVisitedLine = createAction(ADD_VISITED_LINE);
export const clearVisitedLines = createAction(CLEAR_VISITED_LINES);

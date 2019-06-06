import { Route, Result } from '../types';
// import { StationState } from './reducers/stations';
// import { LineState } from './reducers/line';

export interface SearchStartPayload {
  origin: string;
  destination: string;
}
export const SEARCH_START = 'app/SEARCH_START';

export const SEARCH_DONE = 'app/SEARCH_DONE';

export const CLEAR_ROUTES = 'route/CLEAR_ROUTES';

export interface PushRoutePayload {
  route: Route;
}
export const PUSH_ROUTE = 'route/PUSH_ROUTE';

export const PUSH_ROUTE_ID = 'route/PUSH_ROUTE_ID';

export interface PushResultsPayload {
  results: Result[];
}
export const PUSH_RESULTS = 'app/PUSH_RESULTS';

export const ADD_VISITED_LINE = 'line/ADD_VISITED_LINE';
export const CLEAR_VISITED_LINES = 'line/CLEAR_VISITED_LINES';

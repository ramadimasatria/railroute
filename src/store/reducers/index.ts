import { combineReducers } from 'redux';
import appReducer, { AppState } from './app';
import stationReducer, { StationState } from './stations';
import lineReducer, { LineState } from './line';
import routeReducer, { RouteState } from './route';

export interface RootState {
  app: AppState;
  station: StationState;
  line: LineState;
  route: RouteState;
}

export default combineReducers({
  app: appReducer,
  station: stationReducer,
  line: lineReducer,
  route: routeReducer
});

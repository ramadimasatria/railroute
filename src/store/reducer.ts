import { combineReducers } from 'redux';

import appReducer from './modules/app';
import { AppState } from './modules/app/types';

import stationReducer from './modules/station';
import { StationState } from './modules/station/types';

import lineReducer from './modules/line';
import { LineState } from './modules/line/types';

import routeReducer from './modules/route';
import { RouteState } from './modules/route/types';

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

import { Reducer, AnyAction } from 'redux';
import { Route, routeId } from '../../types';
import { CLEAR_ROUTES, PUSH_ROUTE, PUSH_ROUTE_ID, PushRoutePayload } from '../actionTypes';

export interface RouteState {
  allRoutes: {
    [routeId: string]: Route;
  };
  lastRouteIds: routeId[];
}

interface ReduceFn {
  [actionType: string]: (state: RouteState, payload?: any) => RouteState;
}

const reduceFn: ReduceFn = {
  [CLEAR_ROUTES]: () => ({ allRoutes: {}, lastRouteIds: [] }),
  [PUSH_ROUTE]: (state, payload: PushRoutePayload) => ({
    ...state,
    allRoutes: {
      ...state.allRoutes,
      [payload.route.id]: payload.route
    }
  }),
  [PUSH_ROUTE_ID]: (state, payload: string) => ({
    ...state,
    lastRouteIds: [...state.lastRouteIds, payload]
  })
};

const initialState: RouteState = {
  allRoutes: {},
  lastRouteIds: []
};

const lineReducer: Reducer = (state: RouteState = initialState, action: AnyAction) => {
  if (reduceFn[action.type]) {
    return reduceFn[action.type](state, action.payload);
  }

  return state;
};

export default lineReducer;

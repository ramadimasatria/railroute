import { CLEAR_ROUTES, PUSH_ROUTE, PUSH_ROUTE_ID } from './actions';
import { RouteState, PushRoutePayload } from './types';

export interface ReduceFn {
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

export default reduceFn;

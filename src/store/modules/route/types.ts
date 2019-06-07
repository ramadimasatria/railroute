import { Route, routeId } from '../../../types';

export interface RouteState {
  allRoutes: {
    [routeId: string]: Route;
  };
  lastRouteIds: routeId[];
}

export interface PushRoutePayload {
  route: Route;
}

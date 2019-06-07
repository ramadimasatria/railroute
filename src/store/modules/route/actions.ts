import { createAction } from 'redux-actions';

export const CLEAR_ROUTES = 'route/CLEAR_ROUTES';
export const PUSH_ROUTE = 'route/PUSH_ROUTE';
export const PUSH_ROUTE_ID = 'route/PUSH_ROUTE_ID';

export const clearRoutes = createAction(CLEAR_ROUTES);
export const pushRoute = createAction(PUSH_ROUTE);
export const pushRouteId = createAction(PUSH_ROUTE_ID);

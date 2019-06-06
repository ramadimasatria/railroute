import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import { RootState } from './reducers';
import {
  SEARCH_START,
  SEARCH_DONE,
  CLEAR_ROUTES,
  PUSH_ROUTE,
  PUSH_ROUTE_ID,
  PUSH_RESULTS,
  ADD_VISITED_LINE,
  CLEAR_VISITED_LINES
} from './actionTypes';
import { getStationById, getItenaryPairs, getNextTransits, getStationDistance } from './selectors';
import { Station, Itenary, Route, Result, stationId } from '../types';

export const searchStart = createAction(SEARCH_START);
export const searchDone = createAction(SEARCH_DONE);
export const clearRoutes = createAction(CLEAR_ROUTES);
export const pushRoute = createAction(PUSH_ROUTE);
export const pushRouteId = createAction(PUSH_ROUTE_ID);
export const pushResults = createAction(PUSH_RESULTS);
export const clearVisitedLines = createAction(CLEAR_VISITED_LINES);
export const addVisitedLine = createAction(ADD_VISITED_LINE);

export const submitSearch = (origin: string, destination: string) => {
  return (dispatch: any) => {
    dispatch(searchStart({ origin, destination }));
    setTimeout(() => {
      dispatch(findRoutes());
      dispatch(compileResults());
      dispatch(searchDone());
    }, 0);
  };
};

const findRoutes = () => {
  return (dispatch: any, getState: any) => {
    const state: RootState = getState();

    dispatch(clearRoutes());
    dispatch(clearVisitedLines());

    const itenaries = getItenaryPairs(state);
    itenaries.forEach((itenary, idx) => {
      dispatch(findNextRoute(itenary, String(idx)));
    });
  };
};

const findNextRoute = (itenary: Itenary, routeId: string, depth = 1) => {
  return (dispatch: any, getState: any) => {
    const state: RootState = getState();
    const MAX_DEPTH = 3;
    const { from, to } = itenary;

    console.log('depth', depth);
    if (depth > MAX_DEPTH) {
      return;
    }
    console.log('depth', depth);

    // check if on the same line
    if (from.line === to.line) {
      dispatch(createAndPushRoute(from, to, routeId + '0', true));
      return;
    }

    // if on different line then find next transits
    const transits = getNextTransits(state, from.line, to.line);
    transits.forEach((transit, tId) => {
      const transitRouteId = routeId + tId;
      dispatch(createAndPushRoute(from, transit.station, transitRouteId));

      transit.nextLines.forEach((nextStationId, idx) => {
        const nextStation = getStationById(state, nextStationId);

        // add next line to visited line so we won't get in endless transits
        dispatch(addVisitedLine(nextStation.line));

        dispatch(createAndPushRoute(transit.station, nextStation, transitRouteId + idx));

        const nextItenary: Itenary = {
          from: nextStation,
          to
        };
        dispatch(findNextRoute(nextItenary, transitRouteId + idx, depth + 1));
      });
    });
  };
};

const createAndPushRoute = (from: Station | stationId, to: Station | stationId, id: string, isLastRoute = false) => {
  return (dispatch: any, getState: any) => {
    const state: RootState = getState();

    const fromStation = typeof from === 'number' ? getStationById(state, from) : from;
    const toStation = typeof to === 'number' ? getStationById(state, to) : to;
    const changeLine = fromStation.line !== toStation.line;

    const route: Route = {
      id,
      from: fromStation,
      to: toStation,
      changeLine,
      distance: getStationDistance(state, fromStation, toStation)
    };

    dispatch(pushRoute({ route }));
    if (isLastRoute) {
      dispatch(pushRouteId(id));
    }
  };
};

const compileResults = () => {
  return (dispatch: any, getState: any) => {
    const state: RootState = getState();

    const lastRouteIds = state.route.lastRouteIds;

    const results: Result[] = lastRouteIds.map(
      (lastRouteId): Result => {
        // parse route ids
        let routeIds = [];
        for (let idx = 1; idx <= lastRouteId.length; idx++) {
          routeIds.push(lastRouteId.substring(0, idx));
        }

        // remove missing routes
        const routes: Route[] = routeIds.map(id => state.route.allRoutes[id]).filter(route => !!route);

        // calculate score
        let numberOfStations = 0;
        let numberOfTransits = 0;
        routes.forEach(route => {
          numberOfStations += route.distance;
          numberOfTransits += route.changeLine ? 1 : 0;
        });

        return {
          numberOfStations,
          numberOfTransits,
          routes
        };
      }
    );

    dispatch(pushResults({ results }));
  };
};

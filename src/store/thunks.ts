import { RootState } from './reducer';

import { searchStart, searchDone, pushResults } from './modules/app/actions';
import { clearVisitedLines, addVisitedLine } from './modules/line/actions';
import { clearRoutes, pushRoute, pushRouteId } from './modules/route/actions';

import { getStationById, getStationsByName, getItenaryPairs } from './modules/station/selectors';
import { getNextTransits, getStationDistance } from './modules/line/selectors';

import { Station, Itenary, Route, Result, stationId } from '../types';

export const submitSearch = (origin: string, destination: string) => {
  return (dispatch: any) => {
    dispatch(searchStart({ origin, destination }));

    // Wrap in setTimeout to make it async
    setTimeout(() => {
      dispatch(findRoutes());
      dispatch(compileResults());
      dispatch(searchDone());
      dispatch(cleanup());
    }, 0);
  };
};

const findRoutes = () => {
  return (dispatch: any, getState: any) => {
    const state: RootState = getState();

    const origins = getStationsByName(state.station, state.app.origin);
    const destinations = getStationsByName(state.station, state.app.destination);

    const itenaries = getItenaryPairs(origins, destinations);
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

    if (depth > MAX_DEPTH) {
      return;
    }

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
        const nextStation = getStationById(state.station, nextStationId);

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

// Create route object and push to list of routes
// also push the id to lastRouteIds if it's the last route
const createAndPushRoute = (from: Station | stationId, to: Station | stationId, id: string, isLastRoute = false) => {
  return (dispatch: any, getState: any) => {
    const state: RootState = getState();

    const fromStation = typeof from === 'number' ? getStationById(state.station, from) : from;
    const toStation = typeof to === 'number' ? getStationById(state.station, to) : to;
    const changeLine = fromStation.line !== toStation.line;

    const route: Route = {
      id,
      from: fromStation,
      to: toStation,
      changeLine,
      distance: getStationDistance(state.line, fromStation, toStation)
    };

    dispatch(pushRoute({ route }));
    if (isLastRoute) {
      dispatch(pushRouteId(id));
    }
  };
};

// Compile list of results based on lastRouteId and calculate the total distance
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

// Cleanup any temporary data
const cleanup = () => {
  return (dispatch: any) => {
    dispatch(clearRoutes());
    dispatch(clearVisitedLines());
  };
};

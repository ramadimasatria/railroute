import reduceFn from './reducer';
import { CLEAR_ROUTES, PUSH_ROUTE, PUSH_ROUTE_ID } from './actions';
import { RouteState, PushRoutePayload } from './types';

describe('modules/route/reducer', function() {
  const initialState: RouteState = {
    allRoutes: {},
    lastRouteIds: []
  };
  let afterState: RouteState;

  describe('CLEAR_ROUTES', function() {
    beforeEach(function() {
      afterState = reduceFn[CLEAR_ROUTES](initialState);
    });

    it('should clear allRoutes and lastRouteIds', function() {
      expect(afterState.allRoutes).toEqual({});
      expect(afterState.lastRouteIds).toEqual([]);
    });
  });

  describe('PUSH_ROUTE', function() {
    it('should add route to allRoutes', function() {
      const payload: PushRoutePayload = {
        route: {
          id: '000',
          from: { id: 0, name: 'St1', line: 'AA', number: 1 },
          to: { id: 1, name: 'St2', line: 'AA', number: 2 },
          distance: 1
        }
      };
      afterState = reduceFn[PUSH_ROUTE](initialState, payload);

      expect(afterState.allRoutes).toHaveProperty('000');
      expect(afterState.allRoutes['000']).toEqual(payload.route);
    });
  });

  describe('PUSH_ROUTE_ID', function() {
    it('should add id to lastRouteIds', function() {
      afterState = reduceFn[PUSH_ROUTE_ID](initialState, '000');
      expect(afterState.lastRouteIds.includes('000')).toBe(true);
    });
  });
});

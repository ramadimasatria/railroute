import reduceFn from './reducer';
import { SEARCH_START, SEARCH_DONE, PUSH_RESULTS } from './actions';
import { AppState } from './types';

describe('modules/app/reducer', function() {
  const initialState: AppState = {
    isLoading: false,
    results: []
  };
  let afterState: AppState;

  describe('SEARCH_START', function() {
    beforeEach(function() {
      const payload = { origin: 'origin', destination: 'destination' };
      afterState = reduceFn[SEARCH_START](initialState, payload);
    });

    it('should set isLoading to true', function() {
      expect(afterState.isLoading).toBe(true);
    });

    it('should set origin & destination', function() {
      expect(afterState.origin).toBe('origin');
      expect(afterState.destination).toBe('destination');
    });
  });

  describe('SEARCH_DONE', function() {
    beforeEach(function() {
      afterState = reduceFn[SEARCH_DONE](initialState);
    });

    it('should set isLoading to false', function() {
      expect(afterState.isLoading).toBe(false);
    });
  });

  describe('PUSH_RESULTS', function() {
    beforeEach(function() {
      const payload = {
        results: ['result 1', 'result 2']
      };
      afterState = reduceFn[PUSH_RESULTS](initialState, payload);
    });

    it('should set results state', function() {
      expect(afterState.results).toHaveLength(2);
    });
  });
});

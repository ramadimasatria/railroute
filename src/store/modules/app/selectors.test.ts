import { getSortedResults } from './selectors';
import { AppState } from './types';
import { Result } from '../../../types';

describe('modules/app/selector', function() {
  const state: AppState = {
    isLoading: false,
    results: [
      {
        // this one should be last because it has transits
        numberOfStations: 5,
        numberOfTransits: 2,
        routes: []
      },
      {
        numberOfStations: 5,
        numberOfTransits: 0,
        routes: []
      },
      {
        // this one should be first, least number of stations & transits
        numberOfStations: 2,
        numberOfTransits: 0,
        routes: []
      }
    ]
  };
  let returned: Result[];

  describe('getSortedResults', function() {
    beforeEach(function() {
      returned = getSortedResults(state);
    });

    it('should order results correctly', function() {
      expect(returned[0].numberOfStations).toBe(2);
      expect(returned[1].numberOfStations).toBe(5);
      expect(returned[2].numberOfTransits).toBe(2);
    });
  });
});

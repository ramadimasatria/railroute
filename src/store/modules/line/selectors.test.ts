import { getTransitsInLine, getStationDistance } from './selectors';
import { LineState } from './types';

describe('modules/line/selectors', function() {
  const state: LineState = {
    lineNames: ['AA', 'BB', 'CC'],
    stationsByLine: {
      AA: [1, 2, 3],
      BB: [4, 5, 6],
      CC: [7, 8, 9]
    },
    transitsInLine: {
      AA: [{ station: 1, nextLines: [5, 9] }],
      BB: [{ station: 5, nextLines: [1, 9] }],
      CC: [{ station: 9, nextLines: [1, 5] }]
    },
    visitedLines: []
  };
  let returned;

  describe('getTransitsInLine', function() {
    it('should get transits in a line', function() {
      returned = getTransitsInLine(state, 'AA');
      expect(returned).toEqual(state.transitsInLine.AA);
    });
  });

  describe('getStationDistance', function() {
    it('should return the distance between 2 stations', function() {
      const stationA = { id: 1, name: 'Station A', line: 'AA', number: '1' };
      const stationB = { id: 3, name: 'Station B', line: 'AA', number: '3' };

      returned = getStationDistance(state, stationA, stationB);
      expect(returned).toBe(2);

      const stationC = { id: 6, name: 'Station C', line: 'BB', number: '6' };
      const stationD = { id: 5, name: 'Station D', line: 'BB', number: '5' };

      returned = getStationDistance(state, stationC, stationD);
      expect(returned).toBe(1);
    });

    it('should return 0 if the stations are on different line', function() {
      const stationA = { id: 1, name: 'Station A', line: 'AA', number: '1' };
      const stationB = { id: 5, name: 'Station B', line: 'BB', number: '5' };

      returned = getStationDistance(state, stationA, stationB);
      expect(returned).toBe(0);
    });
  });
});

import { getStationById, getStationsByIds, getStationsByName } from './selectors';
import { StationState } from './types';

describe('modules/station/selectors', function() {
  const state: StationState = {
    allStations: [
      {
        id: 0,
        name: 'Station 0',
        line: 'AA',
        number: 1
      },
      {
        id: 1,
        name: 'Station 1',
        line: 'BB',
        number: 2
      },
      {
        id: 2,
        name: 'Station 1',
        line: 'CC',
        number: 3
      }
    ],
    stationNames: ['Station 0', 'Station 1'],
    stationsByName: {
      'Station 0': [0],
      'Station 1': [1, 2]
    }
  };
  let returned;

  describe('getStationById', function() {
    it('should return station object', function() {
      const id = 1;
      returned = getStationById(state, id);
      expect(returned.id).toBe(id);
    });
  });

  describe('getStationsByName', function() {
    it('should return station list', function() {
      const name = 'Station 1';
      returned = getStationsByName(state, name);

      expect(returned).toHaveLength(2);
      returned.forEach(st => {
        expect(st.name).toBe(name);
      });
    });
  });

  describe('getStationsByIds', function() {
    it('should return station list', function() {
      const ids = [0, 2];
      returned = getStationsByIds(state, ids);

      expect(returned).toHaveLength(2);
      returned.forEach((st, idx) => {
        expect(st.id).toBe(ids[idx]);
      });
    });
  });
});

import { RawStations, Station, StationGroup, Transit, TransitGroup } from '../types';
import { RootState } from './reducer';

const normalizeStations = (rawStations: RawStations): Station[] => {
  const stations: Station[] = [];

  for (let name in rawStations) {
    const transit = Object.keys(rawStations[name]).length > 1;

    for (let line in rawStations[name]) {
      const stNumber = rawStations[name][line];
      const numberArr = typeof stNumber === 'object' ? stNumber : [stNumber];

      numberArr.forEach(n => {
        stations.push({
          id: stations.length,
          name,
          line,
          number: n,
          transit
        });
      });
    }
  }

  return stations;
};

const groupStationsBy = (key: string, stations: Station[]): StationGroup => {
  const grouped: StationGroup = stations.reduce((obj: StationGroup, station) => {
    // @ts-ignore
    const groupKey = station[key];

    if (obj[groupKey]) {
      obj[groupKey].push(station.id);
    } else {
      obj[groupKey] = [station.id];
    }

    return obj;
  }, {});

  return grouped;
};

const sortStations = (stationIds: number[], allStations: Station[]): number[] => {
  const stations = stationIds.map(id => allStations[id]);
  stations.sort((a, b) => a.number - b.number);
  return stations.map(st => st.id);
};

const filterTransits = (stationIds: number[], allStations: Station[]): Station[] => {
  const transits = stationIds.map(id => allStations[id]).filter(st => st.transit);
  return transits;
};

export default (rawStations: RawStations): RootState => {
  const allStations = normalizeStations(rawStations);
  const stationNames = Object.keys(rawStations);
  const stationsByName = groupStationsBy('name', allStations);

  const lineNames = [];
  const transitsInLine: TransitGroup = {};
  const stationsByLine = groupStationsBy('line', allStations);

  for (let lineName in stationsByLine) {
    lineNames.push(lineName);
    stationsByLine[lineName] = sortStations(stationsByLine[lineName], allStations);

    // find transit stations and conver to transit objects
    const transits = filterTransits(stationsByLine[lineName], allStations);
    transitsInLine[lineName] = transits.map(
      (station): Transit => {
        // find all stations with same name but different line
        return {
          station: station.id,
          nextLines: allStations
            .filter((s: Station) => s.name === station.name && s.line !== station.line)
            .map(s => s.id)
        };
      }
    );
  }

  return {
    app: {
      isLoading: false,
      results: []
    },
    station: {
      allStations,
      stationNames,
      stationsByName
    },
    line: {
      lineNames,
      stationsByLine,
      transitsInLine,
      visitedLines: []
    },
    route: {
      allRoutes: {},
      lastRouteIds: []
    }
  };
};

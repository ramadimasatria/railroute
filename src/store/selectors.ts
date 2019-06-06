import { RootState } from './reducers';
import { permutate } from '../helpers';
import { Station, Itenary, Transit, Result, stationId } from '../types';

export const getStationById = (state: RootState, id: stationId): Station => state.station.allStations[id];
export const getStationsByName = (state: RootState, name?: string): Station[] =>
  state.station.allStations.filter(s => s.name === name);
export const getStationsByIds = (state: RootState, ids: stationId[]): Station[] =>
  ids.map(id => state.station.allStations[id]);

export const getOrigin = (state: RootState) => state.app.origin;
export const getDestination = (state: RootState) => state.app.destination;

export const getOriginStations = (state: RootState) => getStationsByName(state, getOrigin(state));
export const getDestinationStations = (state: RootState) => getStationsByName(state, getDestination(state));

export const getItenaryPairs = (state: RootState): Itenary[] => {
  const origins = getOriginStations(state);
  const destinations = getDestinationStations(state);

  const allItenaries: Itenary[] = permutate(origins, destinations).map(([from, to]) => ({ from, to }));

  // Check for matching lines
  const matchingLine: Itenary | undefined = allItenaries.find(itenary => {
    return itenary.from.line === itenary.to.line;
  });
  if (matchingLine) {
    return [matchingLine];
  }

  return allItenaries;
};

export const getTransitsInLine = (state: RootState, line: string): Transit[] => state.line.transitsInLine[line];

export const getNextTransits = (state: RootState, fromLine: string, toLine: string): Transit[] => {
  const allTransits = getTransitsInLine(state, fromLine);
  const visitedLines = state.line.visitedLines;

  console.log(visitedLines);

  // find direct transits
  const directTransits: Transit[] = allTransits
    .map(transit => {
      const matchedLine = transit.nextLines.filter(id => {
        const station = getStationById(state, id);
        return station.line === toLine;
      });

      return {
        ...transit,
        nextLines: matchedLine
      };
    })
    .filter(t => t.nextLines.length > 0);

  if (directTransits.length) {
    return directTransits;
  }

  // filter visited lines
  const filtered = allTransits
    .map(transit => {
      const matchedLine = transit.nextLines.filter(id => {
        const station = getStationById(state, id);
        return !visitedLines.includes(station.line);
      });

      return {
        ...transit,
        nextLines: matchedLine
      };
    })
    .filter(t => t.nextLines.length > 0);

  return filtered;
};

export const getStationDistance = (state: RootState, from: Station, to: Station): number => {
  if (from.line !== to.line) {
    return 0;
  }

  const stationsInLine = state.line.stationsByLine[from.line];
  const fromPos = stationsInLine.findIndex(id => id === from.id);
  const toPos = stationsInLine.findIndex(id => id === to.id);

  return Math.abs(fromPos - toPos);
};

export const getSortedResults = (state: RootState): Result[] => {
  const results = state.app.results;

  return results.slice().sort((a, b) => {
    const TRANSIT_WEIGHT = 5;
    const scoreA = a.numberOfStations + a.numberOfTransits * TRANSIT_WEIGHT;
    const scoreB = b.numberOfStations + b.numberOfTransits * TRANSIT_WEIGHT;

    return scoreA - scoreB;
  });
};

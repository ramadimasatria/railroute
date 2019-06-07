import { StationState } from './types';
import { permutate } from '../../../helpers';
import { Station, Itenary, stationId } from '../../../types';

export const getStationById = (state: StationState, id: stationId): Station => state.allStations[id];

export const getStationsByName = (state: StationState, name?: string): Station[] =>
  state.allStations.filter(s => s.name === name);

export const getStationsByIds = (state: StationState, ids: stationId[]): Station[] =>
  ids.map(id => state.allStations[id]);

export const getItenaryPairs = (origins: Station[], destinations: Station[]): Itenary[] => {
  // @ts-ignore
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

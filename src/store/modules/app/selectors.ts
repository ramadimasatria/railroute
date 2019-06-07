import { AppState } from './types';
import { Result } from '../../../types';

export const getOrigin = (state: AppState) => state.origin;
export const getDestination = (state: AppState) => state.destination;

export const getSortedResults = (state: AppState): Result[] => {
  const results = state.results;

  return results.slice().sort((a: Result, b: Result) => {
    const TRANSIT_WEIGHT = 5;
    const scoreA = a.numberOfStations + a.numberOfTransits * TRANSIT_WEIGHT;
    const scoreB = b.numberOfStations + b.numberOfTransits * TRANSIT_WEIGHT;

    return scoreA - scoreB;
  });
};

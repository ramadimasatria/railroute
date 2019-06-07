import { Station, StationGroup } from '../../../types';

export interface StationState {
  allStations: Station[];
  stationNames: string[];
  stationsByName: StationGroup;
}

import { StationGroup, TransitGroup } from '../../../types';

export interface LineState {
  lineNames: string[];
  stationsByLine: StationGroup;
  transitsInLine: TransitGroup;
  visitedLines: string[];
}

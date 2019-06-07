import { LineState } from './types';
import { RootState } from '../../reducer';
import { Station, Transit, stationId } from '../../../types';
import { getStationById } from '../station/selectors';

export const getTransitsInLine = (state: LineState, line: string): Transit[] => state.transitsInLine[line];

export const getNextTransits = (state: RootState, fromLine: string, toLine: string): Transit[] => {
  const allTransits: Transit[] = getTransitsInLine(state.line, fromLine);
  const visitedLines = state.line.visitedLines;

  // find direct transits
  const directTransits: Transit[] = allTransits
    .map(transit => {
      const matchedLine = transit.nextLines.filter((id: stationId) => {
        const station = getStationById(state.station, id);
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
      const matchedLine = transit.nextLines.filter((id: stationId) => {
        const station = getStationById(state.station, id);
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

export const getStationDistance = (state: LineState, from: Station, to: Station): number => {
  if (from.line !== to.line) {
    return 0;
  }

  const stationsInLine = state.stationsByLine[from.line];
  const fromPos = stationsInLine.findIndex(id => id === from.id);
  const toPos = stationsInLine.findIndex(id => id === to.id);

  return Math.abs(fromPos - toPos);
};

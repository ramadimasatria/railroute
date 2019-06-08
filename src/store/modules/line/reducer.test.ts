import reduceFn from './reducer';
import { ADD_VISITED_LINE, CLEAR_VISITED_LINES } from './actions';
import { LineState } from './types';

describe('modules/line/reducer', function() {
  const initialState: LineState = {
    lineNames: [],
    stationsByLine: {},
    transitsInLine: {},
    visitedLines: ['AA', 'BB']
  };
  let afterState: LineState;

  describe('ADD_VISITED_LINE', function() {
    it('should add line to the list', function() {
      const payload = 'CC';
      afterState = reduceFn[ADD_VISITED_LINE](initialState, payload);

      expect(afterState.visitedLines).toHaveLength(3);
      expect(afterState.visitedLines.includes('CC')).toBe(true);
    });

    it('should not add duplicate line', function() {
      const payload = 'AA';
      afterState = reduceFn[ADD_VISITED_LINE](initialState, payload);

      expect(afterState.visitedLines).toHaveLength(2);
    });
  });

  describe('CLEAR_VISITED_LINES', function() {
    it('should clear visitedLines state', function() {
      afterState = reduceFn[CLEAR_VISITED_LINES](initialState);

      expect(afterState.visitedLines).toHaveLength(0);
    });
  });
});

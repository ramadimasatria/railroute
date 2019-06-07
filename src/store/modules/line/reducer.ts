import { ADD_VISITED_LINE, CLEAR_VISITED_LINES } from './actions';
import { LineState } from './types';

interface ReduceFn {
  [actionType: string]: (state: LineState, payload?: any) => LineState;
}

const reduceFn: ReduceFn = {
  [ADD_VISITED_LINE]: (state, payload) => ({
    ...state,
    visitedLines: state.visitedLines.includes(payload) ? state.visitedLines : [...state.visitedLines, payload]
  }),
  [CLEAR_VISITED_LINES]: state => ({
    ...state,
    visitedLines: []
  })
};

export default reduceFn;

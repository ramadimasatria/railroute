import { Reducer, AnyAction } from 'redux';
import { ADD_VISITED_LINE, CLEAR_VISITED_LINES } from '../actionTypes';
import { StationGroup, Transit, TransitGroup } from '../../types';

export interface LineState {
  lineNames: string[];
  stationsByLine: StationGroup;
  transitsInLine: TransitGroup;
  visitedLines: string[];
}

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

const initialState: LineState = {
  lineNames: [],
  stationsByLine: {},
  transitsInLine: {},
  visitedLines: []
};

const lineReducer: Reducer = (state: LineState = initialState, action: AnyAction) => {
  if (reduceFn[action.type]) {
    return reduceFn[action.type](state, action.payload);
  }

  return state;
};

export default lineReducer;

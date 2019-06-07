import { Reducer, AnyAction } from 'redux';
import reduceFn from './reducer';
import { LineState } from './types';

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

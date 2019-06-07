import { Reducer, AnyAction } from 'redux';
import reduceFn from './reducer';
import { StationState } from './types';

const initialState: StationState = {
  allStations: [],
  stationNames: [],
  stationsByName: {}
};

const stationReducer: Reducer = (state: StationState = initialState, action: AnyAction) => {
  if (reduceFn[action.type]) {
    return reduceFn[action.type](state, action.payload);
  }

  return state;
};

export default stationReducer;

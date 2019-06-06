import { Reducer, AnyAction } from 'redux';
import { Station, StationGroup } from '../../types';

export interface StationState {
  allStations: Station[];
  stationNames: string[];
  stationsByName: StationGroup;
}

interface ReduceFn {
  [actionType: string]: (state: StationState, payload?: any) => StationState;
}

const reduceFn: ReduceFn = {};

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

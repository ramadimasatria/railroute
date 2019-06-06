import { Reducer, AnyAction } from 'redux';
import { SEARCH_START, SEARCH_DONE, PUSH_RESULTS, SearchStartPayload, PushResultsPayload } from '../actionTypes';
import { Result } from '../../types';

export interface AppState {
  isLoading: boolean;
  origin?: string;
  destination?: string;
  results: Result[];
}

interface ReduceFn {
  [actionType: string]: (state: AppState, payload?: any) => AppState;
}

const initialState: AppState = {
  isLoading: false,
  results: []
};

const reduceFn: ReduceFn = {
  [SEARCH_START]: (state, payload: SearchStartPayload) => {
    return {
      ...state,
      isLoading: true,
      origin: payload.origin,
      destination: payload.destination
    };
  },

  [SEARCH_DONE]: state => {
    return {
      ...state,
      isLoading: false
    };
  },

  [PUSH_RESULTS]: (state, payload: PushResultsPayload) => ({
    ...state,
    results: payload.results
  })
};

const appReducer: Reducer = (state: AppState = initialState, action: AnyAction): AppState => {
  if (reduceFn[action.type]) {
    return reduceFn[action.type](state, action.payload);
  }

  return state;
};

export default appReducer;

import { SEARCH_START, SEARCH_DONE, PUSH_RESULTS } from './actions';
import { AppState, SearchStartPayload, PushResultsPayload } from './types';

interface ReduceFn {
  [actionType: string]: (state: AppState, payload?: any) => AppState;
}

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

export default reduceFn;

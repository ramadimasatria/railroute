import { Reducer, AnyAction } from 'redux';
import { AppState } from './types';
import reduceFn from './reducer';

const initialState: AppState = {
  isLoading: false,
  results: []
};

const appReducer: Reducer = (state: AppState = initialState, action: AnyAction): AppState => {
  if (reduceFn[action.type]) {
    return reduceFn[action.type](state, action.payload);
  }

  return state;
};

export default appReducer;

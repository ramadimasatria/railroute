import { Reducer, AnyAction } from 'redux';
import reduceFn from './reducer';
import { RouteState } from './types';

const initialState: RouteState = {
  allRoutes: {},
  lastRouteIds: []
};

const lineReducer: Reducer = (state: RouteState = initialState, action: AnyAction) => {
  if (reduceFn[action.type]) {
    return reduceFn[action.type](state, action.payload);
  }

  return state;
};

export default lineReducer;

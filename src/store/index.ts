import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import buildInitialState from './buildInitialState';
import stations from '../stations.json';

const initialState = buildInitialState(stations);

export default createStore(
  reducer,
  // @ts-ignore
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

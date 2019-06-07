import { StationState } from './types';

interface ReduceFn {
  [actionType: string]: (state: StationState, payload?: any) => StationState;
}

const reduceFn: ReduceFn = {};

export default reduceFn;

import { Result } from '../../../types';

export interface AppState {
  isLoading: boolean;
  origin?: string;
  destination?: string;
  results: Result[];
}

export interface SearchStartPayload {
  origin: string;
  destination: string;
}
export interface PushResultsPayload {
  results: Result[];
}

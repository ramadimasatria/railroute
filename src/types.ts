export interface RawStations {
  [stationName: string]: {
    [lineName: string]: number | number[];
  };
}

export interface Station {
  name: string;
  line: string;
  number: any;
  transit: boolean;
}

export interface Transit {
  station: Station;
  nextLines: Station[];
}

export interface Itenary {
  from: Station;
  to: Station;
}

export interface Route extends Itenary {
  id: string;
  distance: number;
  changeLine?: boolean;
}

export interface Result {
  numberOfStations: number;
  numberOfTransits: number;
  routes: Route[];
}

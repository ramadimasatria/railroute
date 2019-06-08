export interface RawStations {
  [stationName: string]: {
    [lineName: string]: number | number[];
  };
}

export type stationId = number;

export interface Station {
  id: stationId;
  name: string;
  line: string;
  number: any;
  transit?: boolean;
}

export interface StationGroup {
  [group: string]: stationId[];
}

export interface Transit {
  station: stationId;
  nextLines: stationId[];
}

export interface TransitGroup {
  [line: string]: Transit[];
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

export type routeId = string;

export interface Result {
  numberOfStations: number;
  numberOfTransits: number;
  routes: Route[];
}

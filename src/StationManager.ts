import * as Types from './types';
import { permutate } from './helpers';

type StationGroup = {
  [stationName: string]: Types.Station[];
};

type TransitsObj = {
  [line: string]: Types.Transit[];
};

class StationManager {
  //
  allStations: Types.Station[];
  stationsByName: StationGroup;
  stationsByLine: StationGroup;

  //
  routes: {
    [routeId: string]: Types.Route;
  };
  routeIds: string[];

  constructor(rawStations: Types.RawStations) {
    this.allStations = this.normalizeStations(rawStations);
    this.stationsByName = this.groupStationsBy('name', this.allStations);
    this.stationsByLine = this.groupStationsBy('line', this.allStations);

    this.routes = {};
    this.routeIds = [];

    console.log('raw', rawStations);
    console.log('all stations', this.allStations);
    console.log('by name', this.stationsByName);
    console.log('by line', this.stationsByLine);
  }

  // Public methods
  public getStationNames(): string[] {
    return Object.keys(this.stationsByName);
  }

  public getStationsByName(name: string): Types.Station[] {
    return this.stationsByName[name];
  }

  public findRoutes(originName: string, destName: string): Promise<Types.Result[]> {
    // Reset routes
    this.routes = {};
    this.routeIds = [];

    return new Promise(resolve => {
      const itenaries = this.getItenaries(originName, destName);
      console.log('itenaries', itenaries);
      itenaries.forEach((itenary, idx) => {
        this.findItenaryRoutes(itenary, String(idx));
      });

      console.log('routes', this.routes);
      console.log('routeIds', this.routeIds);

      const results: Types.Result[] = this.routeIds.map(
        (routeId): Types.Result => {
          const routes = this.traverseRoutes(routeId);
          const numberOfStations = routes.reduce((num: number, r: Types.Route) => num + r.distance, 0);
          const numberOfTransits = routes.reduce((num: number, r: Types.Route) => (r.changeLine ? num + 1 : num), 0);

          return {
            numberOfStations,
            numberOfTransits,
            routes
          };
        }
      );

      console.log('results', results);
      resolve(results);
    });
  }

  // Private methods
  private normalizeStations(rawStations: Types.RawStations): Types.Station[] {
    const allStations: Types.Station[] = [];

    for (let name in rawStations) {
      const transit = Object.keys(rawStations[name]).length > 1;

      for (let line in rawStations[name]) {
        const stNumber = rawStations[name][line];
        const numberArr = typeof stNumber === 'object' ? stNumber : [stNumber];

        numberArr.forEach(n => {
          allStations.push({
            name,
            line,
            number: n,
            transit
          });
        });
      }
    }

    return allStations;
  }

  private groupStationsBy(key: string, stations: Types.Station[]): StationGroup {
    const grouped: any = stations.reduce((obj: any, station) => {
      // @ts-ignore
      const groupKey: any = station[key];

      if (obj[groupKey]) {
        obj[groupKey].push(station);
      } else {
        obj[groupKey] = [station];
      }

      return obj;
    }, {});

    return grouped;
  }

  private getItenaries(originName: string, destName: string): Types.Itenary[] {
    const origins = this.getStationsByName(originName);
    const destinations = this.getStationsByName(destName);

    // Generate all itenaries
    const allItenaries: Types.Itenary[] = permutate(origins, destinations).map(([from, to]) => ({ from, to }));

    // Check for matching lines
    const matchingLine: Types.Itenary | undefined = allItenaries.find(itenary => {
      return itenary.from.line === itenary.to.line;
    });
    if (matchingLine) {
      return [matchingLine];
    }

    return allItenaries;
  }

  private pushRoute(route: Types.Route): void {
    this.routes[route.id] = route;
  }

  private pushRouteId(routeId: string): void {
    this.routeIds.push(routeId);
  }

  private findItenaryRoutes(itenary: Types.Itenary, currentId: string, depth = 1): void {
    const { from, to } = itenary;
    const MAX_DEPTH = 3;

    if (depth > MAX_DEPTH) {
      return;
    }

    // Same line
    if (from.line === to.line) {
      const routeId = currentId + '0';
      const route: Types.Route = {
        id: routeId,
        from,
        to,
        distance: this.getDistance(from, to)
      };

      this.pushRoute(route);
      this.pushRouteId(routeId);

      return;
    }

    // Different line, find transits
    const transits: Types.Transit[] = this.getTransits(from.line, to.line);
    transits.forEach((transit, idx) => {
      const transitRouteId = currentId + String(idx);
      const route: Types.Route = {
        id: transitRouteId,
        from,
        to: transit.station,
        distance: this.getDistance(from, transit.station)
      };
      this.pushRoute(route);

      transit.nextLines.forEach((station, idx) => {
        const nextRouteId = transitRouteId + String(idx);
        const route: Types.Route = {
          id: nextRouteId,
          from: transit.station,
          to: station,
          distance: this.getDistance(transit.station, station),
          changeLine: true
        };
        this.pushRoute(route);

        // get routes for next itenary
        const nextItenary: Types.Itenary = { from: station, to };
        this.findItenaryRoutes(nextItenary, nextRouteId, depth + 1);
      });
    });
  }

  private getTransits(fromLine: string, toLine: string, ignoredLines = []): Types.Transit[] {
    const transitsInLine = this.stationsByLine[fromLine].filter(s => s.transit);
    const transits: Types.Transit[] = transitsInLine
      .map(
        (s): Types.Transit => {
          return {
            station: s,
            nextLines: this.getStationsByName(s.name)
          };
        }
      )
      .map(transit => {
        transit.nextLines = transit.nextLines.filter(s => ![fromLine, ...ignoredLines].includes(s.line));
        return transit;
      });
    console.log('transitsInLine', transits);

    const directTransits = transits
      .filter(t => {
        return t.nextLines.find(station => station.line === toLine);
      })
      .map(t => {
        t.nextLines = t.nextLines.filter(s => {
          return s.line === toLine;
        });
        return t;
      });
    console.log('directTransits', directTransits);

    if (directTransits.length) {
      return directTransits;
    }
    return transits;
  }

  private traverseRoutes(lastRouteId: string): Types.Route[] {
    const routeIds = [];
    for (let idx = 1; idx <= lastRouteId.length; idx++) {
      routeIds.push(lastRouteId.substring(0, idx));
    }

    console.log('traversedIds', routeIds);

    return routeIds.map(routeId => this.routes[routeId]).filter(route => !!route);
  }

  private getDistance(from: Types.Station, to: Types.Station): number {
    if (from.line !== to.line) {
      return 0;
    }

    return Math.abs(this.getStationPositionInLine(from) - this.getStationPositionInLine(to));
  }

  private getStationPositionInLine(station: Types.Station): number {
    const stationsInLine = this.stationsByLine[station.line];
    stationsInLine.sort((a, b) => {
      return a.number - b.number;
    });

    return stationsInLine.findIndex(s => s === station);
  }
}

export default StationManager;

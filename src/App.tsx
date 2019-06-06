import React from 'react';
// @ts-ignore
import { Text } from 'evergreen-ui';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import { Result, Station } from './types';
import StationManager from './StationManager';
import './App.css';

type Props = {
  stationManager: StationManager;
};

type State = {
  stations: string[];
  isLoading: boolean;
  origin?: {
    name: string;
    stations: Station[];
  };
  destination?: {
    name: string;
    stations: Station[];
  };
  results: Result[];
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      stations: props.stationManager.getStationNames(),
      isLoading: false,
      results: []
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  async submitHandler(originName: string, destName: string) {
    const { stationManager } = this.props;

    this.setState({
      origin: {
        name: originName,
        stations: stationManager.getStationsByName(originName)
      },
      destination: {
        name: destName,
        stations: stationManager.getStationsByName(destName)
      },
      isLoading: true,
      results: []
    });

    const results = await stationManager.findRoutes(originName, destName);
    const sortedResults = results.slice().sort((a, b) => {
      const scoreA = a.numberOfStations + 5 * a.numberOfTransits;
      const scoreB = b.numberOfStations + 5 * b.numberOfTransits;

      return scoreA - scoreB;
    });

    this.setState({ isLoading: false, results: sortedResults });
  }

  render() {
    const { stations, results, isLoading } = this.state;

    return (
      <div className="app">
        <SearchForm stations={stations} onSubmit={this.submitHandler} disabled={isLoading} />

        <div className="container">
          {isLoading && <Text>Finding routes...</Text>}
          {results.length > 0 && <ResultList results={results} />}
        </div>
      </div>
    );
  }
}

export default App;

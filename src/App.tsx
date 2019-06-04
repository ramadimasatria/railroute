import React from 'react';
// @ts-ignore
import { Text } from 'evergreen-ui';
import SearchForm from './components/SearchForm';
import ResultList, { Result } from './components/ResultList';
import './App.css';

type State = {
  isLoading: boolean;
  origin: string;
  destination: string;
  results: Result[];
};

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: false,
      origin: '',
      destination: '',
      results: []
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(origin: string, destination: string) {
    this.setState({
      origin,
      destination,
      isLoading: true,
      results: []
    });

    const result: Result = {
      score: 1,
      numberOfStations: 5,
      numberOftransits: 1,
      routes: [
        {
          id: '111',
          from: {
            name: 'Dhoby Ghaut',
            line: 'EW',
            number: 1
          },
          to: {
            name: 'Bencoolen',
            line: 'DT',
            number: 2
          }
        },
        {
          id: '123',
          from: {
            name: 'Dhoby Ghaut',
            line: 'EW',
            number: 1
          },
          to: {
            name: 'Bencoolen',
            line: 'DT',
            number: 2
          },
          changeLine: true
        },
        {
          id: '132',
          from: {
            name: 'Dhoby Ghaut',
            line: 'EW',
            number: 1
          },
          to: {
            name: 'Bencoolen',
            line: 'DT',
            number: 2
          }
        }
      ]
    };
    const results: Result[] = [result, result];

    setTimeout(() => {
      this.setState({ isLoading: false, results });
    }, 1000);
  }

  render() {
    const stations = ['Bedok', 'Bras Basah', 'Dhoby Ghaut'];
    const { results, isLoading } = this.state;

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

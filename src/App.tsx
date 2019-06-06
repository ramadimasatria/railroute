import React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import { Text } from 'evergreen-ui';
import { RootState } from './store/reducers';
import SearchFormContainer from './components/SearchFormContainer';
import ResultListContainer from './components/ResultListContainer';

import './App.css';

interface Props {
  isLoading: boolean;
  results: any[];
}

const App: React.FC<Props> = props => (
  <div className="app">
    <SearchFormContainer />

    <div className="container">
      {props.isLoading && <Text>Finding results...</Text>}
      {props.results.length > 0 && !props.isLoading && <ResultListContainer />}
    </div>
  </div>
);

export default connect((state: RootState) => ({
  isLoading: state.app.isLoading,
  results: state.app.results
}))(App);

import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import ResultList from './ResultList';
import { getSortedResults } from '../store/selectors';

const mapStateToProps = (state: RootState) => ({
  results: getSortedResults(state)
});

export default connect(mapStateToProps)(ResultList);

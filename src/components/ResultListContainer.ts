import { connect } from 'react-redux';
import { RootState } from '../store/reducer';
import ResultList from './ResultList';
import { getSortedResults } from '../store/modules/app/selectors';

const mapStateToProps = (state: RootState) => ({
  results: getSortedResults(state.app)
});

export default connect(mapStateToProps)(ResultList);

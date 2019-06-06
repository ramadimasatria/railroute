// import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import { submitSearch } from '../store/actionCreators';
import SearchForm from './SearchForm';

const mapStateToProps = (state: RootState) => {
  return {
    stations: state.station.stationNames,
    disabled: state.app.isLoading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmit: (origin: string, destination: string) => {
      dispatch(submitSearch(origin, destination));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);

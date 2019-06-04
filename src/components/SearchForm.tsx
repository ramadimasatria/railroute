import * as React from 'react';
// @ts-ignore
import { Button, SelectField } from 'evergreen-ui';
import './SearchForm.scss';

type Props = {
  stations: string[];
  onSubmit?: (origin: string, destination: string) => void;
  disabled?: boolean;
};

type State = {
  origin: string;
  destination: string;
};

class SearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      origin: '',
      destination: ''
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!this.props.onSubmit) {
      return;
    }

    const { origin, destination } = this.state;
    this.props.onSubmit(origin, destination);
  }

  render() {
    const { props, state } = this;

    return (
      <form className="SearchForm" onSubmit={this.submitHandler}>
        <div className="container SearchForm-container">
          <div className="SearchForm-field">
            <SelectField
              label="Origin station:"
              width="100%"
              name="origin"
              marginBottom={0}
              onChange={(e: any) => this.setState({ origin: e.target.value })}
              value={state.origin}
            >
              <option disabled value="">
                Select station
              </option>
              {props.stations.map(s => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="SearchForm-field">
            <SelectField
              label="Destination station:"
              width="100%"
              name="destination"
              marginBottom={0}
              onChange={(e: any) => this.setState({ destination: e.target.value })}
              value={state.destination}
            >
              <option disabled value="">
                Select station
              </option>
              {props.stations.map(s => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="SearchForm-field">
            <Button type="submit" appearance="primary" intent="success" disabled={props.disabled}>
              Search Routes
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;

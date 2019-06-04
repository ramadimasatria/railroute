import * as React from 'react';
// @ts-ignore
import { Heading } from 'evergreen-ui';
import ResultDetail from './ResultDetail';

import './ResultList.scss';

type Station = {
  name: string;
  line: string;
  number: number | [];
};

export type Route = {
  id: string;
  from: Station;
  to: Station;
  changeLine?: boolean;
};

export type Result = {
  score: number;
  numberOfStations: number;
  numberOftransits: number;
  routes: Route[];
};

type Props = {
  results: Result[];
};

const ResultList: React.FC<Props> = (props: Props) => {
  const { results } = props;

  return (
    <div className="ResultList">
      <Heading>Found {results.length} results</Heading>

      {results.map((r, idx) => (
        <ResultDetail result={r} key={idx} />
      ))}
    </div>
  );
};

export default ResultList;

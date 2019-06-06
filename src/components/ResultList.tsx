import * as React from 'react';
// @ts-ignore
import { Heading } from 'evergreen-ui';
import ResultDetail from './ResultDetail';
import { Result } from '../types';

import './ResultList.scss';

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

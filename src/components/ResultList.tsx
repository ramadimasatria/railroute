import * as React from 'react';
// @ts-ignore
import { Pane, Heading } from 'evergreen-ui';
import ResultDetail from './ResultDetail';
import { Result } from '../types';

type Props = {
  results: Result[];
};

const ResultList: React.FC<Props> = (props: Props) => {
  const { results } = props;

  return (
    <Pane marginBottom={36}>
      <Heading>Found {results.length} results</Heading>

      {results.map((r, idx) => (
        <ResultDetail result={r} key={idx} />
      ))}
    </Pane>
  );
};

export default ResultList;

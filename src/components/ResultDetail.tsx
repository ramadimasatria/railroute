import * as React from 'react';
// @ts-ignore
import { Card, Text } from 'evergreen-ui';
import { Result } from '../types';
import RouteItem from './RouteItem';

type Props = {
  result: Result;
};

const ResultDetail: React.FC<Props> = props => {
  const { result } = props;

  return (
    <Card width="100%" border elevation={0} marginTop={12} padding={16}>
      <Text>
        Number of stations: {result.numberOfStations}, Number of transits: {result.numberOfTransits}
      </Text>
      {result.routes.map(r => (
        <RouteItem route={r} key={r.id} />
      ))}
    </Card>
  );
};

export default ResultDetail;

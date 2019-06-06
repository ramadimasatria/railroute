import * as React from 'react';
// @ts-ignore
import { Pane, Text } from 'evergreen-ui';
import StationBadge from './StationBadge';
import { Route } from '../types';

type Props = {
  route: Route;
};

const RouteItem: React.FC<Props> = props => {
  const { changeLine, from, to } = props.route;
  const background = changeLine ? 'yellowTint' : 'blueTint';

  return (
    <Pane width="100%" marginY={6} padding={12} background={background}>
      {changeLine ? (
        <Text>
          Change to <strong>{to.line}</strong> line
        </Text>
      ) : (
        <Text>
          Take <strong>{from.line}</strong> line from <StationBadge station={from} /> to <StationBadge station={to} />
        </Text>
      )}
    </Pane>
  );
};

export default RouteItem;

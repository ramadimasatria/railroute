import * as React from 'react';
// @ts-ignore
import { Pane, Text } from 'evergreen-ui';
import { Route } from './ResultList';

type Props = {
  route: Route;
};

const RouteItem: React.FC<Props> = props => {
  const { changeLine, from, to } = props.route;
  let content;
  let background;

  if (changeLine) {
    background = 'yellowTint';
    content = `Change to ${to.line} line`;
  } else {
    background = 'blueTint';
    content = `Take ${from.line} line from ${from.line}${from.number} to ${to.line}${to.number}`;
  }

  return (
    <Pane width="100%" marginY={6} padding={12} background={background}>
      <Text>{content}</Text>
    </Pane>
  );
};

export default RouteItem;

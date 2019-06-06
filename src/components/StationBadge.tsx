import * as React from 'react';
// @ts-ignore
import { Badge } from 'evergreen-ui';
import { Station } from '../types';

type Props = {
  station: Station;
};

const StationBadge: React.FC<Props> = ({ station }) => {
  const colors = {
    NS: 'neutral',
    EW: 'green',
    JS: 'blue',
    SE: 'red',
    BP: 'orange',
    CC: 'purple',
    CE: 'yellow',
    DT: 'teal',
    TE: 'neutral',
    NE: 'green',
    JE: 'blue',
    CG: 'red',
    SW: 'orange',
    PE: 'purple',
    JW: 'yellow',
    PW: 'teal'
  };
  // @ts-ignore
  const badgeColor = colors[station.line];

  return (
    <Badge color={badgeColor}>
      <strong>
        {station.line}
        {station.number} {station.name}
      </strong>
    </Badge>
  );
};

export default StationBadge;

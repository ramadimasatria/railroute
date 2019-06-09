import * as React from 'react';
import { render } from 'enzyme';
import StationBadge from './StationBadge';
import { Station } from '../types';

describe('components/StationBadge', function() {
  const station: Station = {
    id: 0,
    name: 'Station A',
    line: 'AA',
    number: 1
  };
  let wrapper;

  beforeEach(function() {
    wrapper = render(<StationBadge station={station} />);
  });

  it('should display station name, number & line', function() {
    const text = wrapper.text();
    expect(text.includes(station.name)).toBe(true);
    expect(text.includes(station.line)).toBe(true);
    expect(text.includes(station.number)).toBe(true);
  });
});

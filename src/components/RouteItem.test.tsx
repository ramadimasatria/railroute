import * as React from 'react';
import { render } from 'enzyme';
import RouteItem from './RouteItem';
import { Station, Route } from '../types';

describe('components/RouteItem', function() {
  const from: Station = {
    id: 0,
    name: 'Station A',
    line: 'AA',
    number: 1
  };
  const to: Station = {
    id: 1,
    name: 'Station B',
    line: 'AA',
    number: 11
  };

  const route: Route = {
    id: '0',
    from,
    to,
    distance: 10
  };
  let wrapper: any;

  beforeEach(function() {
    wrapper = render(<RouteItem route={route} />);
  });

  it('should display origin & destination stations', function() {
    const text = wrapper.text();
    expect(text.includes(from.name)).toBe(true);
    expect(text.includes(`${from.line}${from.number}`)).toBe(true);

    expect(text.includes(to.name)).toBe(true);
    expect(text.includes(`${to.line}${to.number}`)).toBe(true);
  });

  describe('when change line', function() {
    it('should display next line', function() {
      const to: Station = {
        id: 2,
        name: 'Station C',
        line: 'BB',
        number: 3
      };
      route.to = to;
      wrapper = render(<RouteItem route={route} />);

      expect(wrapper.text().includes(to.line)).toBe(true);
    });
  });
});

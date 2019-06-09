import * as React from 'react';
import { render, mount } from 'enzyme';
import SearchForm from './SearchForm';

describe('components/SearchForm', function() {
  const stations = ['Station A', 'Station B', 'Station C'];
  let wrapper: any;

  it('should set station names as options', function() {
    wrapper = render(<SearchForm stations={stations} />);

    const originOptions = wrapper.find('select[name="origin"]').children();
    expect(originOptions).toHaveLength(4); // the first option is for blank value

    const destOptions = wrapper.find('select[name="destination"]').children();
    expect(destOptions).toHaveLength(4);
  });

  it('should pass origin & destination names when submitted', function() {
    const onSubmitSpy = jest.fn();
    wrapper = mount(<SearchForm stations={stations} onSubmit={onSubmitSpy} />);

    const form = wrapper.find('form');
    const originField = wrapper.find('select[name="origin"]');
    const destField = wrapper.find('select[name="destination"]');

    originField.simulate('change', { target: { value: 'Station A' } });
    destField.simulate('change', { target: { value: 'Station B' } });
    form.simulate('submit');

    expect(onSubmitSpy).toHaveBeenCalled();
    expect(onSubmitSpy).toHaveBeenCalledWith('Station A', 'Station B');
  });

  it('should disable submit button if disabled prop is set to true', function() {
    wrapper = render(<SearchForm stations={stations} disabled />);
    const button = wrapper.find('button[type="submit"]');
    expect(button.attr('disabled')).toBe('disabled');
  });
});

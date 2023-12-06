import { fireEvent } from '@testing-library/react';

import { FilterSearchInput } from './FilterSearchInput';
import { render } from '../../../utils/test-utils';

describe('FilterSearchInput', () => {
  it('calls `onFormChange` when the input value changes', () => {
    const onFormChange = jest.fn();
    const { getByPlaceholderText } = render(
      <FilterSearchInput
        query=""
        onFormClick={jest.fn()}
        onFormChange={onFormChange}
        onFormSubmit={jest.fn()}
      />,
    );

    const input = getByPlaceholderText('Search Snaps');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onFormChange).toHaveBeenCalledTimes(1);
  });

  it('calls `onFormClick` when the input is clicked', () => {
    const onFormClick = jest.fn();
    const { getByPlaceholderText } = render(
      <FilterSearchInput
        query=""
        onFormClick={onFormClick}
        onFormChange={jest.fn()}
        onFormSubmit={jest.fn()}
      />,
    );

    const input = getByPlaceholderText('Search Snaps');
    fireEvent.click(input);

    expect(onFormClick).toHaveBeenCalledTimes(1);
  });

  it('calls `onFormSubmit` when the enter key is pressed', () => {
    const onFormSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <FilterSearchInput
        query=""
        onFormClick={jest.fn()}
        onFormChange={jest.fn()}
        onFormSubmit={onFormSubmit}
      />,
    );

    const input = getByPlaceholderText('Search Snaps');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not call `onFormSubmit` when a key other than enter is pressed', () => {
    const onFormSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <FilterSearchInput
        query=""
        onFormClick={jest.fn()}
        onFormChange={jest.fn()}
        onFormSubmit={onFormSubmit}
      />,
    );

    const input = getByPlaceholderText('Search Snaps');
    fireEvent.keyDown(input, { key: 'a' });

    expect(onFormSubmit).toHaveBeenCalledTimes(0);
  });
});

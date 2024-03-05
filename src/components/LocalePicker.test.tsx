import { fireEvent } from '@testing-library/react';

import { LocalePicker } from './LocalePicker';
import { useLocale } from '../hooks';
import { getMock, render } from '../utils/test-utils';

jest.mock('../hooks', () => ({
  useLocale: jest.fn().mockReturnValue({
    locale: 'en-US',
    setLocale: jest.fn(),
  }),
}));

describe('LocalePicker', () => {
  it('renders a select element with the correct options', () => {
    const { queryByText } = render(<LocalePicker />);

    expect(queryByText('Deutsch')).toBeInTheDocument();
    expect(queryByText('English')).toBeInTheDocument();
    expect(queryByText('日本語')).toBeInTheDocument();
  });

  it('renders the correct default value', () => {
    const { queryByDisplayValue } = render(<LocalePicker />);

    expect(queryByDisplayValue('English')).toBeInTheDocument();
  });

  it('calls the setLocale function when the value changes', () => {
    const setLocale = jest.fn();
    getMock(useLocale).mockReturnValue({
      locale: 'en-US',
      setLocale,
    });

    const { getByDisplayValue } = render(<LocalePicker />);

    const select = getByDisplayValue('English');
    fireEvent.change(select, { target: { value: 'de-DE' } });

    expect(setLocale).toHaveBeenCalledWith('de-DE');
  });
});

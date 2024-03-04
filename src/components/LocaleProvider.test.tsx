import { useContext } from 'react';

import { LocaleContext, LocaleProvider } from './LocaleProvider';
import { render, renderHook } from '../utils/test-utils';

describe('LocaleProvider', () => {
  it('renders children', () => {
    const { queryByText } = render(
      <LocaleProvider defaultLocale="en-US">
        <div>Test</div>
      </LocaleProvider>,
    );

    expect(queryByText('Test')).toBeInTheDocument();
  });

  it('loads the locale from local storage', () => {
    // eslint-disable-next-line no-restricted-globals
    localStorage.setItem('locale', 'de-DE');

    render(
      <LocaleProvider defaultLocale="en-US">
        <div>Test</div>
      </LocaleProvider>,
    );

    const { result } = renderHook(() => useContext(LocaleContext));
    expect(result.current?.locale).toBe('de-DE');
  });

  it('sets the locale in local storage', () => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });

    render(
      <LocaleProvider defaultLocale="en-US">
        <div>Test</div>
      </LocaleProvider>,
    );

    const { result } = renderHook(() => useContext(LocaleContext));
    result.current?.setLocale('de-DE');

    // eslint-disable-next-line no-restricted-globals
    expect(localStorage.getItem('locale')).toBe('de-DE');
  });

  it('falls back to the default locale', () => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });

    // eslint-disable-next-line no-restricted-globals
    localStorage.setItem('locale', 'foo');

    render(
      <LocaleProvider defaultLocale="bar">
        <div>Test</div>
      </LocaleProvider>,
    );

    const { result } = renderHook(() => useContext(LocaleContext));
    expect(result.current?.locale).toBe('en-US');
  });
});

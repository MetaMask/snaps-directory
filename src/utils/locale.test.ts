import { beforeEach } from '@jest/globals';

import { detectUserLocale, getPreferredLocale } from './locale';

describe('detectUserLocale', () => {
  it('returns the default locale if no locale is detected', () => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(navigator, 'languages', {
      value: [],
      configurable: true,
    });

    expect(detectUserLocale('en-US', ['de-DE', 'en-US'])).toBe('en-US');
  });

  it('returns the detected locale', () => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(navigator, 'languages', {
      value: ['de-DE', 'en-US'],
      configurable: true,
    });

    expect(detectUserLocale('en-US', ['de-DE', 'en-US'])).toBe('de-DE');
  });

  it('returns the default locale if the detected locale is not supported', () => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(navigator, 'languages', {
      value: ['de-DE', 'en-US'],
      configurable: true,
    });

    expect(detectUserLocale('en-US', ['en-US'])).toBe('en-US');
  });

  it('falls back to the default supported locales', () => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(navigator, 'languages', {
      value: ['de-DE', 'en-US'],
      configurable: true,
    });

    expect(detectUserLocale('en-US')).toBe('de-DE');
  });
});

describe('getPreferredLocale', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-restricted-globals
    Object.defineProperty(navigator, 'languages', {
      value: ['en-US'],
      configurable: true,
    });
  });

  it('returns the default locale if no locale is detected', () => {
    // eslint-disable-next-line no-restricted-globals
    localStorage.removeItem('locale');

    expect(getPreferredLocale('en-US', ['de-DE', 'en-US'])).toBe('en-US');
  });

  it('returns the preferred locale if it is supported', () => {
    // eslint-disable-next-line no-restricted-globals
    localStorage.setItem('locale', 'de-DE');

    expect(getPreferredLocale('en-US', ['de-DE', 'en-US'])).toBe('de-DE');
  });

  it('returns the default locale if the preferred locale is not supported', () => {
    // eslint-disable-next-line no-restricted-globals
    localStorage.setItem('locale', 'de-DE');

    expect(getPreferredLocale('en-US', ['en-US'])).toBe('en-US');
  });

  it('falls back to the default supported locales', () => {
    // eslint-disable-next-line no-restricted-globals
    localStorage.setItem('locale', 'de-DE');

    expect(getPreferredLocale('en-US')).toBe('de-DE');
  });
});

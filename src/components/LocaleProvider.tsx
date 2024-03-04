import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useState } from 'react';

import { LOCALES } from '../locales';

export type LocaleProviderProps = {
  defaultLocale: string;
  children: ReactNode;
};

export type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

export const LocaleContext = createContext<LocaleContextType | null>(null);

/**
 * Get a value from local storage.
 *
 * @param key - The key to get from local storage.
 * @returns The value from local storage, or null if it doesn't exist.
 */
function getFromLocalStorage(key: string): string | null {
  // istanbul ignore next
  if (
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined'
  ) {
    return null;
  }

  return window.localStorage.getItem(key);
}

export const LocaleProvider: FunctionComponent<LocaleProviderProps> = ({
  defaultLocale,
  children,
}) => {
  const [currentLocale] = useState(
    getFromLocalStorage('locale') ?? defaultLocale,
  );

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);

    // Reloading the page seems to be the most reliable way to ensure the
    // entire app is using the new locale.
    window.location.reload();
  };

  const data = LOCALES.find((item) => item.locale === currentLocale);
  if (!data) {
    setLocale('en-US');
    return null;
  }

  i18n.load(currentLocale, data.messages);
  i18n.activate(currentLocale);

  return (
    <LocaleContext.Provider value={{ locale: currentLocale, setLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
};

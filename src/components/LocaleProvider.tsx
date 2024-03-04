import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useState } from 'react';

import { LOCALES } from '../locales';

export type LocaleProviderProps = {
  locale: string;
  children: ReactNode;
};

export const LocaleContext = createContext({
  locale: 'en',
  setLocale: (_locale: string) => {
    // noop
  },
});

/**
 * Get a value from local storage.
 *
 * @param key - The key to get from local storage.
 * @returns The value from local storage, or null if it doesn't exist.
 */
function getFromLocalStorage(key: string): string | null {
  if (
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined'
  ) {
    return null;
  }

  return window.localStorage.getItem(key);
}

export const LocaleProvider: FunctionComponent<LocaleProviderProps> = ({
  locale,
  children,
}) => {
  const [currentLocale] = useState(getFromLocalStorage('locale') ?? locale);

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);

    // Reloading the page seems to be the most reliable way to ensure the
    // entire app is using the new locale.
    window.location.reload();
  };

  const data = LOCALES.find((item) => item.locale === currentLocale);
  i18n.load(currentLocale, data?.messages ?? {});
  i18n.activate(currentLocale);

  return (
    <LocaleContext.Provider value={{ locale: currentLocale, setLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
};

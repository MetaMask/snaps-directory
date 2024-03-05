import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { assert } from '@metamask/utils';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useState } from 'react';

import { LOCALES } from '../locales';
import { getPreferredLocale } from '../utils';

export type LocaleProviderProps = {
  defaultLocale: string;
  children: ReactNode;
};

export type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

export const LocaleContext = createContext<LocaleContextType | null>(null);

export const LocaleProvider: FunctionComponent<LocaleProviderProps> = ({
  defaultLocale,
  children,
}) => {
  const [currentLocale] = useState(getPreferredLocale(defaultLocale));

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);

    // Reloading the page seems to be the most reliable way to ensure the
    // entire app is using the new locale.
    window.location.reload();
  };

  const data = LOCALES.find((item) => item.locale === currentLocale);
  assert(data, `No locale data found for ${currentLocale}.`);

  i18n.load(currentLocale, data.messages);
  i18n.activate(currentLocale);

  return (
    <LocaleContext.Provider value={{ locale: currentLocale, setLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
};

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { FunctionComponent, ReactNode } from 'react';
import { useEffect, createContext, useState } from 'react';

import { DEFAULT_LOCALE, LOCALES } from '../locales';
import { getPreferredLocale } from '../utils';

for (const { locale, messages } of LOCALES) {
  i18n.load(locale, messages);
}

i18n.activate(DEFAULT_LOCALE);

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
  const [currentLocale, setCurrentLocale] = useState(
    getPreferredLocale(defaultLocale),
  );

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);
    setCurrentLocale(newLocale);
  };

  useEffect(() => {
    i18n.activate(currentLocale);
  }, [currentLocale]);

  return (
    <LocaleContext.Provider value={{ locale: currentLocale, setLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
};

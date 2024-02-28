import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { LOCALES } from '../locales';

export type LocaleProviderProps = {
  locale: string;
  children: ReactNode;
};

export const LocaleProvider: FunctionComponent<LocaleProviderProps> = ({
  locale,
  children,
}) => {
  const localeData = LOCALES.find((item) => item.locale === locale);

  i18n.load(locale, localeData?.messages ?? {});
  i18n.activate(locale);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

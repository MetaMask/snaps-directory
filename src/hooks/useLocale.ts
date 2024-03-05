import { useContext } from 'react';

import { LocaleContext } from '../components';

/**
 * A hook to access the current locale and set the locale.
 *
 * @returns The current locale and a function to set the locale.
 */
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('`useLocale` must be used within a LocaleProvider.');
  }

  return context;
}

import { LOCALE_CODES } from '../locales';

/**
 * Detect the user's locale based on the browser's `navigator.languages`
 * property.
 *
 * @param defaultLocale - The default locale to use if none is detected.
 * @param supportedLocales - The list of supported locales.
 * @returns The detected locale or the default locale if none is detected.
 */
export function detectUserLocale(
  defaultLocale: string,
  supportedLocales: string[] = LOCALE_CODES,
) {
  for (const locale of navigator.languages) {
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

/**
 * Get the user's preferred locale.
 *
 * @param defaultLocale - The default locale to use if none is detected.
 * @param supportedLocales - The list of supported locales.
 * @returns The user's preferred locale or the default locale if none is
 * detected.
 */
export function getPreferredLocale(
  defaultLocale: string,
  supportedLocales: string[] = LOCALE_CODES,
) {
  // istanbul ignore next
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const preferredLocale = localStorage.getItem('locale');
  if (preferredLocale && supportedLocales.includes(preferredLocale)) {
    return preferredLocale;
  }

  return detectUserLocale(defaultLocale, supportedLocales);
}

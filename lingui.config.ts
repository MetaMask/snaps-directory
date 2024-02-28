import type { LinguiConfig } from '@lingui/conf';
import { formatter } from '@lingui/format-po';

// The list of locales supported by the application. This must match the list in
// `src/locales/index.ts`.
const SUPPORTED_LOCALES = [
  'de-DE',
  'en-US',
  'ja-JP',
  'pt-BR',
  'ru-RU',
  'tr-TR',
  'zh-CN',
];

const format = formatter({
  lineNumbers: false,
});

const config: LinguiConfig = {
  compileNamespace: 'es',
  locales: SUPPORTED_LOCALES,
  sourceLocale: 'en-US',
  format: {
    catalogExtension: format.catalogExtension,
    parse: format.parse.bind(format),
    serialize: async (catalog, context) => {
      const serialized = await format.serialize.bind(format)(catalog, context);

      // Crowdin adds a newline at the end of the file, so we need to add it
      // here as well.
      return `${serialized}\n`;
    },
  },
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
};

export default config;

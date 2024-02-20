import type { LinguiConfig } from '@lingui/conf';
import { formatter } from '@lingui/format-po';

const format = formatter({
  lineNumbers: false,
});

const config: LinguiConfig = {
  compileNamespace: 'es',
  locales: ['de-DE', 'en-US', 'ja-JP', 'pt-BR', 'ru-RU', 'tr-TR', 'zh-CN'],
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

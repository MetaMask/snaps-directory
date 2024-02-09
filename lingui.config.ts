import type { LinguiConfig } from '@lingui/conf';
import { formatter } from '@lingui/format-po';

const config: LinguiConfig = {
  compileNamespace: 'es',
  locales: ['de-DE', 'en-US', 'ja-JP', 'pt-BR', 'ru-RU', 'tr-TR', 'zh-CN'],
  format: formatter({ lineNumbers: false }),
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
};

export default config;

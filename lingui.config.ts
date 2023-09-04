import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  compileNamespace: 'es',
  locales: ['en'],
  format: 'po',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
};

export default config;

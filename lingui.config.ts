import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  compileNamespace: 'cjs',
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

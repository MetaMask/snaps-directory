import type { LinguiConfig } from '@lingui/conf';
// eslint-disable-next-line import/no-extraneous-dependencies
import { formatter } from '@lingui/format-json';

const config: LinguiConfig = {
  compileNamespace: 'cjs',
  locales: ['en'],
  format: formatter({ style: 'lingui' }),
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
};

export default config;

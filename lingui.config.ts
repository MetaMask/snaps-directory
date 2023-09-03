import { LinguiConfig } from '@lingui/conf';
import { formatter } from '@lingui/format-json';

const config: LinguiConfig = {
  compileNamespace: 'cjs',
  locales: ['en'],
  format: formatter({ style: 'lingui' }),
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
}

export default config;

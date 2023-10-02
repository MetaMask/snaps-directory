module.exports = {
  root: true,

  extends: ['@metamask/eslint-config'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        '@metamask/eslint-config-typescript',
        '@metamask/eslint-config-browser',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        '@typescript-eslint/no-shadow': [
          'error',
          {
            allow: ['Text'],
          },
        ],
        '@typescript-eslint/restrict-template-expressions': 'off',

        'react/display-name': 'off',
        'react/prop-types': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },

    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['src/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },

    {
      files: ['*.test.ts', '*.test.tsx', '*.test.js'],
      plugins: ['eslint-plugin-jest-dom'],
      extends: [
        '@metamask/eslint-config-jest',
        '@metamask/eslint-config-nodejs',
        'plugin:jest-dom/recommended',
      ],
    },

    {
      files: ['./src/theme/**/*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],

  ignorePatterns: [
    '!.eslintrc.js',
    '!.prettierrc.js',
    'dist/',
    'docs/',
    '.yarn/',
    'public/',
  ],
};

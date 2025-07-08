import eslintPluginNode from 'eslint-plugin-node';
import eslintRecommended from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    ignores: ['node_modules/', 'dist/'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      ...eslintRecommended.configs.recommended.rules,
      ...prettier.rules,
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'node/no-unsupported-features/es-syntax': 'off',
    },
  },
];

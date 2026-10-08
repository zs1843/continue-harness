module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  ignorePatterns: [
    'node_modules/',
    'tmp/',
    'site/continue-harness-docs/docs/.vitepress/',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
};

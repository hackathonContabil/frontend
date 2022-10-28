const path = require('path');

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: [
        ['teste', path.resolve(__dirname, 'src', 'assets')],
        ['helpers', './src/helpers'],
      ],
    },
  },
  plugins: ['prettier', 'react'],
  rules: {
    'prettier/prettier': ['warn', { usePrettierrc: true }],
    eqeqeq: ['warn', 'smart'],
    'no-unused-vars': ['off'],
    'react/prefer-stateless-function': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-empty-pattern': ['off'],
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'no-unreachable': 'off',
  },
};

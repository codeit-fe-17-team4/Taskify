import { sheriff, type SheriffSettings, tseslint } from 'eslint-config-sheriff';

const sheriffOptions: SheriffSettings = {
  react: true,
  lodash: false,
  remeda: false,
  next: true,
  astro: false,
  playwright: false,
  storybook: true,
  jest: false,
  vitest: false,
};

export default tseslint.config(sheriff(sheriffOptions), {
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  },
  rules: {
    // https://typescript-eslint.io/rules/no-misused-promises/#checksvoidreturn
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'no-console': 'off',
    // 절대경로 통일을 위해 ".*" 패턴 제한
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*'],
      },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    'react-refresh/only-export-components': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-boolean-value': 'off',
    '@typescript-eslint/no-misused-spread': 'off',
    'func-style': 'off',
  },
});

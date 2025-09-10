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
      projectService: true,
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
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
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-floating-promises': 'off',
    'react-refresh/only-export-components': 'off',
    'react/jsx-no-useless-fragment': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'jsdoc/require-description-complete-sentence': 'off',
    'func-style': 'off',
    'no-negated-condition': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'react/no-multi-comp': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/require-await': 'off',
    'tsdoc/syntax': 'off',
    'fsecond/valid-event-listener': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'fsecond/prefer-destructured-optionals': 'off',
    '@typescript-eslint/no-misused-spread': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
  },
});

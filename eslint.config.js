// ESLint flat config for ESLint v9+

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/build/**',
      '*.config.{js,mjs,cjs}',
    ],
  },
  // Base config
  js.configs.recommended,
  // TypeScript configs
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // TypeScript-specific rules
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
      'import': importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // Allow numbers and booleans in template literals
      '@typescript-eslint/restrict-template-expressions': ['error', {
        allowNumber: true,
        allowBoolean: true,
        allowAny: false,
        allowNullish: false,
      }],
      // Import hygiene
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      // TypeScript performs module resolution/type checking; avoid false positives
      'import/no-unresolved': 'off',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.{test,spec}.ts',
            '**/*.{test,spec}.{ts,js}',
            '**/*.{test,spec}.{ts,tsx,js,jsx}',
            '**/*.stories.{ts,tsx,js,jsx}',
            '**/*.d.ts',
            '**/scripts/**',
            '**/setupTests.{js,ts}',
            '*.config.{js,ts,mjs,cjs}',
          ],
          optionalDependencies: false,
          peerDependencies: true,
          includeTypes: true,
          packageDir: './',
        },
      ],
      // Sorting
      'simple-import-sort/imports': ['error', {
        groups: [
          ['^node:'],
          ['^@?\\w'],
          ['^src/', '^@/'],
          ['^\\u0000'],
          ['^\\.\\./'],
          ['^\\.'],
          ['^.+\\.css$'],
        ],
      }],
      'simple-import-sort/exports': 'error',
      // Avoid excessive blank lines
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      // Style
      'comma-spacing': ['error', { before: false, after: true }],
      'space-before-function-paren': ['error', 'never'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      // TypeScript safety
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['arrowFunctions', 'methods'] },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-shadow': ['error', { allow: ['err', 'error', 'errors', 'e'] }],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      // Core JS/TS rules
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'all'],
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-unreachable': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'arrow-body-style': ['error', 'as-needed'],
    },
  },
  // Test files
  {
    files: ['**/*.{test,spec}.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-console': 'off',
    },
  },
];

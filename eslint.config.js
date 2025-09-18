// ESLint flat config for ESLint v9+

import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/build/**',
      'eslint.config.js',
      'eslint.config.mjs',
    ],
  },
  // Base config for all files
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
  // TypeScript config for .ts files
  {
    files: ['src/**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
      'import': importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
    rules: {
      // Import hygiene
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      'import/no-unresolved': 'off', // TS handles resolution
      'import/newline-after-import': ['error', { count: 1 }],
      // Sorting
      'simple-import-sort/imports': ['error', {
        groups: [
          ['^node:'],
          ['^@?\\w'],
          ['^src/', '^@/'],
          ['^\\u0000'],
          ['^\.\./'],
          ['^\.'],
          ['^.+\\.css$'],
        ],
      }],
      'simple-import-sort/exports': 'error',
      // Style (not using Prettier)
      'comma-spacing': ['error', { before: false, after: true }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
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
      '@typescript-eslint/no-shadow': ['error', { allow: ['err', 'error'] }],
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
]);

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import-x';
import globals from 'globals';

const ignores = [
  '**/dist/**',
  '**/node_modules/**',
  '**/coverage/**',
  '**/*.d.ts',
  '**/build/**',
  '*.config.{js,mjs,cjs}',
  '**/.pnpm-store/**',
  '.vscode/**',
];

const importDevDeps = [
  '**/*.{test,spec}.ts',
  '**/*.{test,spec}.{ts,js}',
  '**/*.{test,spec}.{ts,tsx,js,jsx}',
  '**/*.stories.{ts,tsx,js,jsx}',
  '**/*.d.ts',
  '**/scripts/**',
  '**/setupTests.{js,ts}',
  '*.config.{js,ts,mjs,cjs}',
];

const baseRules = {
  // Allow numbers and booleans in template literals via TS rule
  '@typescript-eslint/restrict-template-expressions': ['error', {
    allowNumber: true,
    allowBoolean: true,
    allowAny: false,
    allowNullish: true,
    allowRegExp: true,
  }],

  // Import hygiene
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/no-cycle': 'error',
  'import/no-unresolved': 'off',
  'import/newline-after-import': ['error', { count: 1 }],
  'import/no-extraneous-dependencies': ['error', { devDependencies: importDevDeps, optionalDependencies: false, peerDependencies: true, includeTypes: true, packageDir: './' }],
  'import/order': ['error', {
    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
    pathGroups: [
      { pattern: 'src/**', group: 'internal' },
      { pattern: '@/**', group: 'internal' },
      { pattern: '*.css', group: 'index', position: 'after' },
    ],
    pathGroupsExcludedImportTypes: ['builtin'],
    'newlines-between': 'always',
    alphabetize: { order: 'asc', caseInsensitive: true },
  }],

  // Style
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
  'comma-spacing': ['error', { before: false, after: true }],
  'space-before-function-paren': ['error', 'never'],
  'quotes': ['error', 'single'],
  'semi': ['error', 'always'],
  'object-curly-spacing': ['error', 'always'],

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
};

const typescriptRules = {
  ...baseRules,
  // TypeScript safety specifics
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
  '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions', 'methods'] }],
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
};

export default [
  { ignores },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
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
    rules: typescriptRules,
  },
  // Test files override
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

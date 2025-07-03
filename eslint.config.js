// ESLint flat config for ESLint v9+
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';


export default tseslint.config(
    // Global ignores
    {
        ignores: ['dist/', 'node_modules/', 'coverage/', 'eslint.config.mjs', '*.d.ts'],
    },

    // Base configuration
    {
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
    },

    // Apply base recommended configs
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // Apply strict TypeScript configurations
    ...tseslint.configs.strictTypeChecked.map(config => ({
        ...config,
        files: ['src/**/*.ts'],
    })),
    ...tseslint.configs.stylisticTypeChecked.map(config => ({
        ...config,
        files: ['src/**/*.ts'],
    })),

    // TypeScript source files configuration
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // Import sorting for Node.js projects
            'simple-import-sort/imports': ['error', {
                groups: [
                    // Node.js built-ins first
                    ['^node:'],
                    // External packages
                    ['^@?\\w'],
                    // Internal imports
                    ['^src/', '^@/'],
                    // Relative imports
                    ['^\\.']
                ]
            }],
            'simple-import-sort/exports': 'error',

            // Code style
            'no-var': 'error',
            'prefer-const': 'error',
            'no-unreachable': 'warn',
            'indent': ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],

            // TypeScript rules
            '@typescript-eslint/no-explicit-any': 'error',
            'no-unused-vars': 'off',
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
            '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/restrict-plus-operands': 'off',
            // NOTE: Enforce 'interface' for props and 'type' for unions/aliases per coding standards.
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        },
    },
);

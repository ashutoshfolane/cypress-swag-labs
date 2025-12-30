import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Ignore generated folders
  {
    ignores: [
      'node_modules/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
      'cypress/downloads/**',
      'reports/**',
      'dist/**',
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (no type-checking required)
  ...tseslint.configs.recommended,

  // Project-wide TS rules
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Keep strict by default
    },
  },

  // Allow console ONLY in env loader (Node-side config code)
  {
    files: ['cypress/support/env.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // Turn off rules that conflict with Prettier
  prettierConfig,
];

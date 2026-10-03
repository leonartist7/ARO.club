import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  {files:['src/**/*.{ts,tsx}','next.config.ts'],extends:[tseslint.configs.recommended],rules:{'@typescript-eslint/no-explicit-any':'off'}},
  globalIgnores(['dist', '.next', 'next-env.d.ts']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react },
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],

    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {...globals.browser, process: 'readonly'},
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Mark identifiers referenced in JSX (e.g. `motion.div`, `<Icon/>`) as used,
      // so no-unused-vars stops false-flagging Framer Motion + component imports.
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

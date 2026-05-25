import { defineConfig } from 'eslint'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'

export default defineConfig([
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    extends: [
      js.configs.recommended, // базові правила JS
      tseslint.configs.recommended, // оптимальні правила TS (не strict)
      reactHooks.configs.flat.recommended, // правила React hooks
      reactRefresh.configs.vite, // підтримка React Refresh
      'plugin:prettier/recommended', // інтеграція Prettier + ESLint
    ],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': ['error'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])

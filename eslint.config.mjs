import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', 'docs/**'],
  },

  // TypeScript baseline for every workspace.
  ...tseslint.configs.recommended,

  // Backend runs on Node.
  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Frontend runs in the browser.
  {
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },

  // Build/tooling config files execute in Node.
  {
    files: ['**/*.config.{ts,mts,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Prettier must stay last so formatting rules win.
  prettierConfig,
);

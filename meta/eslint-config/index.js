/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['@bync-meta/eslint-plugin'],
  extends: ['@bync/eslint-config'],
  ignorePatterns: ['build/**/*'],
  overrides: [
    {
      files: ['**/*.test.ts', 'test/**/*.ts'],
      rules: {
        // Strings may end up being duplicated in test files
        'sonarjs/no-duplicate-string': 'warn',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['@bync/eslint-config/frontend', '@bync/eslint-config/typescript'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/label-has-for': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      },
    },
    {
      files: ['*.css.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['*.story.tsx'],
      rules: {
        'no-console': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: ['*.test.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
      settings: {
        'mdx/code-blocks': true,
      },
      rules: {
        'import/no-unresolved': 'off',
        'react/jsx-no-undef': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    'no-restricted-syntax': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    '@bync-meta/interface-prefix': 'warn',
  },
};

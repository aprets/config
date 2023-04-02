module.exports = ({ isReact } = { isReact: false }) => ({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  globals: {
    ...(isReact && {
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/Troubleshooting.mdx#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      JSX: true,
    }),
  },
  extends: [
    ...(isReact ? ['airbnb', 'airbnb/hooks', 'airbnb-typescript'] : ['airbnb/base', 'airbnb-typescript/base']),
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    ...(isReact ? ['plugin:testing-library/react', 'plugin:jest-dom/recommended'] : []),
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  plugins: [
    'import',
    ...(isReact ? ['react', 'jsx-a11y', 'testing-library', 'jest-dom'] : []),
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    // Run prettier as an ESLint rule and report differences as individual ESLint issues.
    'prettier/prettier': 'error',

    /* General rules */
    // prevent const x = function() {}
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    // TODO: Prevent function shorthand in object literals?
    // mirror the airbnb config, but remove for..in and for..of
    // as they are reasonable in node or modern browsers
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    // mirror the airbnb config, but allow some exceptions
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      },
    ],
    // mirror the airbnb config, but extend it to apply to TS files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/test/**', // tape, common npm pattern
          '**/tests/**', // also common npm pattern
          '**/spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.{js,jsx,ts,tsx}', // repos with a single test file
          'test-*.{js,jsx,ts,tsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{js,jsx,ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.{js,ts}', // jest config
          '**/jest.setup.{js,ts}', // jest setup
          '**/vue.config.{js,ts}', // vue-cli config
          '**/webpack.config.{js,ts}', // webpack config
          '**/webpack.config.*.{js,ts}', // webpack config
          '**/rollup.config.{js,ts}', // rollup config
          '**/rollup.config.*.{js,ts}', // rollup config
          '**/gulpfile.{js,ts}', // gulp config
          '**/gulpfile.*.{js,ts}', // gulp config
          '**/Gruntfile{,.js,.ts}', // grunt config
          '**/protractor.conf.{js,ts}', // protractor config
          '**/protractor.conf.*.{js,ts}', // protractor config
          '**/karma.conf.{js,ts}', // karma config
          '**/.eslintrc.{js,ts}', // eslint config
        ],
        optionalDependencies: false,
      },
    ],
    // Allow disabling eslint rules for the whole file
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

    // Our APIs already use null and there can be good reasons to use it
    'unicorn/no-null': 'off',
    // !arr.length is fairly common and more concise than arr.length === 0
    'unicorn/explicit-length-check': 'off',
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // We rarely use this syntax, and often do not care about returning in a then() callback
    // However if you use this please see http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html (rule #5)
    'promise/always-return': 'off',
    // This is somewhat excessive, other rules should take care of the potential issues
    'no-plusplus': 'off',
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    // there can be good reasons to have more than 1 class per file, if the file gets too complex it should be flagged in CR
    'max-classes-per-file': 'off',
    // !consider uncommenting those in the future
    // https://github.com/prettier/eslint-plugin-prettier#arrow-body-style-and-prefer-arrow-callback-issue
    // 'arrow-body-style': 'off',
    // 'prefer-arrow-callback': 'off',

    /* TypeScript-specific rules */
    // Extend eslint-config-airbnb-typescript with type prefix rules
    '@typescript-eslint/naming-convention': [
      'error',
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        // Forbid starting with I as this is generally advised against in TS
        // https://stackoverflow.com/a/41967120
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // !consider uncommenting those in the future
    // '@typescript-eslint/explicit-module-boundary-types': 'off',

    /* React-specific rules */
    ...(isReact && {
      // Enforce arrow functions for React components
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      // Not needed with React 17+
      'react/react-in-jsx-scope': 'off',
      // prop spreading can be useful if used within reason, the syntax is generally considered readable nowadays
      'react/jsx-props-no-spreading': 'off',
      // this is too excessive with good use of typescript, we should not need default props
      'react/require-default-props': 'off',
      // !consider uncommenting those in the future
      // can be excessive as react already kind of does it
      // 'react/no-danger': 'off',
      // 'react/require-default-props': 'off',
      // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
      // "react/jsx-filename-extension": "off",
    }),
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // Allow CJS until ESM support improves
        '@typescript-eslint/no-var-requires': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: ['**/*.test.*'],
      rules: {
        // more lenient rules for tests
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
    ...(isReact
      ? [
          {
            files: ['**/*.tsx'],
            rules: {
              // not needed when you have types
              'react/prop-types': 'off',
            },
          },
          {
            files: ['**/*.stories.tsx'],
            rules: {
              // this rule does not work properly with storybook
              'react-hooks/rules-of-hooks': 'off',
            },
          },
        ]
      : []),
  ],
});

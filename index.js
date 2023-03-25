module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['import', 'react', 'jsx-a11y', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  rules: {
    // Run prettier as an ESLint rule and report differences as individual ESLint issues.
    'prettier/prettier': 'error',

    /* General rules */
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbook.io/typescript/main-1/defaultisbad
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    // prevent const x = function() {}
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
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
    // !consider uncommenting those in the future
    // https://github.com/prettier/eslint-plugin-prettier#arrow-body-style-and-prefer-arrow-callback-issue
    // 'arrow-body-style': 'off',
    // 'prefer-arrow-callback': 'off',

    /* React-specific rules */
    // Not needed with React 17+
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // !consider fully disabling if exceptions pop up too much
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
        exceptions: ['FormCheckbox', 'FormInput', 'FormRadio', 'FormSelect', 'FormTextArea', 'FormToggle', 'TextField'],
      },
    ],
    // !consider uncommenting those in the future
    // can be excessive as react already kind of does it
    // 'react/no-danger': 'off',
    // 'react/require-default-props': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    // "react/jsx-filename-extension": "off",

    /* TypeScript-specific rules */
    // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // !consider uncommenting those in the future
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
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
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['**/*.{test,stories}.*'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
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
  plugins: ['import', 'react', 'jsx-a11y', '@typescript-eslint', 'prettier'],
  rules: {
    // Run prettier as an ESLint rule and report differences as individual ESLint issues.
    'prettier/prettier': 'error',

    /* General rules */
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
    // Our APIs already use null and there can be good reasons to use it
    'unicorn/no-null': 'off',
    // !arr.length is fairly common and more concise than arr.length === 0
    'unicorn/explicit-length-check': 'off',
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbook.io/typescript/main-1/defaultisbad
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
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
        exceptions: ['FormCheckbox', 'FormInput', 'FormRadio', 'FormSelect', 'FormTextArea', 'FormToggle', 'TextField', 'PasswordInput'],
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
      files: ['**/*.test.*'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/require-await': 'off',
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};

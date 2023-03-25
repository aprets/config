module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['import', 'react', 'jsx-a11y', '@typescript-eslint', 'prettier'],
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'max-len': [
      'error',
      {
        code: 160,
        ignoreStrings: true,
      },
    ],
    // prevent const x = function() {}
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    // naming export can be beneficial for debugging, readability etc.
    'import/prefer-default-export': 'off',
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
    // consider fully disabling if exceptions pop up too much
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
        exceptions: ['FormCheckbox', 'FormInput', 'FormRadio', 'FormSelect', 'FormTextArea', 'FormToggle', 'TextField'],
      },
    ],
    // Consider uncommenting those in the future
    // can be excessive as react already kind of does it
    // 'react/no-danger': 'off',
    // 'react/require-default-props': 'off',

    /* TypeScript-specific rules */
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
      },
    ],
    // Consider uncommenting those in the future
    // '@typescript-eslint/explicit-module-boundary-types': 'off',

    /* Prettier compatibility rules */
    'implicit-arrow-linebreak': 'off',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['**/*.+(test|stories).*'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};

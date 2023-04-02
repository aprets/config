module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier', 'stylelint-config-styled-components'],
  customSyntax: 'postcss-scss',
  rules: {
    'no-descending-specificity': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'no-duplicate-selectors': null,
    'length-zero-no-unit': true,
    'unit-no-unknown': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
  },
};

# eslint-config-aprets

## Usage

1. Install the package

```bash
npm install -D eslint-config-aprets
```

2. Create  `.eslintrc.js` file in the root of where you want to use the config

```js
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('eslint-config-aprets/patch/modern-name-resolution')

module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: ['eslint-config-aprets'],
  rules: {
	// your overrides
  },
}
```

3. Potentially reload eslint or restart your editor.
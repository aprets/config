# @aprets/config

## Usage

1. Install the package

```bash
npm install -D @aprets/config
```

2. Create  `.eslintrc.js` file in the root of where you want to use the config

```js
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@aprets/config/patch/modern-name-resolution');

module.exports = {
  extends: ['./node_modules/@aprets/config/eslint/react'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```

3. Create  `.prettierrc.json` file in the root of where you want to use the config

```js
"@aprets/config/prettier"
```

4. Create  `tsconfig.json` file in the root of where you want to use the config

```js
{
  "extends": "@aprets/config/tsconfig",
  "compilerOptions": {
    "noEmit": true,
  },
  "include": [
    "./src"
  ]
}
```

5. Create  `.stylelintrc` file in the root of where you want to use the config

```js
{
  "extends": "@aprets/config/stylelint"
}

```

5. Potentially reload relevant plugins or restart your editor.
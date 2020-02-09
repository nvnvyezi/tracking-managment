module.exports = {
  root: true,
  // parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.js'],
      parser: 'babel-eslint',
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/interface-name-prefix': [
          'error',
          {
            prefixWithI: 'always',
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'none',
              requireLast: false,
            },
          },
        ],
      },
    },
  ],
  extends: [
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: { browser: true, commonjs: true, es6: true, node: true, worker: true },
  // 这里填入你的项目需要的全局变量
  globals: {},
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      impliedStrict: true,
    },
  },
  //自动发现React的版本，从而进行规范react代码
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    // 解决webpack alias 找不到模块 问题
    'import/resolver': {
      alias: {
        map: [['Images', './src/assets/images/']],
      },
    },
  },
  // 这里填入你的项目需要的个性化配置，比如：
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
}

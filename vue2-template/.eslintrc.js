module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  'plugins': ['simple-import-sort'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eqeqeq': [2, 'always'], // 要求使用 === 和 !==
    'semi': [2, 'always'], // 要求或禁止使用分号代替 ASI 
    'quotes': [2, 'single'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // 'no-magic-numbers': "error"
  }
};

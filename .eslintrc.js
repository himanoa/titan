module.exports = {
  settings: {
    react: {
      version: "16.8"
    }
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', "react", "react-hooks"],
  extends: ['eslint:recommended', 'prettier', "plugin:react/recommended"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "no-unused-vars": "off",
    "react/no-children-prop": "off",
    "react/prop-typs": "off"
  }
};

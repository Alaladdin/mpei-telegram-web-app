/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true,
    "jest": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    '@vue/airbnb',
    "@vue/eslint-config-typescript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2022,
  },
}

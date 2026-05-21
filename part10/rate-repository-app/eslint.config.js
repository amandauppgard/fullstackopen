// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const pluginJest = require('eslint-plugin-jest');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    ...pluginJest.configs['flat/recommended'],
  },
]);

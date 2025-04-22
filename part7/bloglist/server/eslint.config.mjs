import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import stylisticJS from "@stylistic/eslint-plugin-js";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
    plugins: {
      "@stylistic/js": stylisticJS,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],
      "no-unused-vars": ["error", { "ignoreRestSiblings": true}] 
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ignores: ["dist"],
  },
]);

import globals from "globals";
import stylisticJS from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "script"
    },
    plugins: {
      '@stylistic/js': stylisticJS
    },
    rules: {
      '@stylistic/js/indent': ['error',2],
      '@stylistic/js/linebreak-style': ['error','unix'],
      '@stylistic/js/quotes': ['error','single'],
      '@stylistic/js/semi': ['error','never'],
    }, 
  },
  {
    languageOptions: { 
      globals: globals.node 
    }
  },
  {
    ignores: [ "dist" ]
  }
];
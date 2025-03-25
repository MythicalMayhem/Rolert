import eslint from '@eslint/js';
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      'dist/**/*.ts',
      'dist/**',
      "**/*.mjs",
      "eslint.config.mjs",
      "**/*.js"
    ],
  },
  {

    files: ['**/*.{js,ts,tsx,jsx}'],


    plugins: {
      '@stylistic': stylistic
    },
    rules: {

      "require-await": "off",
      'default-param-last': 'off',
      "max-params": "off",
      'dot-notation': 'off',
      'init-declarations': 'off',
      "no-array-constructor": "off",
      "no-shadow": "off",
      "no-implied-eval": "error",
      "no-unused-vars": "off",
      "no-unused-expressions": "off",

      '@stylistic/indent': ['warn', "tab"],
      '@stylistic/arrow-parens': ['warn', 'always'],
      '@stylistic/block-spacing': 'warn',
      '@stylistic/array-bracket-spacing': 'warn',
      "@stylistic/no-tabs": ["error", { allowIndentationTabs: true }],
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "off",
      "@typescript-eslint/restrict-plus-operands": ["off"],
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-shadow": "warn",
      '@typescript-eslint/dot-notation': ['error', {
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
        allowIndexSignaturePropertyAccess: false,
      }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-deprecated": "error",
      "@typescript-eslint/no-confusing-void-expression": ["error", {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: true,
        ignoreVoidReturningFunctions: true,
      },],
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: "off" } }],
      "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": false }],
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-array-delete": "error",
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/member-ordering": "error",
      '@typescript-eslint/init-declarations': 'error',
      "@typescript-eslint/max-params": ["error", { max: 7 }],
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-invalid-void-type": "error",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-non-null-assertion": "error",

      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": ["default"],
          "format": [
            "camelCase"
          ]
        },
        {
          "selector": "enum",
          "format": ["PascalCase"],
          "custom": {
            "regex": "^E[A-Z][A-Za-z]",
            "match": true
          }
        },
        {
          "selector": ["class", "typeLike"],
          "format": ["PascalCase"]
        },
        {
          "selector": ["objectLiteralProperty", "objectLiteralMethod"],
          "format": null,
        },
        {
          "selector": ["method", "variableLike"],
          "format": ["camelCase", 'UPPER_CASE'],
          "leadingUnderscore": "allow",
        },
        {
          "selector": ["variableLike"],
          "modifiers": ['exported'],
          "format": ["PascalCase"]
        },
        {
          "selector": ['function', 'enumMember'],
          "format": ["PascalCase"]
        },
        {
          "selector": ['typeProperty', 'interface'],
          "format": ["PascalCase", "camelCase"],
          "leadingUnderscore": "allowDouble",
        },
        {
          selector: 'import',
          format: null,
        },

      ],
      'prettier/prettier': [
        'off',
        {},
        {
          usePrettierrc: true,
        },
      ],
    },

  },
  eslintPluginPrettierRecommended,

  {
    // enable the rule specifically for TypeScript files
    "files": ["**/*.tsx"],
    "rules": {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
])
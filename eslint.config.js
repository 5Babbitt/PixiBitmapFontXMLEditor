import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'


export default defineConfig([
    { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },
    { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.browser } },
    { files: ['**/*.{js,mjs,cjs}'],
        rules: {
            // Indentation rules
            'indent': ['error', 4],

            // Spacing rules
            'space-before-blocks': 'error',
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always',
            }],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': 'error',
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'key-spacing': ['error', {
                'beforeColon': false,
                'afterColon': true,
            }],
            'comma-spacing': ['error', {
                'before': false,
                'after': true,
            }],

            // Line spacing
            'no-multiple-empty-lines': ['error', { 'max': 2 }],
            'no-trailing-spaces': 'error',

            // Semicolons
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],

            'comma-dangle': ['error', 'always-multiline'],
        },
    },
])

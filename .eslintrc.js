module.exports = {
    env: {
        browser: true,
        es2021: true,
        es6: true,
        node: true
    },
    extends: ['standard'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        curly: ['error', 'multi-line'],
        'no-console': 'off',
        'func-call-spacing': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'brace-style': 'error',
        'block-spacing': ['error', 'always'],
        'dot-location': ['error', 'property'],
        'no-mixed-spaces-and-tabs': 'error',
        'comma-spacing': ['error', { before: false, after: true }],
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'no-multi-spaces': 'error',
        'no-whitespace-before-property': 'error',
        'space-before-blocks': ['error', 'always'],
        'no-dupe-args': 'error',
        'space-unary-ops': ['error', { words: true, nonwords: false }],
        'template-curly-spacing': ['error', 'never'],
        'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
        'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
        'rest-spread-spacing': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'no-useless-escape': 'off',
        'vue/no-use-v-if-with-v-for': 'off',
        'no-unused-vars': 'off',
        'vue/no-unused-vars': 'off'
    }
};

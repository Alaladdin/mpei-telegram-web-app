module.exports = {
    root: true,
    env : {
        browser: true,
        node   : true,
        es2022 : true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 2022,
    },
    rules: {
        curly                            : ['error', 'multi-or-nest', 'consistent'],
        'object-curly-spacing'           : ['error', 'always'],
        'space-before-function-paren'    : ['error', 'never'],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            { blankLine: 'always', prev: ['if', 'case', 'default'], next: '*' },
            { blankLine: 'always', prev: '*', next: ['if', 'case', 'default'] },
            { blankLine: 'any', prev: ['if', 'case', 'default'], next: ['if', 'case', 'default'] },
        ],
        'max-params'        : ['warn', 4],
        indent              : ['warn', 4],
        semi                : ['error', 'always'],
        'operator-linebreak': [2, 'after', {
            overrides: {
                '>' : 'before',
                '>=': 'before',
                '<' : 'before',
                '<=': 'before',
                '||': 'before',
                '&&': 'before',
                '+' : 'before',
                '-' : 'before',
            },
        }],
        'max-statements': ['warn', 15, { ignoreTopLevelFunctions: true }],
        'key-spacing'   : [1, {
            singleLine: {
                beforeColon: false,
                afterColon : true,
            },
            multiLine: {
                align: 'colon',
            },
        }],
        'comma-dangle': ['error', {
            arrays   : 'always-multiline',
            objects  : 'always-multiline',
            imports  : 'never',
            exports  : 'never',
            functions: 'never',
        }],
        complexity                            : ['warn', 10],
        'no-param-reassign'                   : ['error', { props: false }],
        'prefer-arrow-callback'               : 'warn',
        'no-case-declarations'                : 'error',
        'max-lines-per-function'              : ['error', { max: 25, skipComments: true, skipBlankLines: true }],
        'object-shorthand'                    : ['error', 'always'],
        'arrow-body-style'                    : ['warn', 'as-needed'],
        'newline-per-chained-call'            : ['warn', { ignoreChainWithDepth: 2 }],
        'func-name-matching'                  : ['warn', { considerPropertyDescriptor: true }],
        //------------------------------------------------------------------------------
        // Vue rules
        //------------------------------------------------------------------------------
        'vue/html-indent'                     : ['warn', 4],
        'vue/script-indent'                   : ['warn', 4],
        'vue/attribute-hyphenation'           : ['warn', 'never'],
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'vue/max-len'                         : ['error', {
            code                  : 120,
            template              : 140,
            ignorePattern         : '',
            ignoreComments        : true,
            ignoreTrailingComments: false,
            ignoreUrls            : true,
        }],
        'vue/max-attributes-per-line'      : ['error', { singleline: 2, multiline: 1 }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/newline-after-import'      : ['error', { count: 1 }],
        'import/extensions'                : ['error', 'ignorePackages', {
            vue : 'never',
            ts  : 'never',
            js  : 'never',
            json: 'never',
        }],
        'import/order': ['warn', {
            alphabetize: { order: 'asc' },
            groups     : ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            pathGroups : [
                {
                    pattern       : '*metadata',
                    patternOptions: { matchBase: true, nocase: true },
                    group         : 'index',
                    position      : 'after',
                },
                {
                    pattern       : '**modal',
                    patternOptions: { matchBase: true },
                    group         : 'parent',
                    position      : 'before',
                },
                {
                    pattern : '@helpers/**',
                    group   : 'internal',
                    position: 'after',
                },
                {
                    pattern : '@/mixins/**',
                    group   : 'internal',
                    position: 'after',
                },
                {
                    pattern : '@/components/views/**',
                    group   : 'internal',
                    position: 'after',
                },
                {
                    pattern : '@/**',
                    group   : 'internal',
                    position: 'after',
                },
            ],
        }],
    },
};

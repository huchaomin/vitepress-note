import antfu, { perfectionist as perfectionistWrapperFn } from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import process from 'node:process'

import prettierOptions from './prettier.config.mjs'

// https://perfectionist.dev/guide/getting-started TODO 不知道以后 antfu 会不会默认开启这个配置
const perfectionistConfig = await perfectionistWrapperFn()

export default antfu(
  {
    formatters: {
      // 都默认开启了
      // css: true, // 与 stylelint 一起
      // html: true,
      // markdown: true, // 使用 prettier 格式化 markdown 文件,搭配 DavidAnson.vscode-markdownlint 插件一起使用
      // xml: true, 这一项配置了 vscode 的 eslint 插件会报错, 需要 @prettier/plugin-xml 插件
      prettierOptions, // 配置 prettier 的配置,这里不会读 ignorePath 这个配置,否则 ignorePath 里面配置的文件都不会被 prettier 格式化了
    },
    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    // GLOB_EXCLUDE 已经包括了大部分的忽略文件，遵守 gitignore 规则
    ignores: [
      'src/pages/public/**/*',
      'types/auto-import.d.ts',
      'types/components.d.ts',
      'types/env.d.ts',
      'folder-alias.json',
    ],
    // jsonc: true, // 配合 vscode.json-language-features 一起使用，冲突爆红就放在 .prettierignore 文件中 (默认为true) [jsonc: true 排序， vscode.json-language-features 截断好一点]
    // markdown: true, // 1、 Enable linting for **code snippets** in Markdown. 2. 也会把上面的 formatters.markdown 设置为true 3. 默认为true
    // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
    stylistic: {
      overrides: {
        'style/arrow-parens': ['error', 'always'], // 与 prettier 保持一致
        'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
        'style/indent': ['error', 2],
        'style/indent-binary-ops': 'off', // 与 prettier 保持一致
        'style/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'none',
            },
            multilineDetection: 'brackets',
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ], // 与 prettier 保持一致
        'style/operator-linebreak': [
          'error',
          'after',
          { overrides: { ':': 'before', '?': 'before' } },
        ],
        'style/quote-props': ['error', 'as-needed'], // 与 prettier 保持一致
      },
    },
    typescript: {
      overridesTypeAware: {
        'ts/strict-boolean-expressions': [
          'error',
          {
            allowNullableBoolean: true,
            allowNullableNumber: true,
            allowNullableString: true,
          },
        ],
      },
      tsconfigPath: 'tsconfig.json',
    },
  },
  // https://github.com/prettier/eslint-plugin-prettier
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/promise-function-async': 'off',
      'antfu/consistent-chaining': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'prefer-promise-reject-errors': 'off',
      'prettier/prettier': ['error'],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: ['/^i-/'],
          registeredComponentsOnly: false,
        },
      ], // 组件名必须为PascalCase
      'vue/html-self-closing': [
        'error',
        {
          html: {
            component: 'never',
            normal: 'never',
            void: 'always',
          },
          math: 'always',
          svg: 'always',
        },
      ], // html标签不要自闭合
    },
  },
).override(perfectionistConfig[0].name, perfectionist.configs['recommended-natural'])

import process from 'node:process'
import antfu, { perfectionist as perfectionistWrapperFn } from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import prettierOptions from './prettier.config.mjs'

// https://perfectionist.dev/guide/getting-started TODO 不知道以后 antfu 会不会默认开启这个配置
const perfectionistConfig = await perfectionistWrapperFn()

export default antfu(
  {
    formatters: {
      // 都默认开启了
      // css: true,
      // html: true,
      markdown: true, // 使用 prettier 格式化 markdown 文件,搭配 DavidAnson.vscode-markdownlint 插件一起使用, 需设置为true
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
    // markdown: true, // 1、 Enable linting for **code snippets** in Markdown. 2、md文件的其他地方也会 (默认为true)
    // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
    stylistic: {
      overrides: {
        'style/arrow-parens': ['error', 'always'], // 与 prettier 保持一致
        'style/operator-linebreak': [
          'error',
          'after',
          { overrides: { ':': 'before', '?': 'before' } },
        ],
        'style/quote-props': ['error', 'as-needed'], // 与 prettier 保持一致
      },
    },
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
  },
  // https://github.com/prettier/eslint-plugin-prettier
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'perfectionist/sort-imports': 'off', // 有其他排序插件
      'perfectionist/sort-named-imports': 'off', // 有其他排序插件
      'perfectionist/sort-vue-attributes': 'off', // 有其他排序插件
      'prettier/prettier': ['error'],
    },
  },
).override(perfectionistConfig[0].name, perfectionist.configs['recommended-natural'])

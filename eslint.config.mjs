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
      // markdown: true, // 使用 prettier 格式化 markdown 文件,搭配 DavidAnson.vscode-markdownlint 插件一起使用
      // xml: true, 这一项配置了 vscode 的 eslint 插件会报错, 需要 @prettier/plugin-xml 插件
      prettierOptions,
    },
    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    // GLOB_EXCLUDE 已经包括了大部分的忽略文件，遵守 gitignore 规则
    ignores: [
      'src/pages/public/**/*',
      'types/auto-import.d.ts',
      'types/components.d.ts',
      'types/env.d.ts',
    ],
    // jsonc: true, //  vscode.json-language-features 一起使用，冲突爆红就放在 .prettierignore-for-eslint 文件中
    // markdown: true, // Enable linting for **code snippets** in Markdown. (默认为true)
    // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
    stylistic: {
      overrides: {
        '@stylistic/js/operator-linebreak': [
          'error',
          'after',
          { overrides: { ':': 'before', '?': 'before' } },
        ],
        'style/arrow-parens': ['error', 'always'], // 与 prettier 保持一致
        'style/quote-props': ['error', 'as-needed'], // 与 prettier 保持一致
      },
    },
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    unocss: true,
  },
  // https://github.com/prettier/eslint-plugin-prettier
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'perfectionist/sort-imports': 'off', // 有其他排序插件
      'perfectionist/sort-named-imports': 'off', // 有其他排序插件
      'prettier/prettier': [
        'error',
        {},
        {
          fileInfoOptions: {
            ignorePath: '.prettierignore-for-eslint', // 消除 md 文件 开头的错误警告
          },
        },
      ],
    },
  },
).override(perfectionistConfig[0].name, perfectionist.configs['recommended-natural'])

import process from 'node:process'
import antfu, { perfectionist as perfectionistWrapperFn } from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import prettierOptions from './prettier.config.mjs'

// https://perfectionist.dev/guide/getting-started TODO 不知道以后 antfu 会不会默认开启这个配置
const perfectionistConfig = await perfectionistWrapperFn()

// [eslint-stylistic]https://eslint.style/rules/default/jsx-closing-tag-location
export default antfu(
  {
    formatters: {
      css: true,
      html: true,
      markdown: true,
      // xml: true, 这一项配置了 vscode 的 eslint 插件会报错
      prettierOptions,
    },
    // GLOB_EXCLUDE 已经包括了大部分的忽略文件，遵守 gitignore 规则
    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: ['src/pages/public/**/*'],
    jsonc: false, // 使用 vscode.json-language-features
    // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
    stylistic: {
      overrides: {
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
    },
  },
).override(perfectionistConfig[0].name, perfectionist.configs['recommended-natural'])

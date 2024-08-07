import process from 'node:process'

import antfu from '@antfu/eslint-config'

export default antfu({

  formatters: {
    css: true,
    html: true,
    // xml: true, 这一项配置了 vscode 的 eslint 插件会报错
    markdown: true,
    prettierOptions: {
      bracketSpacing: true, // 在对象前后添加空格-eg: { foo: bar }
      jsxBracketSameLine: true, // 多属性html标签的‘>’折行放置
      jsxSingleQuote: false, // jsx中使用单引号
      semi: false, // 句末使用分号
      singleQuote: true, // 使用单引号
      tabWidth: 2, // 缩进长度
      trailingComma: 'all', // 多行时尽可能打印尾随逗号
      useTabs: false, // 使用空格代替tab缩进
    },
  },
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  unocss: true,
  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  // GLOB_EXCLUDE 已经包括了大部分的忽略文件，遵守 gitignore 规则
  ignores: [
    'src/pages/public/**/*',
  ],
  // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
  // https://eslint.style/rules/default/jsx-closing-tag-location
  stylistic: {
    arrowParens: true,
  },
}, {
  rules: {

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
})

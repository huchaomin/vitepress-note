// [插件集合](https://stylelint.io/awesome-stylelint/)
// [stylelint 内置规则集](https://stylelint.io/user-guide/rules)
// 最新的版本去除了很多配置，比如缩进, 抛弃的规则 可在 @stylistic/stylelint-config(https://github.com/stylelint-stylistic/stylelint-config/blob/main/stylelint.config.js) 中找回

// @ts-check
/** @type {import('stylelint').Config} */
export default {
  extends: [
    '@stylistic/stylelint-config',
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue', // 放最后一个
  ],
  // 格式化 md 文件中的 css 代码
  overrides: [
    {
      customSyntax: 'postcss-markdown',
      files: ['*.md', '**/*.md'],
    },
  ],
  plugins: ['stylelint-use-nesting'],
  // null (to turn the rule off)
  rules: {
    'csstools/use-nesting': [
      'always',
      {
        message: '尽量使用嵌套写法',
      },
    ],
    'selector-class-pattern': [
      '^(el-|([a-z][a-z0-9]*)(_[a-z0-9]+)*)$',
      {
        // disableFix: true, // disable autofix
        message: '自定义 class 名称使用 snake_case',
      },
    ], // TODO 类名命名规则：snake_case
  },
}
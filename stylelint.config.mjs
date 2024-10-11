/** @type {import('stylelint').Config} */
export default {
  cache: true,
  cachelocation: 'build/.cache/stylelint',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue', // 放最后一个
  ],
  // null (to turn the rule off)
  rules: {
    'selector-class-pattern': [
      '^(el-|([a-z][a-z0-9]*)(_[a-z0-9]+)*)$',
      {
        // disableFix: true, // disable autofix
        message: '自定义 class 名称使用 snake_case',
      },
    ], // TODO 类名命名规则：snake_case
  },
}

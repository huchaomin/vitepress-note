// https://prettier.io/docs/en/options
export default {
  arrowParens: 'always', // 单参数箭头函数参数周围使用圆括号-eg: (x) => x
  bracketSameLine: false, // 会把多行的 HTML (包括 HTML、JSX、Vue 和 Angular) 元素的 `>` 放在最后一个属性的末尾，而不是另起一行（自闭合标签不受该选项控制）。
  bracketSpacing: true, // 在对象前后添加空格-eg: { foo: bar }
  disableLanguages: [], // 禁用格式化的语言
  embeddedLanguageFormatting: 'auto', // 控制嵌入的其他语言代码格式化。
  enable: true, // 启用prettier格式化
  enableDebugLogs: true, // 启用调试日志
  endOfLine: 'lf', // 结束行形式
  // prettierPath: '', // 指定prettier的路径
  htmlWhitespaceSensitivity: 'css', // 对HTML全局空白不敏感
  // ignorePath: '.prettierignore', // 忽略格式化的路径 默认为'.prettierignore'
  insertPragma: false, // 在已被preitter格式化的文件顶部加上标注
  jsxSingleQuote: false, // jsx中使用单引号
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100, // 单行长度
  proseWrap: 'preserve', // 不知道怎么翻译
  quoteProps: 'as-needed', // 仅在必需时为对象的key添加引号
  requireConfig: true, // Require a "prettierconfig" to format prettier
  requirePragma: false, // 无需顶部注释即可格式化
  resolveGlobalModules: false, // 不使用全局 prettier 模块
  semi: false, // 句末使用分号
  singleAttributePerLine: false, // 会在 HTML、JSX、Vue 和 Angular 中格式化为每个属性单独占一行。
  singleQuote: true, // 使用单引号
  tabWidth: 2, // 缩进长度
  trailingComma: 'all', // 多行时尽可能打印尾随逗号
  useEditorConfig: true, // 使用配置文件
  useTabs: false, // 使用空格代替tab缩进
  vueIndentScriptAndStyle: false, // 不对vue中的script及style标签缩进
  withNodeModules: false, // 不格式化node_modules中的文件
}

import process from 'node:process'
import antfu from '@antfu/eslint-config'
import prettierOptions from './prettier.config.mjs'

export default antfu({

  formatters: {
    css: true,
    html: true,
    // xml: true, 这一项配置了 vscode 的 eslint 插件会报错
    markdown: true,
    prettierOptions,
  },
  unocss: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  //  ignores: [
  //   '**/fixtures',
  // ],
}, {
  rules: {

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
})

---
uuid         : ec5e604f-4763-4812-88af-69eef3ed5fb4
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2025-05-29 10:45:46
lastEditTime : 2025-05-29 10:46:19
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# create-vue生成的 eslint 配置

## 安装的依赖

```json
{
  "eslint": "^9.21.0",
  "eslint-plugin-vue": "^9.32.0",
  "@vue/eslint-config-prettier": "^10.2.0",
  "@vue/eslint-config-typescript": "^14.4.0"
}
```

### eslint.config.mts

```ts
// import prettierConfig from "@vue/eslint-config-prettier";
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup


/**
 * @description: 查看所有的配置(eslint-plugin-vue: https://eslint.vuejs.org/rules/
 * @description: 查看所有的配置(typescript-eslint): https://typescript-eslint.io/rules/
 */
export default defineConfigWithVueTs(
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    name: 'app/files-to-lint',
  },
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    name: 'app/files-to-ignore',
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.stylisticTypeChecked,
  vueTsConfigs.strictTypeChecked,
  // prettierConfig, // Use Separate Commands for Linting and Formatting
  skipFormatting,
)
```

---
uuid         : 39c9b242-5831-44f3-92fb-fa3b60232552
order        : 1
author       : peter peter@qingcongai.com
date         : 2024-12-09 14:15:22
lastEditTime : 2024-12-18 21:55:53
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# preload字体

## 假设使用了以下字体

```css
@font-face {
  font-family: JetBrainsMonoMedium;
  font-style: normal;
  src: url('../fonts/JetBrainsMono-Medium.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: JetBrainsMonoMedium;
  font-style: italic;
  src: url('../fonts/JetBrainsMono-MediumItalic.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: JetBrainsMonoSemiBold;
  font-style: normal;
  src: url('../fonts/JetBrainsMono-SemiBold.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: JetBrainsMonoSemiBold;
  font-style: italic;
  src: url('../fonts/JetBrainsMono-SemiBoldItalic.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: SmileySans-Oblique;
  font-style: normal;
  src: url('../fonts/SmileySans-Oblique.ttf.woff2') format('woff2');
  font-display: swap;
}
```

## 根据屏幕大小使用不同的字体

```css
:root {
  /* 其他字体 */
  --font-family-others: 'JetBrainsMonoMedium';

  /* 其他字体 粗体 */
  --font-family-semi-bold-others: 'JetBrainsMonoSemiBold';

  /* 中文字体 */
  --font-family-zh: 'SmileySans-Oblique';
  --default-mono-font-family: var(--font-family-semi-bold-others), var(--font-family-zh);
  --default-font-family: var(--default-mono-font-family);

  @media screen and (width <= 480px) {
    /* 小屏幕使用不那么粗的字体 */
    --default-mono-font-family: var(--font-family-others), var(--font-family-zh);
  }
}
```

- `--default-mono-font-family` 和 `--default-font-family` 是 tailwindcss 使用的两种字体
- JetBrainsMono 是一款等宽的英文字体，一般这些字体都不会包含中文字符
- 上面的配置会使所有的英文都使用 JetBrainsMonoSemiBold 字体， 中文使用 SmileySans 字体
- 在小屏幕下，英文使用 JetBrainsMonoMedium (不变粗)字体，中文使用 SmileySans 字体

## 头部预加载字体

```ts
const obj = {
  // 其他 vitepress 配置
  transformHead({ assets }) {
    const smileySansFontFileArr = assets.filter((str: string) =>
      /SmileySans[\w\-.]+\.woff2/.test(str),
    )
    const smileySansLinks: [string, Record<string, string>][] = smileySansFontFileArr.map(
      (href: string) => {
        return [
          'link',
          {
            as: 'font',
            crossorigin: '',
            href,
            rel: 'preload',
            type: 'font/woff2',
          },
        ]
      },
    )
    const JetBrainsMonoFontFileArr = assets.filter((str) =>
      /JetBrainsMono[\w\-.]+\.woff2/.test(str),
    )
    const obj = {
      Medium: 'screen and (max-width: 480px)',
      SemiBold: 'screen and (min-width: 481px)',
    }
    const JetBrainsMonoLinks: [string, Record<string, string>][] = JetBrainsMonoFontFileArr.map(
      (href) => {
        // 这里[\w-]  和 [\w\-] 相同中间的 - 会被转义
        const result = href.match(/JetBrainsMono-(\w+)\.[\w-]+\.woff2/)![1]
        const key = result.endsWith('Italic') ? result.slice(0, -6) : result
        return [
          'link',
          {
            as: 'font',
            crossorigin: '',
            href,
            media: obj[key as keyof typeof obj],
            rel: 'preload',
            type: 'font/woff2',
          },
        ]
      },
    )
    return [...smileySansLinks, ...JetBrainsMonoLinks]
  }
}
```

## 结果

![preload字体](./preload字体_结果.png)

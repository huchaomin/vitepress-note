/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-13 18:04:17
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-19 17:16:46
 * @Description  :
 */
import { parse } from 'node-html-parser'

export default (code: string): string => {
  const root = parse(code)
  const app = root.querySelector('#app')!
  const cssRenderStyle = app.querySelector('css-render-style')
  if (cssRenderStyle) {
    const cssRenderStyleInner = cssRenderStyle.innerHTML
    const head = root.querySelector('head')!
    head.insertAdjacentHTML('beforeend', cssRenderStyleInner)
    cssRenderStyle.remove()
  }
  app.insertAdjacentHTML(
    'afterend',
    `<div id="waiting">
      <style>
        #waiting {
          position: fixed;
          width: 100%;
          height: 100%;
          background: #fff;
          z-index: 999999;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          left: 0;
          transition: opacity 1s ease-in-out;
        }

        #waiting.hide {
          opacity: 0;
        }

        #waiting .loader {
          position: relative;
          box-sizing: border-box;
          display: inline-flex;
          width: 200px;
          height: 140px;
          background: #979794;
          border-radius: 8px;
          perspective: 1000px;

          &::before {
            position: absolute;
            inset: 10px;
            content: "";
            background: #f5f5f5  no-repeat;
            background-image:
              linear-gradient(#ddd 100px, transparent 0),
              linear-gradient(#ddd 100px, transparent 0),
              linear-gradient(#ddd 100px, transparent 0),
              linear-gradient(#ddd 100px, transparent 0),
              linear-gradient(#ddd 100px, transparent 0),
              linear-gradient(#ddd 100px, transparent 0);
            background-position:
              15px 30px,
              15px 60px,
              15px 90px,
              105px 30px,
              105px 60px,
              105px 90px;
            background-size: 60px 10px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgb(0 0 0 / 25%);
          }

          &::after {
            position: absolute;
            top: 10px;
            right: 10px;
            bottom: 10px;
            width: calc(50% - 10px);
            content: "";
            background: #fff no-repeat;
            background-image:
              linear-gradient(#ddd 100px, transparent 0),
              linear-gradient(#ddd 100px, transparent 0),
              linear-gradient(#ddd 100px, transparent 0);
            background-position: 50% 30px, 50% 60px, 50%  90px;
            background-size: 60px 10px;
            border-radius: 8px;
            transform: rotateY(0deg);
            transform-origin: left center;
            animation: paging 1s linear infinite;
          }
        }

        @keyframes paging {
          to {
            transform: rotateY(-180deg);
          }
        }
      </style>
      <div class="loader"></div>
    </div>`,
  )
  return root.outerHTML
}

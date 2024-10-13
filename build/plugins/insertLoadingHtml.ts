/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-13 18:04:17
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-14 00:01:28
 * @Description  :
 */
import { parse } from 'node-html-parser'

export default (code: string): string => {
  const root = parse(code)
  const app = root.querySelector('#app')!
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
        }

        .waiting_logo {
          width: 180px;
          transform: scale(0.91);
          transform-origin: center center;
          animation: 3s linear 0s infinite normal forwards running breath;
        }

        @keyframes breath {
          0% {
            animation-timing-function: cubic-bezier(0.9647, 0.2413, -0.0705, 0.7911);
            transform: scale(0.9);
          }

          51% {
            animation-timing-function: cubic-bezier(0.9226, 0.2631, -0.0308, 0.7628);
            transform: scale(1.02994);
          }

          100% {
            transform: scale(0.9);
          }
        }
      </style>
      <img
        class="waiting_logo"
        src="../src/assets/images/logo.svg"
        alt="waiting_logo"
        importance="high"
      />
    </div>`,
  )
  return root.outerHTML
}

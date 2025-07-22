// .vitepress/config.ts
import { withPwa } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/@vite-pwa+vitepress@0.5.3_v_d7a7662fb8c86bf303875ce5759fe45c/node_modules/@vite-pwa/vitepress/dist/index.mjs";
import { defineConfig, normalizePath as normalizePath3 } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/vite@5.4.14_@types+node@22._bec43ee35cedab7b7ef6a02b415832b2/node_modules/vite/dist/node/index.js";
import viteCompression from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/vite-plugin-compression@0.5_44ea3e188e6b7ee7f8eb0fc8536c3a55/node_modules/vite-plugin-compression/dist/index.mjs";

// build/plugins/generateSidebar.ts
import dayjs from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js";
import utc from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/plugin/utc.js";
import matter from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import fs from "node:fs";
import path2 from "node:path";
import { v4 as uuidv4 } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/uuid@11.0.5/node_modules/uuid/dist/esm/index.js";
import { generateSidebar } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/vitepress-sidebar@1.30.2/node_modules/vitepress-sidebar/dist/index.js";

// build/utils/index.ts
import path from "node:path";
import process from "node:process";
import { loadEnv, normalizePath } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/vite@5.4.14_@types+node@22._bec43ee35cedab7b7ef6a02b415832b2/node_modules/vite/dist/node/index.js";
import { parseLoadedEnv } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/vite-plugin-env-parse@1.0.1_75fb7d78ed16cc08df61b2db5ff78406/node_modules/vite-plugin-env-parse/dist/index.js";
function resolveCwd(p) {
  return path.resolve(process.cwd(), p);
}
var envDir = resolveCwd("build/env");
var mdPageDir = "src/pages";
function extractKeywordsFromPath(path4) {
  if (path4.endsWith("/index.md")) {
    path4 = path4.replace("/index.md", "");
  }
  if (path4.endsWith(".md")) {
    path4 = path4.replace(".md", "");
  }
  return path4.split("/").reverse().join(" ");
}
function extractLang(info) {
  return info.trim().replace(/=\d*/, "").replace(/:(?:no-)?line-numbers(?:[{ ]|$|=).*/, "").replace(/(?:-vue|\{| ).*$/, "").replace(/^vue-html$/, "template").replace(/^ansi$/, "");
}
function extractTitle(info, html = false) {
  if (html) {
    return info.replace(/<!--[\s\S]*?-->/g, "").match(/data-title="(.*?)"/)?.[1] || "";
  }
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || "txt";
}
function getEnv(mode) {
  return parseLoadedEnv(loadEnv(mode, envDir));
}
function normalizeJoinPath(...paths) {
  return normalizePath(path.join(...paths));
}

// build/plugins/sidebarFolderOrder.json
var sidebarFolderOrder_default = {
  "/css/@rules": 2,
  "/javascript/Array": 0,
  "/javascript/BOM": 1,
  "/javascript/DOM": 2,
  "/javascript/es6": 3,
  "/javascript/\u8FD0\u7B97\u7B26": 4,
  "/tools/github": 3,
  "/tools/vitepress": 4,
  "/\u5FAE\u4FE1/\u516C\u4F17\u53F7": 0,
  "/\u6846\u67B6/vue3": 0,
  "/\u811A\u624B\u67B6/eslint": 0,
  "/\u811A\u624B\u67B6/vite": 1,
  "/html": 0,
  "/css": 1,
  "/javascript": 2,
  "/typescript": 3,
  "/tools": 4,
  "/utils": 5,
  "/\u5FAE\u4FE1": 6,
  "/\u6742\u8C08": 7,
  "/\u6846\u67B6": 8,
  "/\u811A\u624B\u67B6": 9,
  "/\u751F\u6D3B": 10
};

// build/plugins/generateSidebar.ts
dayjs.extend(utc);
function padStringToLength(str, length) {
  return str.padEnd(length, " ");
}
var sidebar = generateSidebar({
  debugPrint: false,
  documentRootPath: mdPageDir,
  excludeFilesByFrontmatterFieldName: "exclude",
  // excludePattern: ['index/index.md'], // 排除的文件
  sortFolderTo: "top",
  sortMenusByFrontmatterOrder: true,
  useFolderLinkFromIndexFile: true,
  useFolderTitleFromIndexFile: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true
}).filter((item) => item.link !== "/index/index.md");
function createOrderFrontmatter(p, order) {
  const { content, data } = matter.read(p);
  if (Object.keys(data).length !== 0) {
    if (data.order === order && data.uuid !== void 0) {
      return;
    }
    data.order = order;
    data.uuid = data.uuid ?? uuidv4();
    let str = "---\n";
    const arr = ["uuid", "order", "author", "date", "lastEditTime", "lastEditors", "description"];
    const keys = Object.keys(data).sort((a, b) => {
      return arr.indexOf(a) - arr.indexOf(b);
    });
    for (const key of keys) {
      let value = data[key] ?? "";
      if (["date", "lastEditTime"].includes(key)) {
        value = dayjs.utc(value).format("YYYY-MM-DD HH:mm:ss");
      }
      str += `${padStringToLength(key, 13)}:${value === "" ? "" : ` ${value}`}
`;
    }
    str += "---\n";
    str += content;
    fs.writeFile(p, str, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log(`File ${p} updated successfully.`);
    });
  }
}
var copySidebarFolderOrder = {};
function generate() {
  const result = handleLink(sidebar, "");
  const jsonString = JSON.stringify(copySidebarFolderOrder, null, 2);
  fs.writeFile(
    resolveCwd("build/plugins/sidebarFolderOrder.json"),
    `${jsonString}
`,
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log("File sidebarFolderOrder.json updated successfully.");
    }
  );
  return result;
}
function handleLink(arr, p) {
  const folderOrderArr = [];
  const result = arr.map((item, index) => {
    if (item.items !== void 0) {
      const folderKey = `${p}/${item.text}`;
      item._folderKey = folderKey;
      item.items = handleLink(item.items, folderKey);
      const order = sidebarFolderOrder_default[folderKey] ?? index;
      item.order = order;
      folderOrderArr.push(order);
    }
    folderOrderArr.sort((a, b) => a - b);
    if (item.link !== void 0) {
      let fileIndex = index - folderOrderArr.length;
      while (folderOrderArr.find((v) => v <= fileIndex) !== void 0) {
        folderOrderArr.shift();
        fileIndex++;
      }
      createOrderFrontmatter(transformItemLinkToPath(item.link), fileIndex);
      item.order = fileIndex;
      item.link = item.link.replace("index.md", "");
    }
    return item;
  }).sort((a, b) => a.order - b.order);
  result.forEach((item, index) => {
    if (item._folderKey) {
      copySidebarFolderOrder[item._folderKey] = index;
    }
  });
  return result;
}
function transformItemLinkToPath(link) {
  const str = link.endsWith(".md") ? link : `${link}.md`;
  return resolveCwd(path2.join(mdPageDir, str));
}
var generateSidebar_default = generate();

// build/plugins/md/blockquote.ts
var blockquote_default = (md) => {
  md.renderer.rules.blockquote_open = () => {
    return `<n-blockquote>`;
  };
  md.renderer.rules.blockquote_close = () => {
    return "</n-blockquote>";
  };
};

// build/plugins/md/codeInline.ts
import { parse } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/node-html-parser@7.0.1/node_modules/node-html-parser/dist/index.js";
var codeInline_default = (md) => {
  const defaultRender = md.renderer.rules.code_inline;
  md.renderer.rules.code_inline = (...arg) => {
    const result = defaultRender(...arg);
    const root = parse(result);
    return `
      <n-text code>
        ${root.innerHTML}
      </n-text>`;
  };
};

// build/plugins/md/container_code_group.ts
var container_code_group_default = (md) => {
  md.renderer.rules["container_code-group_open"] = (tokens, idx) => {
    const closeTokenIndex = tokens.findIndex((token, index) => {
      return index > idx && token.type === "container_code-group_close";
    });
    const childTokens = tokens.slice(idx + 1, closeTokenIndex).filter((t) => t.level === tokens[idx].level + 1);
    childTokens.forEach((t) => {
      const isHtml = t.type === "html_block";
      const title = extractTitle(isHtml ? t.content : t.info, isHtml);
      t.attrSet("tabName", title);
    });
    return `<n-card
      :class="isMobile ? '-mx-3 !w-auto' : ''"
      class="code_group_card"
      embedded
      :bordered="false"
      content-class="!p-0"
    >
      <n-tabs type="line" animated>
    `;
  };
  md.renderer.rules["container_code-group_close"] = () => {
    return `</n-tabs>
      </n-card>`;
  };
};

// build/plugins/md/container_detail.ts
var container_detail_default = (md) => {
  md.renderer.rules.container_details_open = (tokens, idx, options) => {
    const { info } = tokens[idx];
    const title = (
      // @ts-expect-error 类型错误
      // eslint-disable-next-line ts/no-unsafe-member-access
      info.trim().slice("details".length).trim() || options.container.detailsLabel
    );
    return `<n-card
      class="details_container_card"
      embedded
      :bordered="false"
      content-style="padding: 13px"
    >
        <n-collapse>
          <n-collapse-item title="${title}" name="1">`;
  };
  md.renderer.rules.container_details_close = () => {
    return `</n-collapse-item>
      </n-collapse></n-card>`;
  };
};

// build/plugins/md/container_others.ts
var typeArr = [
  {
    alertType: "success",
    type: "tip"
  },
  {
    alertType: "info",
    type: "info"
  },
  {
    alertType: "warning",
    type: "warning"
  },
  {
    alertType: "error",
    type: "danger"
  }
];
var container_others_default = (md) => {
  typeArr.forEach((obj) => {
    md.renderer.rules[`container_${obj.type}_open`] = (tokens, idx, options) => {
      const { info } = tokens[idx];
      const title = (
        // @ts-expect-error 类型错误
        // eslint-disable-next-line ts/no-unsafe-member-access
        info.trim().slice(obj.type.length).trim() || options.container[`${obj.type}Label`]
      );
      return `<n-alert :bordered="false" title="${title}" type="${obj.alertType}">`;
    };
    md.renderer.rules[`container_${obj.type}_close`] = () => {
      return `</n-alert>`;
    };
  });
};

// build/plugins/md/demo.ts
import { parse as parse2 } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/node-html-parser@7.0.1/node_modules/node-html-parser/dist/index.js";
var demo_default = (md) => {
  const render = md.render.bind(md);
  md.render = (...args) => {
    const result = render(...args);
    const root = parse2(result);
    const demoArr = root.getElementsByTagName("Demo");
    if (demoArr.length === 0) {
      return result;
    }
    const scriptObj = args[1].sfcBlocks.scripts[0] ?? {
      content: `<script setup lang="ts"></script>`,
      contentStripped: "",
      tagClose: "</script>",
      tagOpen: '<script setup lang="ts">',
      type: "script"
    };
    const importStr = scriptObj.contentStripped.includes("defineClientComponent") ? "" : "import { defineClientComponent } from 'vitepress'";
    const statementArr = [];
    demoArr.forEach((demo, index) => {
      const compoName = `Demo${index}`;
      const compoSrc = demo.getAttribute("src");
      statementArr.push(
        `const ${compoName} = defineClientComponent(() => {
          return import('${compoSrc}')
        })`
      );
      demo.tagName = compoName;
      demo.removeAttribute("src");
      demo.replaceWith(`<DemoWrapper>
          <template #source>
            ${md.render(`<<< ${compoSrc}
`, args[1])}
          </template>
          <template #default>
            ${demo.outerHTML}
          </template>
        </DemoWrapper>`);
    });
    const statementStr = statementArr.join("\n");
    scriptObj.contentStripped = `${importStr}
${scriptObj.contentStripped}
${statementStr}`;
    scriptObj.content = `${scriptObj.tagOpen}
${scriptObj.contentStripped}
${scriptObj.tagClose}`;
    args[1].sfcBlocks.scripts[0] = scriptObj;
    return root.outerHTML;
  };
};

// build/plugins/md/fence.ts
import { parse as parse3 } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/node-html-parser@7.0.1/node_modules/node-html-parser/dist/index.js";
var fence_default = (md) => {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (...arg) => {
    const result = defaultRender(...arg);
    const root = parse3(result).clone();
    root.querySelector("button.copy")?.remove();
    root.classList.remove("vp-adaptive-theme");
    const [tokens, idx] = arg;
    const token = tokens[idx];
    const tabName = token.attrGet("tabName");
    token.attrSet("tabName", "");
    let prev = "";
    let post = "";
    if (tabName) {
      prev = `<n-tab-pane name="${tabName}" tab="${tabName}">`;
      post = "</n-tab-pane>";
    }
    return `${prev}<FenceWrapper content="${md.utils.escapeHtml(tokens[idx].content).replace(/\/\/ \[!code .*\]/g, "").trim()}">${root.outerHTML}</FenceWrapper>${post}`;
  };
};

// build/plugins/md/heading.ts
var heading_default = (md) => {
  const defaultRender = md.renderer.rules.heading_open;
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const str = defaultRender ? defaultRender(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options);
    const { tag } = tokens[idx];
    const divider = `<n-divider
      style="margin-bottom: 0 !important;"
      :class="isMobile ? '-mx-3' : '-ml-8 -mr-3'"
      :style="{
        width: isMobile ? 'calc(100% + var(--spacing-6))' : 'calc(100% + var(--spacing-12))',
      }"
    >
    </n-divider>`;
    return str.replace(">", "><n-text>").replace("<h", `${tag === "h2" ? divider : ""}<n-h`);
  };
  md.renderer.rules.heading_close = (tokens, idx) => {
    const { tag } = tokens[idx];
    return `</n-text></n-${tag}>`;
  };
};

// build/plugins/md/html_block.ts
var html_block_default = (md) => {
  const defaultRender = md.renderer.rules.html_block;
  md.renderer.rules.html_block = (...arg) => {
    const [tokens, idx] = arg;
    const token = tokens[idx];
    const tabName = token.attrGet("tabName");
    token.attrSet("tabName", "");
    let prev = "";
    let post = "";
    if (tabName) {
      prev = `<n-tab-pane name="${tabName}" tab="${tabName}">`;
      post = "</n-tab-pane>";
    }
    return `${prev}${defaultRender(...arg)}${post}`;
  };
};

// build/plugins/md/image.ts
import path3 from "node:path";
import { normalizePath as normalizePath2 } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/vite@5.4.14_@types+node@22._bec43ee35cedab7b7ef6a02b415832b2/node_modules/vite/dist/node/index.js";
var image_default = (md) => {
  md.renderer.rules.image = (...arg) => {
    const src = arg[0][arg[1]].attrGet("src");
    let str = "";
    if (src.startsWith("img/")) {
      str = src;
    } else {
      const relativePath = arg[3].relativePath;
      str = normalizePath2(path3.join(path3.dirname(relativePath), src));
    }
    return `<ImgWrapper src=${str}></ImgWrapper>`;
  };
};

// build/plugins/md/link.ts
var link_default = (md) => {
  const defaultRender = md.renderer.rules.link_open;
  md.renderer.rules.link_open = (...arg) => {
    return `${defaultRender(...arg).replace("<a", "<n-a")}<n-gradient-text type="primary">`;
  };
  md.renderer.rules.link_close = () => {
    return `</n-gradient-text></n-a>`;
  };
};

// build/plugins/md/list.ts
var list_default = (md) => {
  ;
  ["ordered_list_open", "bullet_list_open"].forEach((rule) => {
    md.renderer.rules[rule] = (...arg) => {
      const [tokens, idx] = arg;
      const token = tokens[idx];
      const { tag } = token;
      return `<n-${tag}>`;
    };
  });
  ["ordered_list_close", "bullet_list_close"].forEach((rule) => {
    md.renderer.rules[rule] = (...arg) => {
      const [tokens, idx] = arg;
      const token = tokens[idx];
      const { tag } = token;
      return `</n-${tag}>`;
    };
  });
  md.renderer.rules.list_item_open = () => {
    return "<n-li>";
  };
  md.renderer.rules.list_item_close = () => {
    return "</n-li>";
  };
};

// build/plugins/md/paragraph.ts
var paragraph_default = (md) => {
  md.renderer.rules.paragraph_open = () => {
    return `<n-p>`;
  };
  md.renderer.rules.paragraph_close = () => {
    return `</n-p>`;
  };
};

// build/plugins/md/table.ts
var table_default = (md) => {
  md.renderer.rules.table_open = (tokens, idx) => {
    const { tag } = tokens[idx];
    return `<n-${tag} striped :single-line="false">`;
  };
  md.renderer.rules.table_close = (tokens, idx) => {
    const { tag } = tokens[idx];
    return `</n-${tag}>`;
  };
};

// build/plugins/md/index.ts
var md_default = (md) => {
  md.use(heading_default);
  md.use(paragraph_default);
  md.use(table_default);
  md.use(link_default);
  md.use(codeInline_default);
  md.use(fence_default);
  md.use(blockquote_default);
  md.use(container_detail_default);
  md.use(container_others_default);
  md.use(container_code_group_default);
  md.use(html_block_default);
  md.use(list_default);
  md.use(image_default);
  md.use(demo_default);
};

// build/plugins/postHandleHtml.ts
import { parse as parse4 } from "file:///E:/code/qc-pn-vue/node_modules/.pnpm/node-html-parser@7.0.1/node_modules/node-html-parser/dist/index.js";
var postHandleHtml_default = (code) => {
  const root = parse4(code);
  const app = root.querySelector("#app");
  const cssRenderStyle = app.querySelector("css-render-style");
  if (cssRenderStyle) {
    const cssRenderStyleInner = cssRenderStyle.innerHTML;
    const head2 = root.querySelector("head");
    head2.insertAdjacentHTML("beforeend", cssRenderStyleInner);
    cssRenderStyle.remove();
  }
  const head = root.querySelector("head");
  head.insertAdjacentHTML(
    "beforeend",
    `<script>
      var _hmt = _hmt || [];
      _hmt.push(['_setAutoPageview', false]);
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ed1ab63bfd0067ce75ba91ad9b7b4d37";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    </script>`
  );
  app.insertAdjacentHTML(
    "afterend",
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
    </div>`
  );
  return root.outerHTML;
};

// package.json
var package_default = {
  name: "note",
  type: "module",
  version: "1.0.0",
  description: "\u6728\u6797\u5B50\u7684\u7B14\u8BB0-\u8BB0\u4F4F\u81EA\u5DF1\u7684\u70B9\u6EF4",
  productName: "vite",
  engines: {
    node: "^20.9.0 || >=21.1.0",
    pnpm: ">= 9.1.4"
  },
  scripts: {
    dev: "vitepress dev",
    build: "vitepress build",
    preview: "vitepress preview",
    preinstall: "npx only-allow pnpm",
    inspectEslintConfig: "npx @eslint/config-inspector",
    inspectBuildMode: "npx serve ./build/.cache/inspect/client"
  },
  dependencies: {
    "@formkit/auto-animate": "^0.8.2",
    "@giscus/vue": "^3.1.1",
    "@lottiefiles/dotlottie-vue": "^0.5.4",
    "@vueuse/core": "^12.4.0",
    "@vueuse/integrations": "^12.4.0",
    alova: "^3.2.8",
    artplayer: "^5.2.1",
    "d3-geo": "^3.1.1",
    dayjs: "^1.11.13",
    echarts: "^5.6.0",
    gsap: "^3.12.7",
    hamburgers: "^1.2.1",
    "lodash-es": "^4.17.21",
    "naive-ui": "^2.41.0",
    pinia: "^2.3.0",
    "pinia-plugin-persistedstate": "^4.2.0",
    three: "^0.172.0",
    "three.interactive": "^1.8.0",
    "universal-cookie": "^7.2.2",
    "vue-echarts": "^7.0.3"
  },
  devDependencies: {
    "@antfu/eslint-config": "^3.14.0",
    "@css-render/vue3-ssr": "^0.15.14",
    "@iconify-json/carbon": "^1.2.5",
    "@iconify-json/line-md": "^1.2.5",
    "@iconify-json/material-symbols": "^1.2.12",
    "@stylistic/stylelint-config": "^2.0.0",
    "@tailwindcss/vite": "4.0.0-beta.9",
    "@tsconfig/node-lts": "^22.0.1",
    "@types/d3-geo": "^3.1.0",
    "@types/lodash-es": "^4.17.12",
    "@types/node": "^22.10.7",
    "@types/three": "^0.172.0",
    "@vite-pwa/vitepress": "^0.5.3",
    "@vue/tsconfig": "^0.7.0",
    browserslist: "^4.24.4",
    eslint: "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-format": "^1.0.1",
    "eslint-plugin-perfectionist": "^4.6.0",
    "eslint-plugin-prettier": "^5.2.2",
    "markdown-it-anchor": "^9.2.0",
    "node-html-parser": "^7.0.1",
    "only-allow": "^1.2.1",
    "postcss-html": "^1.8.0",
    "postcss-markdown": "^1.3.0",
    prettier: "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.10",
    "rollup-plugin-visualizer": "^5.14.0",
    serve: "^14.2.4",
    stylelint: "^16.13.2",
    "stylelint-config-recess-order": "^5.1.1",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^37.0.0",
    "stylelint-use-nesting": "^6.0.0",
    tailwindcss: "4.0.0-beta.9",
    typescript: "^5.7.3",
    "unplugin-auto-import": "^19.0.0",
    "unplugin-icons": "^22.0.0",
    "unplugin-vue-components": "^28.0.0",
    uuid: "^11.0.5",
    "vite-plugin-alias-import-checker": "^0.1.0",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-env-parse": "^1.0.15",
    "vite-plugin-font": "^4.0.0",
    "vite-plugin-inspect": "^0.8.9",
    vitepress: "^1.6.3",
    "vitepress-sidebar": "^1.30.2",
    "workbox-window": "^7.3.0"
  },
  pnpm: {
    peerDependencyRules: {
      ignoreMissing: [
        "react",
        "react-dom"
      ]
    }
  }
};

// .vitepress/config.ts
var config_default = withPwa(
  defineConfig(({ mode }) => {
    const env = getEnv(mode);
    const { VITE_BASE_URL } = env;
    const obj = {
      base: VITE_BASE_URL,
      // 终以斜杠开头和结尾(没有结尾vite会自动处理)
      async buildEnd(siteConfig) {
        const { outDir } = siteConfig.userConfig;
        const obj2 = viteCompression({
          filter: (file) => {
            const normalizePathFile = normalizePath3(file);
            const defaultReg = /\.(?:js|mjs|json|css|html)$/i;
            const excludeFiles = ["manifest.json"];
            return defaultReg.test(normalizePathFile) && !excludeFiles.some((item) => normalizePathFile.includes(item));
          },
          verbose: false
        });
        obj2.configResolved({
          build: {
            outDir
          }
        });
        await obj2.closeBundle();
      },
      // srcExclude
      cacheDir: resolveCwd("build/.cache/vitepress"),
      cleanUrls: true,
      // TODO 查看托管平添是否支持
      contentProps: {
        // VPDoc class 获取h标题时使用/爬虫时的配置使用
        class: "VPDoc"
      },
      description: package_default.description,
      head: [["link", { href: normalizeJoinPath(VITE_BASE_URL, "favicon.ico"), rel: "icon" }]],
      lang: "zh-Hans",
      markdown: {
        // markdown-it-anchor 的选项 这里只需提供一个id其他的，下面config里面自定义
        // https://github.com/valeriangalliat/markdown-it-anchor#usage
        anchor: {
          permalink: void 0,
          tabIndex: false
        },
        // @mdit-vue/plugin-toc 的选项
        // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
        // toc: { level: [1, 2] },
        config: (md) => {
          md.use(md_default);
        },
        container: {
          dangerLabel: "\u5371\u9669",
          detailsLabel: "\u8BE6\u7EC6\u4FE1\u606F",
          infoLabel: "\u4FE1\u606F",
          tipLabel: "\u63D0\u793A",
          warningLabel: "\u8B66\u544A"
        },
        lineNumbers: true,
        theme: { dark: "github-dark", light: "github-light" }
      },
      metaChunk: true,
      outDir: resolveCwd("docs"),
      // 不能放到 vite.config.ts 里面，否则会报错
      pwa: {
        // https://vite-pwa-org-zh.netlify.app/frameworks/vitepress.html
        experimental: {
          includeAllowlist: true
          // TODO
        },
        manifest: {
          display: "standalone",
          // 独立应用模式
          icons: [
            {
              sizes: "192x192",
              src: "logo.png",
              type: "image/png"
            },
            {
              sizes: "512x512",
              src: "logo.png",
              type: "image/png"
            },
            {
              purpose: "any maskable",
              sizes: "512x512",
              src: "logo.png",
              type: "image/png"
            }
          ],
          name: "VitePress PWA",
          orientation: "portrait",
          // 竖屏模式
          short_name: "VitePressPWA",
          theme_color: "#ffffff"
        },
        outDir: resolveCwd("docs"),
        srcDir: resolveCwd(`${mdPageDir}/public`),
        workbox: {
          globPatterns: ["**/*.{css,js,html,svg,png,jpg,gif,ico,txt,woff2,gz,xml,json}"],
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024
          // 3MB
        }
      },
      rewrites: {
        "index/index.md": "index.md"
      },
      sitemap: {
        hostname: "https://mulinzi.cn/"
      },
      srcDir: resolveCwd(mdPageDir),
      // https://vitepress.dev/reference/default-theme-config
      themeConfig: {
        // 右边的导航栏
        outline: {
          level: [2, 3]
        },
        search: {
          options: {
            apiKey: "1b6e75dc35a57ba306ecd953d4ed8172",
            appId: "ZHEDSTO6YB",
            indexName: "mulinzi_note",
            locales: {
              zh: {
                placeholder: "\u641C\u7D22\u6587\u6863",
                translations: {
                  button: {
                    buttonAriaLabel: "\u641C\u7D22\u6587\u6863",
                    buttonText: "\u641C\u7D22\u6587\u6863"
                  },
                  modal: {
                    errorScreen: {
                      helpText: "\u4F60\u53EF\u80FD\u9700\u8981\u68C0\u67E5\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5",
                      titleText: "\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C"
                    },
                    footer: {
                      closeText: "\u5173\u95ED",
                      navigateText: "\u5207\u6362",
                      searchByText: "\u641C\u7D22\u63D0\u4F9B\u8005",
                      selectText: "\u9009\u62E9"
                    },
                    noResultsScreen: {
                      noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                      reportMissingResultsLinkText: "\u70B9\u51FB\u53CD\u9988",
                      reportMissingResultsText: "\u4F60\u8BA4\u4E3A\u8BE5\u67E5\u8BE2\u5E94\u8BE5\u6709\u7ED3\u679C\uFF1F",
                      suggestedQueryText: "\u4F60\u53EF\u4EE5\u5C1D\u8BD5\u67E5\u8BE2"
                    },
                    searchBox: {
                      cancelButtonAriaLabel: "\u53D6\u6D88",
                      cancelButtonText: "\u53D6\u6D88",
                      resetButtonAriaLabel: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                      resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6"
                    },
                    startScreen: {
                      favoriteSearchesTitle: "\u6536\u85CF",
                      noRecentSearchesText: "\u6CA1\u6709\u641C\u7D22\u5386\u53F2",
                      recentSearchesTitle: "\u641C\u7D22\u5386\u53F2",
                      removeFavoriteSearchButtonTitle: "\u4ECE\u6536\u85CF\u4E2D\u79FB\u9664",
                      removeRecentSearchButtonTitle: "\u4ECE\u641C\u7D22\u5386\u53F2\u4E2D\u79FB\u9664",
                      saveRecentSearchButtonTitle: "\u4FDD\u5B58\u81F3\u641C\u7D22\u5386\u53F2"
                    }
                  }
                }
              }
            },
            searchParameters: {
              attributesToRetrieve: [
                "hierarchy.lvl0",
                "hierarchy.lvl1",
                "hierarchy.lvl2",
                "hierarchy.lvl3",
                "hierarchy.lvl4",
                "hierarchy.lvl5",
                "hierarchy.lvl6",
                "content",
                "type",
                "lvl0Text",
                "url"
              ],
              attributesToSnippet: ["*:21"]
            }
          },
          provider: "algolia"
        },
        sidebar: generateSidebar_default
      },
      title: package_default.productName,
      // 没有 titleTemplate 它将用作所有单独页面标题的默认后缀
      titleTemplate: false,
      // 去掉标题里面的 ’| vite‘
      // transformPageData(dev/prod) -> transformHead(prod) -> transformHtml(prod)
      transformHead({ pageData }) {
        const { filePath, frontmatter } = pageData;
        const keywords = extractKeywordsFromPath(filePath);
        const headArr = frontmatter.head ?? [];
        const arr = [
          [
            "meta",
            {
              content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no",
              name: "viewport"
            }
          ]
        ];
        if (headArr.find((h) => h[0] === "meta" && h[1].name === "keywords") === void 0) {
          arr.push(["meta", { content: keywords, name: "keywords" }]);
        }
        return arr;
      },
      transformHtml(code) {
        return postHandleHtml_default(code);
      },
      transformPageData(pageData, { siteConfig }) {
        const keywords = extractKeywordsFromPath(pageData.filePath);
        if (pageData.description === null) {
          pageData.description = `${keywords} web \u524D\u7AEF ${siteConfig.site.description}`;
        }
      },
      vite: {
        configFile: resolveCwd("build/vite.config.ts")
      }
    };
    return obj;
  })
);
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9nZW5lcmF0ZVNpZGViYXIudHMiLCAiYnVpbGQvdXRpbHMvaW5kZXgudHMiLCAiYnVpbGQvcGx1Z2lucy9zaWRlYmFyRm9sZGVyT3JkZXIuanNvbiIsICJidWlsZC9wbHVnaW5zL21kL2Jsb2NrcXVvdGUudHMiLCAiYnVpbGQvcGx1Z2lucy9tZC9jb2RlSW5saW5lLnRzIiwgImJ1aWxkL3BsdWdpbnMvbWQvY29udGFpbmVyX2NvZGVfZ3JvdXAudHMiLCAiYnVpbGQvcGx1Z2lucy9tZC9jb250YWluZXJfZGV0YWlsLnRzIiwgImJ1aWxkL3BsdWdpbnMvbWQvY29udGFpbmVyX290aGVycy50cyIsICJidWlsZC9wbHVnaW5zL21kL2RlbW8udHMiLCAiYnVpbGQvcGx1Z2lucy9tZC9mZW5jZS50cyIsICJidWlsZC9wbHVnaW5zL21kL2hlYWRpbmcudHMiLCAiYnVpbGQvcGx1Z2lucy9tZC9odG1sX2Jsb2NrLnRzIiwgImJ1aWxkL3BsdWdpbnMvbWQvaW1hZ2UudHMiLCAiYnVpbGQvcGx1Z2lucy9tZC9saW5rLnRzIiwgImJ1aWxkL3BsdWdpbnMvbWQvbGlzdC50cyIsICJidWlsZC9wbHVnaW5zL21kL3BhcmFncmFwaC50cyIsICJidWlsZC9wbHVnaW5zL21kL3RhYmxlLnRzIiwgImJ1aWxkL3BsdWdpbnMvbWQvaW5kZXgudHMiLCAiYnVpbGQvcGx1Z2lucy9wb3N0SGFuZGxlSHRtbC50cyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFwudml0ZXByZXNzXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9xYy1wbi12dWUvLnZpdGVwcmVzcy9jb25maWcudHNcIjsvKlxuICogQEF1dGhvciAgICAgICA6IHBldGVyXG4gKiBARGF0ZSAgICAgICAgIDogMjAyNC0xMC0zMCAyMzowMTozN1xuICogQExhc3RFZGl0b3JzICA6IGh1Y2hhb21pbiBpaXNhX3BldGVyQDE2My5jb21cbiAqIEBMYXN0RWRpdFRpbWUgOiAyMDI1LTAxLTI1IDE3OjU1OjEwXG4gKiBARGVzY3JpcHRpb24gIDpcbiAqL1xuaW1wb3J0IHR5cGUgeyBkZWZpbmVDb25maWcgYXMgZGVmaW5lVml0ZXByZXNzQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuXG5pbXBvcnQgeyB3aXRoUHdhIH0gZnJvbSAnQHZpdGUtcHdhL3ZpdGVwcmVzcydcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbm9ybWFsaXplUGF0aCB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuXG5pbXBvcnQgc2lkZWJhciBmcm9tICcuLi9idWlsZC9wbHVnaW5zL2dlbmVyYXRlU2lkZWJhci50cydcbmltcG9ydCBtZFBsdWdpbiBmcm9tICcuLi9idWlsZC9wbHVnaW5zL21kL2luZGV4LnRzJ1xuaW1wb3J0IHBvc3RIYW5kbGVIdG1sIGZyb20gJy4uL2J1aWxkL3BsdWdpbnMvcG9zdEhhbmRsZUh0bWwudHMnXG5pbXBvcnQge1xuICBleHRyYWN0S2V5d29yZHNGcm9tUGF0aCxcbiAgZ2V0RW52LFxuICBtZFBhZ2VEaXIsXG4gIG5vcm1hbGl6ZUpvaW5QYXRoLFxuICByZXNvbHZlQ3dkLFxufSBmcm9tICcuLi9idWlsZC91dGlscy9pbmRleC50cydcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuLi9wYWNrYWdlLmpzb24nIGFzc2VydCB7IHR5cGU6ICdqc29uJyB9XG5cbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWcgXHU4RkQ5XHU5MUNDXHU5NzYyXHU1QjlBXHU0RTQ5XHU0RTg2XHU3Njg0XHVGRjBDIHZpdGUuY29uZmlnLnRzIFx1OTFDQ1x1OTc2Mlx1NUMzMVx1NEUwRFx1ODBGRFx1NUI5QVx1NEU0OVx1NEU4NlxuZXhwb3J0IGRlZmF1bHQgd2l0aFB3YShcbiAgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAgIGNvbnN0IGVudiA9IGdldEVudihtb2RlKVxuICAgIGNvbnN0IHsgVklURV9CQVNFX1VSTCB9ID0gZW52XG4gICAgY29uc3Qgb2JqOiBSZXR1cm5UeXBlPHR5cGVvZiBkZWZpbmVWaXRlcHJlc3NDb25maWc+ID0ge1xuICAgICAgYmFzZTogVklURV9CQVNFX1VSTCwgLy8gXHU3RUM4XHU0RUU1XHU2NTlDXHU2NzYwXHU1RjAwXHU1OTM0XHU1NDhDXHU3RUQzXHU1QzNFKFx1NkNBMVx1NjcwOVx1N0VEM1x1NUMzRXZpdGVcdTRGMUFcdTgxRUFcdTUyQThcdTU5MDRcdTc0MDYpXG4gICAgICBhc3luYyBidWlsZEVuZChzaXRlQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHsgb3V0RGlyIH0gPSBzaXRlQ29uZmlnLnVzZXJDb25maWdcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUT0RPXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB0cy9uby11bnNhZmUtYXNzaWdubWVudFxuICAgICAgICBjb25zdCBvYmogPSB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICAgIGZpbHRlcjogKGZpbGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplUGF0aEZpbGUgPSBub3JtYWxpemVQYXRoKGZpbGUpXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0UmVnID0gL1xcLig/OmpzfG1qc3xqc29ufGNzc3xodG1sKSQvaVxuICAgICAgICAgICAgY29uc3QgZXhjbHVkZUZpbGVzID0gWydtYW5pZmVzdC5qc29uJ11cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIGRlZmF1bHRSZWcudGVzdChub3JtYWxpemVQYXRoRmlsZSkgJiZcbiAgICAgICAgICAgICAgIWV4Y2x1ZGVGaWxlcy5zb21lKChpdGVtKSA9PiBub3JtYWxpemVQYXRoRmlsZS5pbmNsdWRlcyhpdGVtKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZlcmJvc2U6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdHMvbm8tdW5zYWZlLWNhbGwsIHRzL25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXG4gICAgICAgIG9iai5jb25maWdSZXNvbHZlZCh7XG4gICAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIG91dERpcixcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdHMvbm8tdW5zYWZlLWNhbGwsIHRzL25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXG4gICAgICAgIGF3YWl0IG9iai5jbG9zZUJ1bmRsZSgpXG4gICAgICB9LFxuICAgICAgLy8gc3JjRXhjbHVkZVxuICAgICAgY2FjaGVEaXI6IHJlc29sdmVDd2QoJ2J1aWxkLy5jYWNoZS92aXRlcHJlc3MnKSxcbiAgICAgIGNsZWFuVXJsczogdHJ1ZSwgLy8gVE9ETyBcdTY3RTVcdTc3MEJcdTYyNThcdTdCQTFcdTVFNzNcdTZERkJcdTY2MkZcdTU0MjZcdTY1MkZcdTYzMDFcbiAgICAgIGNvbnRlbnRQcm9wczoge1xuICAgICAgICAvLyBWUERvYyBjbGFzcyBcdTgzQjdcdTUzRDZoXHU2ODA3XHU5ODk4XHU2NUY2XHU0RjdGXHU3NTI4L1x1NzIyQ1x1ODY2Qlx1NjVGNlx1NzY4NFx1OTE0RFx1N0Y2RVx1NEY3Rlx1NzUyOFxuICAgICAgICBjbGFzczogJ1ZQRG9jJyxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjogcGFja2FnZUpzb24uZGVzY3JpcHRpb24sXG4gICAgICBoZWFkOiBbWydsaW5rJywgeyBocmVmOiBub3JtYWxpemVKb2luUGF0aChWSVRFX0JBU0VfVVJMLCAnZmF2aWNvbi5pY28nKSwgcmVsOiAnaWNvbicgfV1dLFxuICAgICAgbGFuZzogJ3poLUhhbnMnLFxuICAgICAgbWFya2Rvd246IHtcbiAgICAgICAgLy8gbWFya2Rvd24taXQtYW5jaG9yIFx1NzY4NFx1OTAwOVx1OTg3OSBcdThGRDlcdTkxQ0NcdTUzRUFcdTk3MDBcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFpZFx1NTE3Nlx1NEVENlx1NzY4NFx1RkYwQ1x1NEUwQlx1OTc2MmNvbmZpZ1x1OTFDQ1x1OTc2Mlx1ODFFQVx1NUI5QVx1NEU0OVxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdmFsZXJpYW5nYWxsaWF0L21hcmtkb3duLWl0LWFuY2hvciN1c2FnZVxuICAgICAgICBhbmNob3I6IHtcbiAgICAgICAgICBwZXJtYWxpbms6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0YWJJbmRleDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIEBtZGl0LXZ1ZS9wbHVnaW4tdG9jIFx1NzY4NFx1OTAwOVx1OTg3OVxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWRpdC12dWUvbWRpdC12dWUvdHJlZS9tYWluL3BhY2thZ2VzL3BsdWdpbi10b2Mjb3B0aW9uc1xuICAgICAgICAvLyB0b2M6IHsgbGV2ZWw6IFsxLCAyXSB9LFxuICAgICAgICBjb25maWc6IChtZCkgPT4ge1xuICAgICAgICAgIG1kLnVzZShtZFBsdWdpbilcbiAgICAgICAgfSxcbiAgICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgICAgZGFuZ2VyTGFiZWw6ICdcdTUzNzFcdTk2NjknLFxuICAgICAgICAgIGRldGFpbHNMYWJlbDogJ1x1OEJFNlx1N0VDNlx1NEZFMVx1NjA2RicsXG4gICAgICAgICAgaW5mb0xhYmVsOiAnXHU0RkUxXHU2MDZGJyxcbiAgICAgICAgICB0aXBMYWJlbDogJ1x1NjNEMFx1NzkzQScsXG4gICAgICAgICAgd2FybmluZ0xhYmVsOiAnXHU4QjY2XHU1NDRBJyxcbiAgICAgICAgfSxcbiAgICAgICAgbGluZU51bWJlcnM6IHRydWUsXG4gICAgICAgIHRoZW1lOiB7IGRhcms6ICdnaXRodWItZGFyaycsIGxpZ2h0OiAnZ2l0aHViLWxpZ2h0JyB9LFxuICAgICAgfSxcbiAgICAgIG1ldGFDaHVuazogdHJ1ZSxcbiAgICAgIG91dERpcjogcmVzb2x2ZUN3ZCgnZG9jcycpLCAvLyBcdTRFMERcdTgwRkRcdTY1M0VcdTUyMzAgdml0ZS5jb25maWcudHMgXHU5MUNDXHU5NzYyXHVGRjBDXHU1NDI2XHU1MjE5XHU0RjFBXHU2MkE1XHU5NTE5XG4gICAgICBwd2E6IHtcbiAgICAgICAgLy8gaHR0cHM6Ly92aXRlLXB3YS1vcmctemgubmV0bGlmeS5hcHAvZnJhbWV3b3Jrcy92aXRlcHJlc3MuaHRtbFxuICAgICAgICBleHBlcmltZW50YWw6IHtcbiAgICAgICAgICBpbmNsdWRlQWxsb3dsaXN0OiB0cnVlLCAvLyBUT0RPXG4gICAgICAgIH0sXG4gICAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLCAvLyBcdTcyRUNcdTdBQ0JcdTVFOTRcdTc1MjhcdTZBMjFcdTVGMEZcbiAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgICBzcmM6ICdsb2dvLnBuZycsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgICAgc3JjOiAnbG9nby5wbmcnLFxuICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnLFxuICAgICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgICBzcmM6ICdsb2dvLnBuZycsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIG5hbWU6ICdWaXRlUHJlc3MgUFdBJyxcbiAgICAgICAgICBvcmllbnRhdGlvbjogJ3BvcnRyYWl0JywgLy8gXHU3QUQ2XHU1QzRGXHU2QTIxXHU1RjBGXG4gICAgICAgICAgc2hvcnRfbmFtZTogJ1ZpdGVQcmVzc1BXQScsXG4gICAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0RGlyOiByZXNvbHZlQ3dkKCdkb2NzJyksXG4gICAgICAgIHNyY0RpcjogcmVzb2x2ZUN3ZChgJHttZFBhZ2VEaXJ9L3B1YmxpY2ApLFxuICAgICAgICB3b3JrYm94OiB7XG4gICAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2NzcyxqcyxodG1sLHN2ZyxwbmcsanBnLGdpZixpY28sdHh0LHdvZmYyLGd6LHhtbCxqc29ufSddLFxuICAgICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiAzICogMTAyNCAqIDEwMjQsIC8vIDNNQlxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJld3JpdGVzOiB7XG4gICAgICAgICdpbmRleC9pbmRleC5tZCc6ICdpbmRleC5tZCcsXG4gICAgICB9LFxuICAgICAgc2l0ZW1hcDoge1xuICAgICAgICBob3N0bmFtZTogJ2h0dHBzOi8vbXVsaW56aS5jbi8nLFxuICAgICAgfSxcbiAgICAgIHNyY0RpcjogcmVzb2x2ZUN3ZChtZFBhZ2VEaXIpLFxuICAgICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lLWNvbmZpZ1xuICAgICAgdGhlbWVDb25maWc6IHtcbiAgICAgICAgLy8gXHU1M0YzXHU4RkI5XHU3Njg0XHU1QkZDXHU4MjJBXHU2ODBGXG4gICAgICAgIG91dGxpbmU6IHtcbiAgICAgICAgICBsZXZlbDogWzIsIDNdLFxuICAgICAgICB9LFxuICAgICAgICBzZWFyY2g6IHtcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBhcGlLZXk6ICcxYjZlNzVkYzM1YTU3YmEzMDZlY2Q5NTNkNGVkODE3MicsXG4gICAgICAgICAgICBhcHBJZDogJ1pIRURTVE82WUInLFxuICAgICAgICAgICAgaW5kZXhOYW1lOiAnbXVsaW56aV9ub3RlJyxcbiAgICAgICAgICAgIGxvY2FsZXM6IHtcbiAgICAgICAgICAgICAgemg6IHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQXJpYUxhYmVsOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbW9kYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JTY3JlZW46IHtcbiAgICAgICAgICAgICAgICAgICAgICBoZWxwVGV4dDogJ1x1NEY2MFx1NTNFRlx1ODBGRFx1OTcwMFx1ODk4MVx1NjhDMFx1NjdFNVx1NEY2MFx1NzY4NFx1N0Y1MVx1N0VEQ1x1OEZERVx1NjNBNScsXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGVUZXh0OiAnXHU2NUUwXHU2Q0Q1XHU4M0I3XHU1M0Q2XHU3RUQzXHU2NzlDJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnXHU1MTczXHU5NUVEJyxcbiAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxuICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEJ5VGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjNEMFx1NEY5Qlx1ODAwNScsXG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5vUmVzdWx0c1NjcmVlbjoge1xuICAgICAgICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY1RTBcdTZDRDVcdTYyN0VcdTUyMzBcdTc2RjhcdTUxNzNcdTdFRDNcdTY3OUMnLFxuICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydE1pc3NpbmdSZXN1bHRzTGlua1RleHQ6ICdcdTcwQjlcdTUxRkJcdTUzQ0RcdTk5ODgnLFxuICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydE1pc3NpbmdSZXN1bHRzVGV4dDogJ1x1NEY2MFx1OEJBNFx1NEUzQVx1OEJFNVx1NjdFNVx1OEJFMlx1NUU5NFx1OEJFNVx1NjcwOVx1N0VEM1x1Njc5Q1x1RkYxRicsXG4gICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGVkUXVlcnlUZXh0OiAnXHU0RjYwXHU1M0VGXHU0RUU1XHU1QzFEXHU4QkQ1XHU2N0U1XHU4QkUyJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQm94OiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAgICAgICAgICAgICAgICAgICByZXNldEJ1dHRvbkFyaWFMYWJlbDogJ1x1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMlx1Njc2MVx1NEVGNicsXG4gICAgICAgICAgICAgICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1x1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMlx1Njc2MVx1NEVGNicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVTZWFyY2hlc1RpdGxlOiAnXHU2NTM2XHU4NUNGJyxcbiAgICAgICAgICAgICAgICAgICAgICBub1JlY2VudFNlYXJjaGVzVGV4dDogJ1x1NkNBMVx1NjcwOVx1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMicsXG4gICAgICAgICAgICAgICAgICAgICAgcmVjZW50U2VhcmNoZXNUaXRsZTogJ1x1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMicsXG4gICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRmF2b3JpdGVTZWFyY2hCdXR0b25UaXRsZTogJ1x1NEVDRVx1NjUzNlx1ODVDRlx1NEUyRFx1NzlGQlx1OTY2NCcsXG4gICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUmVjZW50U2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRFQ0VcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjJcdTRFMkRcdTc5RkJcdTk2NjQnLFxuICAgICAgICAgICAgICAgICAgICAgIHNhdmVSZWNlbnRTZWFyY2hCdXR0b25UaXRsZTogJ1x1NEZERFx1NUI1OFx1ODFGM1x1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoUGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVzVG9SZXRyaWV2ZTogW1xuICAgICAgICAgICAgICAgICdoaWVyYXJjaHkubHZsMCcsXG4gICAgICAgICAgICAgICAgJ2hpZXJhcmNoeS5sdmwxJyxcbiAgICAgICAgICAgICAgICAnaGllcmFyY2h5Lmx2bDInLFxuICAgICAgICAgICAgICAgICdoaWVyYXJjaHkubHZsMycsXG4gICAgICAgICAgICAgICAgJ2hpZXJhcmNoeS5sdmw0JyxcbiAgICAgICAgICAgICAgICAnaGllcmFyY2h5Lmx2bDUnLFxuICAgICAgICAgICAgICAgICdoaWVyYXJjaHkubHZsNicsXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgICd0eXBlJyxcbiAgICAgICAgICAgICAgICAnbHZsMFRleHQnLFxuICAgICAgICAgICAgICAgICd1cmwnLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzVG9TbmlwcGV0OiBbJyo6MjEnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm92aWRlcjogJ2FsZ29saWEnLFxuICAgICAgICB9LFxuICAgICAgICBzaWRlYmFyLFxuICAgICAgfSxcbiAgICAgIHRpdGxlOiBwYWNrYWdlSnNvbi5wcm9kdWN0TmFtZSwgLy8gXHU2Q0ExXHU2NzA5IHRpdGxlVGVtcGxhdGUgXHU1QjgzXHU1QzA2XHU3NTI4XHU0RjVDXHU2MjQwXHU2NzA5XHU1MzU1XHU3MkVDXHU5ODc1XHU5NzYyXHU2ODA3XHU5ODk4XHU3Njg0XHU5RUQ4XHU4QkE0XHU1NDBFXHU3RjAwXG4gICAgICB0aXRsZVRlbXBsYXRlOiBmYWxzZSwgLy8gXHU1M0JCXHU2Mzg5XHU2ODA3XHU5ODk4XHU5MUNDXHU5NzYyXHU3Njg0IFx1MjAxOXwgdml0ZVx1MjAxOFxuICAgICAgLy8gdHJhbnNmb3JtUGFnZURhdGEoZGV2L3Byb2QpIC0+IHRyYW5zZm9ybUhlYWQocHJvZCkgLT4gdHJhbnNmb3JtSHRtbChwcm9kKVxuICAgICAgdHJhbnNmb3JtSGVhZCh7IHBhZ2VEYXRhIH0pIHtcbiAgICAgICAgY29uc3QgeyBmaWxlUGF0aCwgZnJvbnRtYXR0ZXIgfSA9IHBhZ2VEYXRhXG4gICAgICAgIGNvbnN0IGtleXdvcmRzID0gZXh0cmFjdEtleXdvcmRzRnJvbVBhdGgoZmlsZVBhdGgpXG4gICAgICAgIGNvbnN0IGhlYWRBcnIgPSAoZnJvbnRtYXR0ZXIuaGVhZCA/PyBbXSkgYXMgQXJyYXk8W3N0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPl0+XG4gICAgICAgIC8vIFx1NEU1Rlx1NTNFRlx1NEVFNVx1NEUwRFx1OTcwMFx1ODk4MSBodHRwczovL2Jsb2cuc2trLm1vZS9wb3N0L3NheS1uby10by1tZXRhLWtleXdvcmRzL1xuICAgICAgICBjb25zdCBhcnI6IEFycmF5PFtzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz5dPiA9IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnbWV0YScsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgICAgICAgJ3dpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wLCBtaW5pbXVtLXNjYWxlPTEuMCwgdXNlci1zY2FsYWJsZT1ubycsXG4gICAgICAgICAgICAgIG5hbWU6ICd2aWV3cG9ydCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF1cbiAgICAgICAgaWYgKGhlYWRBcnIuZmluZCgoaCkgPT4gaFswXSA9PT0gJ21ldGEnICYmIGhbMV0ubmFtZSA9PT0gJ2tleXdvcmRzJykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFx1NEUwRFx1NEYxQVx1OTY4Rlx1OTg3NVx1OTc2Mlx1NTNEOFx1NTMxNlx1ODAwQ1x1NTNEOFx1NTMxNlxuICAgICAgICAgIGFyci5wdXNoKFsnbWV0YScsIHsgY29udGVudDoga2V5d29yZHMsIG5hbWU6ICdrZXl3b3JkcycgfV0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyclxuICAgICAgfSxcbiAgICAgIHRyYW5zZm9ybUh0bWwoY29kZSkge1xuICAgICAgICByZXR1cm4gcG9zdEhhbmRsZUh0bWwoY29kZSlcbiAgICAgIH0sXG4gICAgICB0cmFuc2Zvcm1QYWdlRGF0YShwYWdlRGF0YSwgeyBzaXRlQ29uZmlnIH0pIHtcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBleHRyYWN0S2V5d29yZHNGcm9tUGF0aChwYWdlRGF0YS5maWxlUGF0aClcbiAgICAgICAgaWYgKHBhZ2VEYXRhLmRlc2NyaXB0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgcGFnZURhdGEuZGVzY3JpcHRpb24gPSBgJHtrZXl3b3Jkc30gd2ViIFx1NTI0RFx1N0FFRiAke3NpdGVDb25maWcuc2l0ZS5kZXNjcmlwdGlvbn1gXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB2aXRlOiB7XG4gICAgICAgIGNvbmZpZ0ZpbGU6IHJlc29sdmVDd2QoJ2J1aWxkL3ZpdGUuY29uZmlnLnRzJyksXG4gICAgICB9LFxuICAgIH1cbiAgICByZXR1cm4gb2JqXG4gIH0pLFxuKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXGdlbmVyYXRlU2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9xYy1wbi12dWUvYnVpbGQvcGx1Z2lucy9nZW5lcmF0ZVNpZGViYXIudHNcIjsvKlxuICogQEF1dGhvciAgICAgICA6IGh1Y2hhb21pbiBpaXNhX3BldGVyQDE2My5jb21cbiAqIEBEYXRlICAgICAgICAgOiAyMDI0LTEwLTE5IDIzOjQzOjQxXG4gKiBATGFzdEVkaXRvcnMgIDogaHVjaGFvbWluIGlpc2FfcGV0ZXJAMTYzLmNvbVxuICogQExhc3RFZGl0VGltZSA6IDIwMjQtMTItMjAgMTA6NTk6MzFcbiAqIEBEZXNjcmlwdGlvbiAgOiBpbmRleC5tZCBcdTc2ODRcdTY1ODdcdTRFRjZcdTUzRUZcdTRFRTVcdTUwNUFcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcbiAqL1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHV0YyBmcm9tICdkYXlqcy9wbHVnaW4vdXRjLmpzJ1xuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcidcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCdcbmltcG9ydCB7IGdlbmVyYXRlU2lkZWJhciB9IGZyb20gJ3ZpdGVwcmVzcy1zaWRlYmFyJ1xuXG5pbXBvcnQgeyBtZFBhZ2VEaXIsIHJlc29sdmVDd2QgfSBmcm9tICcuLi91dGlscy9pbmRleC50cydcbmltcG9ydCBzaWRlYmFyRm9sZGVyT3JkZXIgZnJvbSAnLi9zaWRlYmFyRm9sZGVyT3JkZXIuanNvbicgYXNzZXJ0IHsgdHlwZTogJ2pzb24nIH1cblxuZXhwb3J0IHR5cGUgU2lkZWJhckl0ZW0gPSBTaWRlYmFyR3JvdXBJdGVtIHwgU2lkZWJhclNpbmdsZUl0ZW1cblxuaW50ZXJmYWNlIFNpZGViYXJHcm91cEl0ZW0ge1xuICBfZm9sZGVyS2V5OiBzdHJpbmdcbiAgaXRlbXM6IFNpZGViYXJJdGVtW11cbiAgb3JkZXI6IG51bWJlclxuICB0ZXh0OiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIFNpZGViYXJTaW5nbGVJdGVtIHtcbiAgbGluazogc3RyaW5nXG4gIG9yZGVyOiBudW1iZXJcbiAgdGV4dDogc3RyaW5nXG59XG5cbmRheWpzLmV4dGVuZCh1dGMpXG5cbmZ1bmN0aW9uIHBhZFN0cmluZ1RvTGVuZ3RoKHN0cjogc3RyaW5nLCBsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBzdHIucGFkRW5kKGxlbmd0aCwgJyAnKVxufVxuXG4vLyBodHRwczovL3ZpdGVwcmVzcy1zaWRlYmFyLmNkZ2V0LmNvbS96aEhhbnMvZ3VpZGUvYXBpI2V4Y2x1ZGVwYXR0ZXJuXG5cbmNvbnN0IHNpZGViYXIgPSAoXG4gIGdlbmVyYXRlU2lkZWJhcih7XG4gICAgZGVidWdQcmludDogZmFsc2UsXG4gICAgZG9jdW1lbnRSb290UGF0aDogbWRQYWdlRGlyLFxuICAgIGV4Y2x1ZGVGaWxlc0J5RnJvbnRtYXR0ZXJGaWVsZE5hbWU6ICdleGNsdWRlJyxcbiAgICAvLyBleGNsdWRlUGF0dGVybjogWydpbmRleC9pbmRleC5tZCddLCAvLyBcdTYzOTJcdTk2NjRcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICBzb3J0Rm9sZGVyVG86ICd0b3AnLFxuICAgIHNvcnRNZW51c0J5RnJvbnRtYXR0ZXJPcmRlcjogdHJ1ZSxcbiAgICB1c2VGb2xkZXJMaW5rRnJvbUluZGV4RmlsZTogdHJ1ZSxcbiAgICB1c2VGb2xkZXJUaXRsZUZyb21JbmRleEZpbGU6IHRydWUsXG4gICAgdXNlVGl0bGVGcm9tRmlsZUhlYWRpbmc6IHRydWUsXG4gICAgdXNlVGl0bGVGcm9tRnJvbnRtYXR0ZXI6IHRydWUsXG4gIH0pIGFzIFNpZGViYXJJdGVtW11cbikuZmlsdGVyKChpdGVtKSA9PiAoaXRlbSBhcyBTaWRlYmFyU2luZ2xlSXRlbSkubGluayAhPT0gJy9pbmRleC9pbmRleC5tZCcpIC8vIFRPRE8gZXhjbHVkZUZpbGVzQnlGcm9udG1hdHRlckZpZWxkTmFtZSBcdTU0OEMgZXhjbHVkZVBhdHRlcm4gXHU1QkY5XHU4RkQ5XHU0RTJBXHU2NTg3XHU0RUY2XHU4RDc3XHU0RTBEXHU0RTg2XHU0RjVDXHU3NTI4XG5mdW5jdGlvbiBjcmVhdGVPcmRlckZyb250bWF0dGVyKHA6IHN0cmluZywgb3JkZXI6IG51bWJlcikge1xuICBjb25zdCB7IGNvbnRlbnQsIGRhdGEgfSA9IG1hdHRlci5yZWFkKHApXG4gIGlmIChPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggIT09IDApIHtcbiAgICBpZiAoZGF0YS5vcmRlciA9PT0gb3JkZXIgJiYgZGF0YS51dWlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBkYXRhLm9yZGVyID0gb3JkZXJcbiAgICBkYXRhLnV1aWQgPSAoZGF0YS51dWlkIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgPz8gdXVpZHY0KClcbiAgICBsZXQgc3RyID0gJy0tLVxcbidcbiAgICBjb25zdCBhcnIgPSBbJ3V1aWQnLCAnb3JkZXInLCAnYXV0aG9yJywgJ2RhdGUnLCAnbGFzdEVkaXRUaW1lJywgJ2xhc3RFZGl0b3JzJywgJ2Rlc2NyaXB0aW9uJ11cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGFyci5pbmRleE9mKGEpIC0gYXJyLmluZGV4T2YoYilcbiAgICB9KVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChkYXRhW2tleV0gYXMgc3RyaW5nKSA/PyAnJ1xuICAgICAgaWYgKFsnZGF0ZScsICdsYXN0RWRpdFRpbWUnXS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIHZhbHVlID0gZGF5anMudXRjKHZhbHVlKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxuICAgICAgfVxuICAgICAgc3RyICs9IGAke3BhZFN0cmluZ1RvTGVuZ3RoKGtleSwgMTMpfToke3ZhbHVlID09PSAnJyA/ICcnIDogYCAke3ZhbHVlfWB9XFxuYFxuICAgIH1cbiAgICBzdHIgKz0gJy0tLVxcbidcbiAgICBzdHIgKz0gY29udGVudFxuICAgIGZzLndyaXRlRmlsZShwLCBzdHIsICd1dGY4JywgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3cml0aW5nIHRvIHRoZSBmaWxlOicsIGVycilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhgRmlsZSAke3B9IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5LmApXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBjb3B5U2lkZWJhckZvbGRlck9yZGVyOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge31cblxuZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGhhbmRsZUxpbmsoc2lkZWJhciwgJycpXG4gIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShjb3B5U2lkZWJhckZvbGRlck9yZGVyLCBudWxsLCAyKVxuICBmcy53cml0ZUZpbGUoXG4gICAgcmVzb2x2ZUN3ZCgnYnVpbGQvcGx1Z2lucy9zaWRlYmFyRm9sZGVyT3JkZXIuanNvbicpLFxuICAgIGAke2pzb25TdHJpbmd9XFxuYCxcbiAgICAndXRmOCcsXG4gICAgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3cml0aW5nIHRvIHRoZSBmaWxlOicsIGVycilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygnRmlsZSBzaWRlYmFyRm9sZGVyT3JkZXIuanNvbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4nKVxuICAgIH0sXG4gIClcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBoYW5kbGVMaW5rKGFycjogU2lkZWJhckl0ZW1bXSwgcDogc3RyaW5nKTogU2lkZWJhckl0ZW1bXSB7XG4gIGNvbnN0IGZvbGRlck9yZGVyQXJyOiBudW1iZXJbXSA9IFtdXG4gIGNvbnN0IHJlc3VsdCA9IGFyclxuICAgIC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAvLyBzb3J0Rm9sZGVyVG8gXHU1MTQ4XHU1OTA0XHU3NDA2XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICBpZiAoKGl0ZW0gYXMgU2lkZWJhckdyb3VwSXRlbSkuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBmb2xkZXJLZXkgPSBgJHtwfS8ke2l0ZW0udGV4dH1gXG4gICAgICAgIDsoaXRlbSBhcyBTaWRlYmFyR3JvdXBJdGVtKS5fZm9sZGVyS2V5ID0gZm9sZGVyS2V5XG4gICAgICAgIDsoaXRlbSBhcyBTaWRlYmFyR3JvdXBJdGVtKS5pdGVtcyA9IGhhbmRsZUxpbmsoKGl0ZW0gYXMgU2lkZWJhckdyb3VwSXRlbSkuaXRlbXMsIGZvbGRlcktleSlcbiAgICAgICAgY29uc3Qgb3JkZXIgPSAoc2lkZWJhckZvbGRlck9yZGVyIGFzIFJlY29yZDxzdHJpbmcsIG51bWJlcj4pW2ZvbGRlcktleV0gPz8gaW5kZXhcbiAgICAgICAgOyhpdGVtIGFzIFNpZGViYXJHcm91cEl0ZW0pLm9yZGVyID0gb3JkZXJcbiAgICAgICAgZm9sZGVyT3JkZXJBcnIucHVzaChvcmRlcilcbiAgICAgIH1cblxuICAgICAgZm9sZGVyT3JkZXJBcnIuc29ydCgoYSwgYikgPT4gYSAtIGIpXG4gICAgICBpZiAoKGl0ZW0gYXMgU2lkZWJhclNpbmdsZUl0ZW0pLmxpbmsgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgZmlsZUluZGV4ID0gaW5kZXggLSBmb2xkZXJPcmRlckFyci5sZW5ndGhcbiAgICAgICAgd2hpbGUgKGZvbGRlck9yZGVyQXJyLmZpbmQoKHYpID0+IHYgPD0gZmlsZUluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm9sZGVyT3JkZXJBcnIuc2hpZnQoKVxuICAgICAgICAgIGZpbGVJbmRleCsrXG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlT3JkZXJGcm9udG1hdHRlcih0cmFuc2Zvcm1JdGVtTGlua1RvUGF0aCgoaXRlbSBhcyBTaWRlYmFyU2luZ2xlSXRlbSkubGluayksIGZpbGVJbmRleClcbiAgICAgICAgaXRlbS5vcmRlciA9IGZpbGVJbmRleFxuICAgICAgICA7KGl0ZW0gYXMgU2lkZWJhclNpbmdsZUl0ZW0pLmxpbmsgPSAoaXRlbSBhcyBTaWRlYmFyU2luZ2xlSXRlbSkubGluay5yZXBsYWNlKCdpbmRleC5tZCcsICcnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1cbiAgICB9KVxuICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZGVyIC0gYi5vcmRlcilcbiAgcmVzdWx0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgaWYgKChpdGVtIGFzIFNpZGViYXJHcm91cEl0ZW0pLl9mb2xkZXJLZXkpIHtcbiAgICAgIGNvcHlTaWRlYmFyRm9sZGVyT3JkZXJbKGl0ZW0gYXMgU2lkZWJhckdyb3VwSXRlbSkuX2ZvbGRlcktleV0gPSBpbmRleFxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbjogL2Nzcy9AcnVsZXMvQGxheWVyL2luZGV4Lm1kXG4gKiBAZGVzY3JpcHRpb246IC9jc3MvQHJ1bGVzL0BtZWRpYVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1JdGVtTGlua1RvUGF0aChsaW5rOiBzdHJpbmcpIHtcbiAgY29uc3Qgc3RyID0gbGluay5lbmRzV2l0aCgnLm1kJykgPyBsaW5rIDogYCR7bGlua30ubWRgXG4gIHJldHVybiByZXNvbHZlQ3dkKHBhdGguam9pbihtZFBhZ2VEaXIsIHN0cikpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlKClcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHV0aWxzXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC91dGlscy9pbmRleC50c1wiOy8qXG4gKiBAQXV0aG9yICAgICAgIDogcGV0ZXJcbiAqIEBEYXRlICAgICAgICAgOiAyMDI0LTEwLTEwIDE4OjM3OjI4XG4gKiBATGFzdEVkaXRvcnMgIDogaHVjaGFvbWluIGlpc2FfcGV0ZXJAMTYzLmNvbVxuICogQExhc3RFZGl0VGltZSA6IDIwMjQtMTItMTkgMTA6MTg6MzBcbiAqIEBEZXNjcmlwdGlvbiAgOlxuICovXG5cbi8vIFtub3JtYWxpemVQYXRoXShodHRwczovL2dpdGh1Yi5jb20vamlhbmdqaXUvYmxvZy1tZC9pc3N1ZXMvNDcpXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgeyBsb2FkRW52LCBub3JtYWxpemVQYXRoIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHBhcnNlTG9hZGVkRW52IH0gZnJvbSAndml0ZS1wbHVnaW4tZW52LXBhcnNlJ1xuXG5mdW5jdGlvbiByZXNvbHZlQ3dkKHA6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcClcbn1cblxuY29uc3QgZW52RGlyID0gcmVzb2x2ZUN3ZCgnYnVpbGQvZW52JylcbmNvbnN0IG1kUGFnZURpciA9ICdzcmMvcGFnZXMnXG5cbmZ1bmN0aW9uIGV4dHJhY3RLZXl3b3Jkc0Zyb21QYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChwYXRoLmVuZHNXaXRoKCcvaW5kZXgubWQnKSkge1xuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoJy9pbmRleC5tZCcsICcnKVxuICB9XG4gIGlmIChwYXRoLmVuZHNXaXRoKCcubWQnKSkge1xuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoJy5tZCcsICcnKVxuICB9XG4gIHJldHVybiBwYXRoLnNwbGl0KCcvJykucmV2ZXJzZSgpLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiBleHRyYWN0TGFuZyhpbmZvOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gaW5mb1xuICAgIC50cmltKClcbiAgICAucmVwbGFjZSgvPVxcZCovLCAnJylcbiAgICAucmVwbGFjZSgvOig/Om5vLSk/bGluZS1udW1iZXJzKD86W3sgXXwkfD0pLiovLCAnJylcbiAgICAucmVwbGFjZSgvKD86LXZ1ZXxcXHt8ICkuKiQvLCAnJylcbiAgICAucmVwbGFjZSgvXnZ1ZS1odG1sJC8sICd0ZW1wbGF0ZScpXG4gICAgLnJlcGxhY2UoL15hbnNpJC8sICcnKVxufVxuXG5mdW5jdGlvbiBleHRyYWN0VGl0bGUoaW5mbzogc3RyaW5nLCBodG1sID0gZmFsc2UpIHtcbiAgaWYgKGh0bWwpIHtcbiAgICByZXR1cm4gaW5mby5yZXBsYWNlKC88IS0tW1xcc1xcU10qPy0tPi9nLCAnJykubWF0Y2goL2RhdGEtdGl0bGU9XCIoLio/KVwiLyk/LlsxXSB8fCAnJ1xuICB9XG4gIHJldHVybiBpbmZvLm1hdGNoKC9cXFsoLiopXFxdLyk/LlsxXSB8fCBleHRyYWN0TGFuZyhpbmZvKSB8fCAndHh0J1xufVxuXG5mdW5jdGlvbiBmaXJzdFVwcGVyQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cbmZ1bmN0aW9uIGdldEVudihtb2RlOiBzdHJpbmcpOiBJbXBvcnRNZXRhRW52IHtcbiAgLy8gbG9hZEVudiBcdThCQkVcdTdGNkVcdTdCMkNcdTRFMDlcdTRFMkFcdTUzQzJcdTY1NzBcdTRFM0FcdTdBN0EgXHU2NzY1XHU1MkEwXHU4RjdEXHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU4MDBDXHU0RTBEXHU3QkExXHU2NjJGXHU1NDI2XHU2NzA5IGBWSVRFX2AgXHU1MjREXHU3RjAwXG4gIHJldHVybiBwYXJzZUxvYWRlZEVudihsb2FkRW52KG1vZGUsIGVudkRpcikpIGFzIEltcG9ydE1ldGFFbnZcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplSm9pblBhdGgoLi4ucGF0aHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgocGF0aC5qb2luKC4uLnBhdGhzKSlcbn1cblxuZXhwb3J0IHtcbiAgZW52RGlyLFxuICBleHRyYWN0S2V5d29yZHNGcm9tUGF0aCxcbiAgZXh0cmFjdFRpdGxlLFxuICBmaXJzdFVwcGVyQ2FzZSxcbiAgZ2V0RW52LFxuICBtZFBhZ2VEaXIsXG4gIG5vcm1hbGl6ZUpvaW5QYXRoLFxuICByZXNvbHZlQ3dkLFxufVxuIiwgIntcbiAgXCIvY3NzL0BydWxlc1wiOiAyLFxuICBcIi9qYXZhc2NyaXB0L0FycmF5XCI6IDAsXG4gIFwiL2phdmFzY3JpcHQvQk9NXCI6IDEsXG4gIFwiL2phdmFzY3JpcHQvRE9NXCI6IDIsXG4gIFwiL2phdmFzY3JpcHQvZXM2XCI6IDMsXG4gIFwiL2phdmFzY3JpcHQvXHU4RkQwXHU3Qjk3XHU3QjI2XCI6IDQsXG4gIFwiL3Rvb2xzL2dpdGh1YlwiOiAzLFxuICBcIi90b29scy92aXRlcHJlc3NcIjogNCxcbiAgXCIvXHU1RkFFXHU0RkUxL1x1NTE2Q1x1NEYxN1x1NTNGN1wiOiAwLFxuICBcIi9cdTY4NDZcdTY3QjYvdnVlM1wiOiAwLFxuICBcIi9cdTgxMUFcdTYyNEJcdTY3QjYvZXNsaW50XCI6IDAsXG4gIFwiL1x1ODExQVx1NjI0Qlx1NjdCNi92aXRlXCI6IDEsXG4gIFwiL2h0bWxcIjogMCxcbiAgXCIvY3NzXCI6IDEsXG4gIFwiL2phdmFzY3JpcHRcIjogMixcbiAgXCIvdHlwZXNjcmlwdFwiOiAzLFxuICBcIi90b29sc1wiOiA0LFxuICBcIi91dGlsc1wiOiA1LFxuICBcIi9cdTVGQUVcdTRGRTFcIjogNixcbiAgXCIvXHU2NzQyXHU4QzA4XCI6IDcsXG4gIFwiL1x1Njg0Nlx1NjdCNlwiOiA4LFxuICBcIi9cdTgxMUFcdTYyNEJcdTY3QjZcIjogOSxcbiAgXCIvXHU3NTFGXHU2RDNCXCI6IDEwXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcXFxcYmxvY2txdW90ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9xYy1wbi12dWUvYnVpbGQvcGx1Z2lucy9tZC9ibG9ja3F1b3RlLnRzXCI7LypcbiAqIEBBdXRob3IgICAgICAgOiBwZXRlclxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTEtMjMgMTA6NDk6MzhcbiAqIEBMYXN0RWRpdG9ycyAgOiBodWNoYW9taW4gaWlzYV9wZXRlckAxNjMuY29tXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNC0xMS0zMCAyMjoyODo0NVxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB0eXBlIHsgTWFya2Rvd25JdCB9IGZyb20gJy4vaW5kZXgudHMnXG5cbmV4cG9ydCBkZWZhdWx0IChtZDogTWFya2Rvd25JdCkgPT4ge1xuICBtZC5yZW5kZXJlci5ydWxlcy5ibG9ja3F1b3RlX29wZW4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIGA8bi1ibG9ja3F1b3RlPmBcbiAgfVxuICBtZC5yZW5kZXJlci5ydWxlcy5ibG9ja3F1b3RlX2Nsb3NlID0gKCkgPT4ge1xuICAgIHJldHVybiAnPC9uLWJsb2NrcXVvdGU+J1xuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcXFxcY29kZUlubGluZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9xYy1wbi12dWUvYnVpbGQvcGx1Z2lucy9tZC9jb2RlSW5saW5lLnRzXCI7LypcbiAqIEBBdXRob3IgICAgICAgOiBwZXRlclxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTEtMjMgMTA6NDk6MzhcbiAqIEBMYXN0RWRpdG9ycyAgOiBodWNoYW9taW4gaWlzYV9wZXRlckAxNjMuY29tXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNC0xMS0zMCAyMzo0OToxNVxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnbm9kZS1odG1sLXBhcnNlcidcblxuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkl0IH0gZnJvbSAnLi9pbmRleC50cydcblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRSZW5kZXIgPSBtZC5yZW5kZXJlci5ydWxlcy5jb2RlX2lubGluZVxuICBtZC5yZW5kZXJlci5ydWxlcy5jb2RlX2lubGluZSA9ICguLi5hcmcpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBkZWZhdWx0UmVuZGVyISguLi5hcmcpXG4gICAgY29uc3Qgcm9vdCA9IHBhcnNlKHJlc3VsdClcbiAgICByZXR1cm4gYFxuICAgICAgPG4tdGV4dCBjb2RlPlxuICAgICAgICAke3Jvb3QuaW5uZXJIVE1MfVxuICAgICAgPC9uLXRleHQ+YFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcXFxcY29udGFpbmVyX2NvZGVfZ3JvdXAudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvcWMtcG4tdnVlL2J1aWxkL3BsdWdpbnMvbWQvY29udGFpbmVyX2NvZGVfZ3JvdXAudHNcIjsvKlxuICogQEF1dGhvciAgICAgICA6IHBldGVyXG4gKiBARGF0ZSAgICAgICAgIDogMjAyNC0xMS0zMCAxMDoyMjoxNVxuICogQExhc3RFZGl0b3JzICA6IHBldGVyXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNC0xMi0wNiAxNzozNTowOFxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB0eXBlIHsgTWFya2Rvd25JdCB9IGZyb20gJy4vaW5kZXgudHMnXG5cbmltcG9ydCB7IGV4dHJhY3RUaXRsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2luZGV4LnRzJ1xuXG5leHBvcnQgZGVmYXVsdCAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgbWQucmVuZGVyZXIucnVsZXNbJ2NvbnRhaW5lcl9jb2RlLWdyb3VwX29wZW4nXSA9ICh0b2tlbnMsIGlkeCkgPT4ge1xuICAgIGNvbnN0IGNsb3NlVG9rZW5JbmRleCA9IHRva2Vucy5maW5kSW5kZXgoKHRva2VuLCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIGluZGV4ID4gaWR4ICYmIHRva2VuLnR5cGUgPT09ICdjb250YWluZXJfY29kZS1ncm91cF9jbG9zZSdcbiAgICB9KVxuICAgIGNvbnN0IGNoaWxkVG9rZW5zID0gdG9rZW5zXG4gICAgICAuc2xpY2UoaWR4ICsgMSwgY2xvc2VUb2tlbkluZGV4KVxuICAgICAgLmZpbHRlcigodCkgPT4gdC5sZXZlbCA9PT0gdG9rZW5zW2lkeF0ubGV2ZWwgKyAxKVxuICAgIGNoaWxkVG9rZW5zLmZvckVhY2goKHQpID0+IHtcbiAgICAgIGNvbnN0IGlzSHRtbCA9IHQudHlwZSA9PT0gJ2h0bWxfYmxvY2snXG4gICAgICBjb25zdCB0aXRsZSA9IGV4dHJhY3RUaXRsZShpc0h0bWwgPyB0LmNvbnRlbnQgOiB0LmluZm8sIGlzSHRtbClcbiAgICAgIHQuYXR0clNldCgndGFiTmFtZScsIHRpdGxlKVxuICAgIH0pXG4gICAgcmV0dXJuIGA8bi1jYXJkXG4gICAgICA6Y2xhc3M9XCJpc01vYmlsZSA/ICctbXgtMyAhdy1hdXRvJyA6ICcnXCJcbiAgICAgIGNsYXNzPVwiY29kZV9ncm91cF9jYXJkXCJcbiAgICAgIGVtYmVkZGVkXG4gICAgICA6Ym9yZGVyZWQ9XCJmYWxzZVwiXG4gICAgICBjb250ZW50LWNsYXNzPVwiIXAtMFwiXG4gICAgPlxuICAgICAgPG4tdGFicyB0eXBlPVwibGluZVwiIGFuaW1hdGVkPlxuICAgIGBcbiAgfVxuICBtZC5yZW5kZXJlci5ydWxlc1snY29udGFpbmVyX2NvZGUtZ3JvdXBfY2xvc2UnXSA9ICgpID0+IHtcbiAgICByZXR1cm4gYDwvbi10YWJzPlxuICAgICAgPC9uLWNhcmQ+YFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcXFxcY29udGFpbmVyX2RldGFpbC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9xYy1wbi12dWUvYnVpbGQvcGx1Z2lucy9tZC9jb250YWluZXJfZGV0YWlsLnRzXCI7LypcbiAqIEBBdXRob3IgICAgICAgOiBwZXRlclxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTEtMzAgMTA6MjI6MTVcbiAqIEBMYXN0RWRpdG9ycyAgOiBodWNoYW9taW4gaWlzYV9wZXRlckAxNjMuY29tXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNC0xMS0zMCAyMjozNDo1N1xuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB0eXBlIHsgTWFya2Rvd25JdCB9IGZyb20gJy4vaW5kZXgudHMnXG5cbmV4cG9ydCBkZWZhdWx0IChtZDogTWFya2Rvd25JdCkgPT4ge1xuICBtZC5yZW5kZXJlci5ydWxlcy5jb250YWluZXJfZGV0YWlsc19vcGVuID0gKHRva2VucywgaWR4LCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgeyBpbmZvIH0gPSB0b2tlbnNbaWR4XVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB0cy9uby11bnNhZmUtYXNzaWdubWVudFxuICAgIGNvbnN0IHRpdGxlID1cbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgXHU3QzdCXHU1NzhCXHU5NTE5XHU4QkVGXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdHMvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3NcbiAgICAgIGluZm8udHJpbSgpLnNsaWNlKCdkZXRhaWxzJy5sZW5ndGgpLnRyaW0oKSB8fCBvcHRpb25zLmNvbnRhaW5lci5kZXRhaWxzTGFiZWxcbiAgICByZXR1cm4gYDxuLWNhcmRcbiAgICAgIGNsYXNzPVwiZGV0YWlsc19jb250YWluZXJfY2FyZFwiXG4gICAgICBlbWJlZGRlZFxuICAgICAgOmJvcmRlcmVkPVwiZmFsc2VcIlxuICAgICAgY29udGVudC1zdHlsZT1cInBhZGRpbmc6IDEzcHhcIlxuICAgID5cbiAgICAgICAgPG4tY29sbGFwc2U+XG4gICAgICAgICAgPG4tY29sbGFwc2UtaXRlbSB0aXRsZT1cIiR7dGl0bGV9XCIgbmFtZT1cIjFcIj5gXG4gIH1cbiAgbWQucmVuZGVyZXIucnVsZXMuY29udGFpbmVyX2RldGFpbHNfY2xvc2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGA8L24tY29sbGFwc2UtaXRlbT5cbiAgICAgIDwvbi1jb2xsYXBzZT48L24tY2FyZD5gXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxtZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxtZFxcXFxjb250YWluZXJfb3RoZXJzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC9wbHVnaW5zL21kL2NvbnRhaW5lcl9vdGhlcnMudHNcIjsvKlxuICogQEF1dGhvciAgICAgICA6IHBldGVyXG4gKiBARGF0ZSAgICAgICAgIDogMjAyNC0xMS0yMyAxMDo0OTozOFxuICogQExhc3RFZGl0b3JzICA6IHBldGVyXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNC0xMS0zMCAxMDoyMzo1OVxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB0eXBlIHsgTWFya2Rvd25JdCB9IGZyb20gJy4vaW5kZXgudHMnXG5cbmNvbnN0IHR5cGVBcnIgPSBbXG4gIHtcbiAgICBhbGVydFR5cGU6ICdzdWNjZXNzJyxcbiAgICB0eXBlOiAndGlwJyxcbiAgfSxcbiAge1xuICAgIGFsZXJ0VHlwZTogJ2luZm8nLFxuICAgIHR5cGU6ICdpbmZvJyxcbiAgfSxcbiAge1xuICAgIGFsZXJ0VHlwZTogJ3dhcm5pbmcnLFxuICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgfSxcbiAge1xuICAgIGFsZXJ0VHlwZTogJ2Vycm9yJyxcbiAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgfSxcbl1cblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIHR5cGVBcnIuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgbWQucmVuZGVyZXIucnVsZXNbYGNvbnRhaW5lcl8ke29iai50eXBlfV9vcGVuYF0gPSAodG9rZW5zLCBpZHgsIG9wdGlvbnMpID0+IHtcbiAgICAgIGNvbnN0IHsgaW5mbyB9ID0gdG9rZW5zW2lkeF1cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB0cy9uby11bnNhZmUtYXNzaWdubWVudFxuICAgICAgY29uc3QgdGl0bGUgPVxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFx1N0M3Qlx1NTc4Qlx1OTUxOVx1OEJFRlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdHMvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3NcbiAgICAgICAgaW5mby50cmltKCkuc2xpY2Uob2JqLnR5cGUubGVuZ3RoKS50cmltKCkgfHwgb3B0aW9ucy5jb250YWluZXJbYCR7b2JqLnR5cGV9TGFiZWxgXVxuICAgICAgcmV0dXJuIGA8bi1hbGVydCA6Ym9yZGVyZWQ9XCJmYWxzZVwiIHRpdGxlPVwiJHt0aXRsZX1cIiB0eXBlPVwiJHtvYmouYWxlcnRUeXBlfVwiPmBcbiAgICB9XG4gICAgbWQucmVuZGVyZXIucnVsZXNbYGNvbnRhaW5lcl8ke29iai50eXBlfV9jbG9zZWBdID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIGA8L24tYWxlcnQ+YFxuICAgIH1cbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxtZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxtZFxcXFxkZW1vLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC9wbHVnaW5zL21kL2RlbW8udHNcIjsvKlxuICogQEF1dGhvciAgICAgICA6IGh1Y2hhb21pbiBpaXNhX3BldGVyQDE2My5jb21cbiAqIEBEYXRlICAgICAgICAgOiAyMDI1LTAxLTI1IDEyOjI4OjAyXG4gKiBATGFzdEVkaXRvcnMgIDogaHVjaGFvbWluIGlpc2FfcGV0ZXJAMTYzLmNvbVxuICogQExhc3RFZGl0VGltZSA6IDIwMjUtMDEtMjYgMTA6NDk6NDZcbiAqIEBEZXNjcmlwdGlvbiAgOlxuICovXG5cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnbm9kZS1odG1sLXBhcnNlcidcblxuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkl0IH0gZnJvbSAnLi9pbmRleC50cydcblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIGNvbnN0IHJlbmRlciA9IG1kLnJlbmRlci5iaW5kKG1kKVxuICBtZC5yZW5kZXIgPSAoXG4gICAgLi4uYXJnczogW1xuICAgICAgUGFyYW1ldGVyczxNYXJrZG93bkl0WydyZW5kZXInXT5bMF0sXG4gICAgICB7XG4gICAgICAgIHNmY0Jsb2Nrczoge1xuICAgICAgICAgIHNjcmlwdHM6IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHN0cmluZ1xuICAgICAgICAgICAgY29udGVudFN0cmlwcGVkOiBzdHJpbmdcbiAgICAgICAgICAgIHRhZ0Nsb3NlOiBzdHJpbmdcbiAgICAgICAgICAgIHRhZ09wZW46IHN0cmluZ1xuICAgICAgICAgICAgdHlwZTogc3RyaW5nXG4gICAgICAgICAgfVtdXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgXVxuICApOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlbmRlciguLi5hcmdzKVxuICAgIGNvbnN0IHJvb3QgPSBwYXJzZShyZXN1bHQpXG4gICAgY29uc3QgZGVtb0FyciA9IHJvb3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0RlbW8nKVxuICAgIGlmIChkZW1vQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgICBjb25zdCBzY3JpcHRPYmogPSBhcmdzWzFdLnNmY0Jsb2Nrcy5zY3JpcHRzWzBdID8/IHtcbiAgICAgIGNvbnRlbnQ6IGA8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPjwvc2NyaXB0PmAsXG4gICAgICBjb250ZW50U3RyaXBwZWQ6ICcnLFxuICAgICAgdGFnQ2xvc2U6ICc8L3NjcmlwdD4nLFxuICAgICAgdGFnT3BlbjogJzxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+JyxcbiAgICAgIHR5cGU6ICdzY3JpcHQnLFxuICAgIH1cblxuICAgIGNvbnN0IGltcG9ydFN0ciA9IHNjcmlwdE9iai5jb250ZW50U3RyaXBwZWQuaW5jbHVkZXMoJ2RlZmluZUNsaWVudENvbXBvbmVudCcpXG4gICAgICA/ICcnXG4gICAgICA6IFwiaW1wb3J0IHsgZGVmaW5lQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAndml0ZXByZXNzJ1wiXG4gICAgY29uc3Qgc3RhdGVtZW50QXJyOiBzdHJpbmdbXSA9IFtdXG4gICAgZGVtb0Fyci5mb3JFYWNoKChkZW1vLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY29tcG9OYW1lID0gYERlbW8ke2luZGV4fWBcbiAgICAgIGNvbnN0IGNvbXBvU3JjID0gZGVtby5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgICBzdGF0ZW1lbnRBcnIucHVzaChcbiAgICAgICAgYGNvbnN0ICR7Y29tcG9OYW1lfSA9IGRlZmluZUNsaWVudENvbXBvbmVudCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGltcG9ydCgnJHtjb21wb1NyY30nKVxuICAgICAgICB9KWAsXG4gICAgICApXG4gICAgICBkZW1vLnRhZ05hbWUgPSBjb21wb05hbWVcbiAgICAgIGRlbW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKVxuICAgICAgZGVtby5yZXBsYWNlV2l0aChgPERlbW9XcmFwcGVyPlxuICAgICAgICAgIDx0ZW1wbGF0ZSAjc291cmNlPlxuICAgICAgICAgICAgJHttZC5yZW5kZXIoYDw8PCAke2NvbXBvU3JjfVxcbmAsIGFyZ3NbMV0pfVxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlICNkZWZhdWx0PlxuICAgICAgICAgICAgJHtkZW1vLm91dGVySFRNTH1cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L0RlbW9XcmFwcGVyPmApXG4gICAgfSlcbiAgICBjb25zdCBzdGF0ZW1lbnRTdHIgPSBzdGF0ZW1lbnRBcnIuam9pbignXFxuJylcbiAgICBzY3JpcHRPYmouY29udGVudFN0cmlwcGVkID0gYCR7aW1wb3J0U3RyfVxcbiR7c2NyaXB0T2JqLmNvbnRlbnRTdHJpcHBlZH1cXG4ke3N0YXRlbWVudFN0cn1gXG4gICAgc2NyaXB0T2JqLmNvbnRlbnQgPSBgJHtzY3JpcHRPYmoudGFnT3Blbn1cXG4ke3NjcmlwdE9iai5jb250ZW50U3RyaXBwZWR9XFxuJHtzY3JpcHRPYmoudGFnQ2xvc2V9YFxuICAgIGFyZ3NbMV0uc2ZjQmxvY2tzLnNjcmlwdHNbMF0gPSBzY3JpcHRPYmpcbiAgICByZXR1cm4gcm9vdC5vdXRlckhUTUxcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXFxcXGZlbmNlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC9wbHVnaW5zL21kL2ZlbmNlLnRzXCI7LypcbiAqIEBBdXRob3IgICAgICAgOiBwZXRlclxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTEtMjMgMTA6NDk6MzhcbiAqIEBMYXN0RWRpdG9ycyAgOiBodWNoYW9taW4gaWlzYV9wZXRlckAxNjMuY29tXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNS0wMS0yNiAxNzowMTozMlxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnbm9kZS1odG1sLXBhcnNlcidcblxuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkl0IH0gZnJvbSAnLi9pbmRleC50cydcblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRSZW5kZXIgPSBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZVxuICBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZSA9ICguLi5hcmcpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBkZWZhdWx0UmVuZGVyISguLi5hcmcpXG4gICAgY29uc3Qgcm9vdCA9IHBhcnNlKHJlc3VsdCkuY2xvbmUoKSBhcyB1bmtub3duIGFzIEhUTUxFbGVtZW50XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY29weScpPy5yZW1vdmUoKVxuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgndnAtYWRhcHRpdmUtdGhlbWUnKVxuICAgIGNvbnN0IFt0b2tlbnMsIGlkeF0gPSBhcmdcbiAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdXG4gICAgY29uc3QgdGFiTmFtZSA9IHRva2VuLmF0dHJHZXQoJ3RhYk5hbWUnKVxuICAgIHRva2VuLmF0dHJTZXQoJ3RhYk5hbWUnLCAnJylcbiAgICBsZXQgcHJldiA9ICcnXG4gICAgbGV0IHBvc3QgPSAnJ1xuICAgIGlmICh0YWJOYW1lKSB7XG4gICAgICBwcmV2ID0gYDxuLXRhYi1wYW5lIG5hbWU9XCIke3RhYk5hbWV9XCIgdGFiPVwiJHt0YWJOYW1lfVwiPmBcbiAgICAgIHBvc3QgPSAnPC9uLXRhYi1wYW5lPidcbiAgICB9XG4gICAgcmV0dXJuIGAke3ByZXZ9PEZlbmNlV3JhcHBlciBjb250ZW50PVwiJHttZC51dGlsc1xuICAgICAgLmVzY2FwZUh0bWwodG9rZW5zW2lkeF0uY29udGVudClcbiAgICAgIC5yZXBsYWNlKC9cXC9cXC8gXFxbIWNvZGUgLipcXF0vZywgJycpXG4gICAgICAudHJpbSgpfVwiPiR7cm9vdC5vdXRlckhUTUx9PC9GZW5jZVdyYXBwZXI+JHtwb3N0fWBcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXFxcXGhlYWRpbmcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvcWMtcG4tdnVlL2J1aWxkL3BsdWdpbnMvbWQvaGVhZGluZy50c1wiOy8qXG4gKiBAQXV0aG9yICAgICAgIDogcGV0ZXJcbiAqIEBEYXRlICAgICAgICAgOiAyMDI0LTExLTIzIDEwOjQ5OjM4XG4gKiBATGFzdEVkaXRvcnMgIDogaHVjaGFvbWluIGlpc2FfcGV0ZXJAMTYzLmNvbVxuICogQExhc3RFZGl0VGltZSA6IDIwMjQtMTItMDYgMjM6NTQ6NDNcbiAqIEBEZXNjcmlwdGlvbiAgOlxuICovXG5pbXBvcnQgdHlwZSB7IE1hcmtkb3duSXQgfSBmcm9tICcuL2luZGV4LnRzJ1xuXG5leHBvcnQgZGVmYXVsdCAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgY29uc3QgZGVmYXVsdFJlbmRlciA9IG1kLnJlbmRlcmVyLnJ1bGVzLmhlYWRpbmdfb3BlblxuICBtZC5yZW5kZXJlci5ydWxlcy5oZWFkaW5nX29wZW4gPSAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikgPT4ge1xuICAgIGNvbnN0IHN0ciA9IGRlZmF1bHRSZW5kZXJcbiAgICAgID8gZGVmYXVsdFJlbmRlcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKVxuICAgICAgOiBzZWxmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKVxuICAgIGNvbnN0IHsgdGFnIH0gPSB0b2tlbnNbaWR4XVxuICAgIGNvbnN0IGRpdmlkZXIgPSBgPG4tZGl2aWRlclxuICAgICAgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XCJcbiAgICAgIDpjbGFzcz1cImlzTW9iaWxlID8gJy1teC0zJyA6ICctbWwtOCAtbXItMydcIlxuICAgICAgOnN0eWxlPVwie1xuICAgICAgICB3aWR0aDogaXNNb2JpbGUgPyAnY2FsYygxMDAlICsgdmFyKC0tc3BhY2luZy02KSknIDogJ2NhbGMoMTAwJSArIHZhcigtLXNwYWNpbmctMTIpKScsXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uLWRpdmlkZXI+YFxuICAgIHJldHVybiBzdHIucmVwbGFjZSgnPicsICc+PG4tdGV4dD4nKS5yZXBsYWNlKCc8aCcsIGAke3RhZyA9PT0gJ2gyJyA/IGRpdmlkZXIgOiAnJ308bi1oYClcbiAgfVxuICBtZC5yZW5kZXJlci5ydWxlcy5oZWFkaW5nX2Nsb3NlID0gKHRva2VucywgaWR4KSA9PiB7XG4gICAgY29uc3QgeyB0YWcgfSA9IHRva2Vuc1tpZHhdXG4gICAgcmV0dXJuIGA8L24tdGV4dD48L24tJHt0YWd9PmBcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXFxcXGh0bWxfYmxvY2sudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvcWMtcG4tdnVlL2J1aWxkL3BsdWdpbnMvbWQvaHRtbF9ibG9jay50c1wiOy8qXG4gKiBAQXV0aG9yICAgICAgIDogcGV0ZXJcbiAqIEBEYXRlICAgICAgICAgOiAyMDI0LTExLTIzIDEwOjQ5OjM4XG4gKiBATGFzdEVkaXRvcnMgIDogcGV0ZXJcbiAqIEBMYXN0RWRpdFRpbWUgOiAyMDI0LTEyLTAzIDE0OjAzOjI5XG4gKiBARGVzY3JpcHRpb24gIDpcbiAqL1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkl0IH0gZnJvbSAnLi9pbmRleC50cydcblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRSZW5kZXIgPSBtZC5yZW5kZXJlci5ydWxlcy5odG1sX2Jsb2NrXG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmh0bWxfYmxvY2sgPSAoLi4uYXJnKSA9PiB7XG4gICAgY29uc3QgW3Rva2VucywgaWR4XSA9IGFyZ1xuICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2lkeF1cbiAgICBjb25zdCB0YWJOYW1lID0gdG9rZW4uYXR0ckdldCgndGFiTmFtZScpXG4gICAgdG9rZW4uYXR0clNldCgndGFiTmFtZScsICcnKVxuICAgIGxldCBwcmV2ID0gJydcbiAgICBsZXQgcG9zdCA9ICcnXG4gICAgaWYgKHRhYk5hbWUpIHtcbiAgICAgIHByZXYgPSBgPG4tdGFiLXBhbmUgbmFtZT1cIiR7dGFiTmFtZX1cIiB0YWI9XCIke3RhYk5hbWV9XCI+YFxuICAgICAgcG9zdCA9ICc8L24tdGFiLXBhbmU+J1xuICAgIH1cbiAgICByZXR1cm4gYCR7cHJldn0ke2RlZmF1bHRSZW5kZXIhKC4uLmFyZyl9JHtwb3N0fWBcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXFxcXGltYWdlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC9wbHVnaW5zL21kL2ltYWdlLnRzXCI7LypcbiAqIEBBdXRob3IgICAgICAgOiBwZXRlclxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTEtMjMgMTA6NDk6MzhcbiAqIEBMYXN0RWRpdG9ycyAgOiBwZXRlclxuICogQExhc3RFZGl0VGltZSA6IDIwMjQtMTItMDUgMTA6NTk6MzJcbiAqIEBEZXNjcmlwdGlvbiAgOlxuICovXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBub3JtYWxpemVQYXRoIH0gZnJvbSAndml0ZSdcblxuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkl0IH0gZnJvbSAnLi9pbmRleC50cydcblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmltYWdlID0gKC4uLmFyZykgPT4ge1xuICAgIGNvbnN0IHNyYyA9IGFyZ1swXVthcmdbMV1dLmF0dHJHZXQoJ3NyYycpIVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChzcmMuc3RhcnRzV2l0aCgnaW1nLycpKSB7XG4gICAgICBzdHIgPSBzcmNcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHRzL25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBhcmdbM10ucmVsYXRpdmVQYXRoIGFzIHN0cmluZ1xuICAgICAgc3RyID0gbm9ybWFsaXplUGF0aChwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKHJlbGF0aXZlUGF0aCksIHNyYykpXG4gICAgfVxuICAgIHJldHVybiBgPEltZ1dyYXBwZXIgc3JjPSR7c3RyfT48L0ltZ1dyYXBwZXI+YFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcXFxcbGluay50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9xYy1wbi12dWUvYnVpbGQvcGx1Z2lucy9tZC9saW5rLnRzXCI7LypcbiAqIEBBdXRob3IgICAgICAgOiBwZXRlclxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTEtMjMgMTA6NDk6MzhcbiAqIEBMYXN0RWRpdG9ycyAgOiBwZXRlclxuICogQExhc3RFZGl0VGltZSA6IDIwMjQtMTItMDIgMTA6NTg6MTdcbiAqIEBEZXNjcmlwdGlvbiAgOlxuICovXG5pbXBvcnQgdHlwZSB7IE1hcmtkb3duSXQgfSBmcm9tICcuL2luZGV4LnRzJ1xuXG5leHBvcnQgZGVmYXVsdCAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgY29uc3QgZGVmYXVsdFJlbmRlciA9IG1kLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlblxuICBtZC5yZW5kZXJlci5ydWxlcy5saW5rX29wZW4gPSAoLi4uYXJnKSA9PiB7XG4gICAgLy8gXHU4RkQ5XHU5MUNDXHU3NkY0XHU2M0E1XHU0RkVFXHU2NTM5IHRva2VuIFx1NzY4NCB0eXBlIFx1NEUwRFx1NzUxRlx1NjU0OFxuICAgIHJldHVybiBgJHtkZWZhdWx0UmVuZGVyISguLi5hcmcpLnJlcGxhY2UoJzxhJywgJzxuLWEnKX08bi1ncmFkaWVudC10ZXh0IHR5cGU9XCJwcmltYXJ5XCI+YFxuICB9XG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmxpbmtfY2xvc2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGA8L24tZ3JhZGllbnQtdGV4dD48L24tYT5gXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxtZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxtZFxcXFxsaXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC9wbHVnaW5zL21kL2xpc3QudHNcIjsvKlxuICogQEF1dGhvciAgICAgICA6IHBldGVyXG4gKiBARGF0ZSAgICAgICAgIDogMjAyNC0xMS0yMyAxMDo0OTozOFxuICogQExhc3RFZGl0b3JzICA6IHBldGVyXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNC0xMi0wNCAwOTo0MjoxOVxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB0eXBlIHsgTWFya2Rvd25JdCB9IGZyb20gJy4vaW5kZXgudHMnXG5cbmV4cG9ydCBkZWZhdWx0IChtZDogTWFya2Rvd25JdCkgPT4ge1xuICA7WydvcmRlcmVkX2xpc3Rfb3BlbicsICdidWxsZXRfbGlzdF9vcGVuJ10uZm9yRWFjaCgocnVsZSkgPT4ge1xuICAgIG1kLnJlbmRlcmVyLnJ1bGVzW3J1bGVdID0gKC4uLmFyZykgPT4ge1xuICAgICAgY29uc3QgW3Rva2VucywgaWR4XSA9IGFyZ1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XVxuICAgICAgY29uc3QgeyB0YWcgfSA9IHRva2VuXG4gICAgICByZXR1cm4gYDxuLSR7dGFnfT5gXG4gICAgfVxuICB9KVxuICA7WydvcmRlcmVkX2xpc3RfY2xvc2UnLCAnYnVsbGV0X2xpc3RfY2xvc2UnXS5mb3JFYWNoKChydWxlKSA9PiB7XG4gICAgbWQucmVuZGVyZXIucnVsZXNbcnVsZV0gPSAoLi4uYXJnKSA9PiB7XG4gICAgICBjb25zdCBbdG9rZW5zLCBpZHhdID0gYXJnXG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdXG4gICAgICBjb25zdCB7IHRhZyB9ID0gdG9rZW5cbiAgICAgIHJldHVybiBgPC9uLSR7dGFnfT5gXG4gICAgfVxuICB9KVxuICBtZC5yZW5kZXJlci5ydWxlcy5saXN0X2l0ZW1fb3BlbiA9ICgpID0+IHtcbiAgICByZXR1cm4gJzxuLWxpPidcbiAgfVxuICBtZC5yZW5kZXJlci5ydWxlcy5saXN0X2l0ZW1fY2xvc2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuICc8L24tbGk+J1xuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcXFxccGFyYWdyYXBoLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC9wbHVnaW5zL21kL3BhcmFncmFwaC50c1wiOy8qXG4gKiBAQXV0aG9yICAgICAgIDogcGV0ZXJcbiAqIEBEYXRlICAgICAgICAgOiAyMDI0LTExLTIzIDEwOjQ5OjM4XG4gKiBATGFzdEVkaXRvcnMgIDogcGV0ZXJcbiAqIEBMYXN0RWRpdFRpbWUgOiAyMDI0LTEyLTAyIDExOjEzOjAwXG4gKiBARGVzY3JpcHRpb24gIDpcbiAqL1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkl0IH0gZnJvbSAnLi9pbmRleC50cydcblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIG1kLnJlbmRlcmVyLnJ1bGVzLnBhcmFncmFwaF9vcGVuID0gKCkgPT4ge1xuICAgIHJldHVybiBgPG4tcD5gXG4gIH1cbiAgbWQucmVuZGVyZXIucnVsZXMucGFyYWdyYXBoX2Nsb3NlID0gKCkgPT4ge1xuICAgIHJldHVybiBgPC9uLXA+YFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxccWMtcG4tdnVlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcbWRcXFxcdGFibGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2NvZGUvcWMtcG4tdnVlL2J1aWxkL3BsdWdpbnMvbWQvdGFibGUudHNcIjsvKlxuICogQEF1dGhvciAgICAgICA6IHBldGVyXG4gKiBARGF0ZSAgICAgICAgIDogMjAyNC0xMS0yMyAxMDo0OTozOFxuICogQExhc3RFZGl0b3JzICA6IGh1Y2hhb21pbiBpaXNhX3BldGVyQDE2My5jb21cbiAqIEBMYXN0RWRpdFRpbWUgOiAyMDI0LTExLTMwIDIyOjMzOjQ3XG4gKiBARGVzY3JpcHRpb24gIDpcbiAqL1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkl0IH0gZnJvbSAnLi9pbmRleC50cydcblxuZXhwb3J0IGRlZmF1bHQgKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIG1kLnJlbmRlcmVyLnJ1bGVzLnRhYmxlX29wZW4gPSAodG9rZW5zLCBpZHgpID0+IHtcbiAgICBjb25zdCB7IHRhZyB9ID0gdG9rZW5zW2lkeF1cbiAgICByZXR1cm4gYDxuLSR7dGFnfSBzdHJpcGVkIDpzaW5nbGUtbGluZT1cImZhbHNlXCI+YFxuICB9XG4gIG1kLnJlbmRlcmVyLnJ1bGVzLnRhYmxlX2Nsb3NlID0gKHRva2VucywgaWR4KSA9PiB7XG4gICAgY29uc3QgeyB0YWcgfSA9IHRva2Vuc1tpZHhdXG4gICAgcmV0dXJuIGA8L24tJHt0YWd9PmBcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHFjLXBuLXZ1ZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXG1kXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlL3FjLXBuLXZ1ZS9idWlsZC9wbHVnaW5zL21kL2luZGV4LnRzXCI7LypcbiAqIEBBdXRob3IgICAgICAgOiBwZXRlclxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTEtMjMgMTA6NTE6NDNcbiAqIEBMYXN0RWRpdG9ycyAgOiBodWNoYW9taW4gaWlzYV9wZXRlckAxNjMuY29tXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNS0wMS0yNSAxMjozNTo1OFxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB0eXBlIHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuXG5pbXBvcnQgYmxvY2txdW90ZSBmcm9tICcuL2Jsb2NrcXVvdGUudHMnXG5pbXBvcnQgY29kZUlubGluZSBmcm9tICcuL2NvZGVJbmxpbmUudHMnXG5pbXBvcnQgY29udGFpbmVyQ29kZUdyb3VwIGZyb20gJy4vY29udGFpbmVyX2NvZGVfZ3JvdXAudHMnXG5pbXBvcnQgY29udGFpbmVyRGV0YWlsIGZyb20gJy4vY29udGFpbmVyX2RldGFpbC50cydcbmltcG9ydCBjb250YWluZXJPdGhlcnMgZnJvbSAnLi9jb250YWluZXJfb3RoZXJzLnRzJ1xuaW1wb3J0IGRlbW8gZnJvbSAnLi9kZW1vLnRzJ1xuaW1wb3J0IGZlbmNlIGZyb20gJy4vZmVuY2UudHMnXG5pbXBvcnQgaGVhZGluZyBmcm9tICcuL2hlYWRpbmcudHMnXG5pbXBvcnQgaHRtbEJsb2NrIGZyb20gJy4vaHRtbF9ibG9jay50cydcbmltcG9ydCBpbWFnZSBmcm9tICcuL2ltYWdlLnRzJ1xuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rLnRzJ1xuaW1wb3J0IGxpc3QgZnJvbSAnLi9saXN0LnRzJ1xuaW1wb3J0IHBhcmFncmFwaCBmcm9tICcuL3BhcmFncmFwaC50cydcbmltcG9ydCB0YWJsZSBmcm9tICcuL3RhYmxlLnRzJ1xuXG5leHBvcnQgdHlwZSBNYXJrZG93bkl0ID0gUGFyYW1ldGVyczxcbiAgTm9uTnVsbGFibGU8Tm9uTnVsbGFibGU8UmV0dXJuVHlwZTx0eXBlb2YgZGVmaW5lQ29uZmlnPlsnbWFya2Rvd24nXT5bJ2NvbmZpZyddPlxuPlswXVxuXG5leHBvcnQgZGVmYXVsdCAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgbWQudXNlKGhlYWRpbmcpXG4gIG1kLnVzZShwYXJhZ3JhcGgpXG4gIG1kLnVzZSh0YWJsZSlcbiAgbWQudXNlKGxpbmspXG4gIG1kLnVzZShjb2RlSW5saW5lKVxuICBtZC51c2UoZmVuY2UpXG4gIG1kLnVzZShibG9ja3F1b3RlKVxuICBtZC51c2UoY29udGFpbmVyRGV0YWlsKVxuICBtZC51c2UoY29udGFpbmVyT3RoZXJzKVxuICBtZC51c2UoY29udGFpbmVyQ29kZUdyb3VwKVxuICBtZC51c2UoaHRtbEJsb2NrKVxuICBtZC51c2UobGlzdClcbiAgbWQudXNlKGltYWdlKVxuICBtZC51c2UoZGVtbylcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcY29kZVxcXFxxYy1wbi12dWVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxwb3N0SGFuZGxlSHRtbC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS9xYy1wbi12dWUvYnVpbGQvcGx1Z2lucy9wb3N0SGFuZGxlSHRtbC50c1wiOy8qXG4gKiBAQXV0aG9yICAgICAgIDogaHVjaGFvbWluIGlpc2FfcGV0ZXJAMTYzLmNvbVxuICogQERhdGUgICAgICAgICA6IDIwMjQtMTAtMTMgMTg6MDQ6MTdcbiAqIEBMYXN0RWRpdG9ycyAgOiBodWNoYW9taW4gaWlzYV9wZXRlckAxNjMuY29tXG4gKiBATGFzdEVkaXRUaW1lIDogMjAyNC0xMi0xMyAxMzo1ODo0NVxuICogQERlc2NyaXB0aW9uICA6XG4gKi9cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnbm9kZS1odG1sLXBhcnNlcidcblxuZXhwb3J0IGRlZmF1bHQgKGNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJvb3QgPSBwYXJzZShjb2RlKVxuICBjb25zdCBhcHAgPSByb290LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKSFcbiAgY29uc3QgY3NzUmVuZGVyU3R5bGUgPSBhcHAucXVlcnlTZWxlY3RvcignY3NzLXJlbmRlci1zdHlsZScpXG4gIGlmIChjc3NSZW5kZXJTdHlsZSkge1xuICAgIGNvbnN0IGNzc1JlbmRlclN0eWxlSW5uZXIgPSBjc3NSZW5kZXJTdHlsZS5pbm5lckhUTUxcbiAgICBjb25zdCBoZWFkID0gcm9vdC5xdWVyeVNlbGVjdG9yKCdoZWFkJykhXG4gICAgaGVhZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNzc1JlbmRlclN0eWxlSW5uZXIpXG4gICAgY3NzUmVuZGVyU3R5bGUucmVtb3ZlKClcbiAgfVxuICBjb25zdCBoZWFkID0gcm9vdC5xdWVyeVNlbGVjdG9yKCdoZWFkJykhXG4gIGhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICdiZWZvcmVlbmQnLFxuICAgIGA8c2NyaXB0PlxuICAgICAgdmFyIF9obXQgPSBfaG10IHx8IFtdO1xuICAgICAgX2htdC5wdXNoKFsnX3NldEF1dG9QYWdldmlldycsIGZhbHNlXSk7XG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBobSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIGhtLnNyYyA9IFwiaHR0cHM6Ly9obS5iYWlkdS5jb20vaG0uanM/ZWQxYWI2M2JmZDAwNjdjZTc1YmE5MWFkOWI3YjRkMzdcIjtcbiAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTtcbiAgICAgICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShobSwgcyk7XG4gICAgICB9KSgpO1xuICAgIDwvc2NyaXB0PmAsXG4gIClcbiAgYXBwLmluc2VydEFkamFjZW50SFRNTChcbiAgICAnYWZ0ZXJlbmQnLFxuICAgIGA8ZGl2IGlkPVwid2FpdGluZ1wiPlxuICAgICAgPHN0eWxlPlxuICAgICAgICAjd2FpdGluZyB7XG4gICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIHotaW5kZXg6IDk5OTk5OTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxcyBlYXNlLWluLW91dDtcbiAgICAgICAgfVxuXG4gICAgICAgICN3YWl0aW5nIC5sb2FkZXIge1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICAgIHdpZHRoOiAyMDBweDtcbiAgICAgICAgICBoZWlnaHQ6IDE0MHB4O1xuICAgICAgICAgIGJhY2tncm91bmQ6ICM5Nzk3OTQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgIHBlcnNwZWN0aXZlOiAxMDAwcHg7XG5cbiAgICAgICAgICAmOjpiZWZvcmUge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgaW5zZXQ6IDEwcHg7XG4gICAgICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2Y1ZjVmNSAgbm8tcmVwZWF0O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTpcbiAgICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KCNkZGQgMTAwcHgsIHRyYW5zcGFyZW50IDApLFxuICAgICAgICAgICAgICBsaW5lYXItZ3JhZGllbnQoI2RkZCAxMDBweCwgdHJhbnNwYXJlbnQgMCksXG4gICAgICAgICAgICAgIGxpbmVhci1ncmFkaWVudCgjZGRkIDEwMHB4LCB0cmFuc3BhcmVudCAwKSxcbiAgICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KCNkZGQgMTAwcHgsIHRyYW5zcGFyZW50IDApLFxuICAgICAgICAgICAgICBsaW5lYXItZ3JhZGllbnQoI2RkZCAxMDBweCwgdHJhbnNwYXJlbnQgMCksXG4gICAgICAgICAgICAgIGxpbmVhci1ncmFkaWVudCgjZGRkIDEwMHB4LCB0cmFuc3BhcmVudCAwKTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246XG4gICAgICAgICAgICAgIDE1cHggMzBweCxcbiAgICAgICAgICAgICAgMTVweCA2MHB4LFxuICAgICAgICAgICAgICAxNXB4IDkwcHgsXG4gICAgICAgICAgICAgIDEwNXB4IDMwcHgsXG4gICAgICAgICAgICAgIDEwNXB4IDYwcHgsXG4gICAgICAgICAgICAgIDEwNXB4IDkwcHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDYwcHggMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYigwIDAgMCAvIDI1JSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAxMHB4O1xuICAgICAgICAgICAgcmlnaHQ6IDEwcHg7XG4gICAgICAgICAgICBib3R0b206IDEwcHg7XG4gICAgICAgICAgICB3aWR0aDogY2FsYyg1MCUgLSAxMHB4KTtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmIG5vLXJlcGVhdDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6XG4gICAgICAgICAgICAgIGxpbmVhci1ncmFkaWVudCgjZGRkIDEwMHB4LCB0cmFuc3BhcmVudCAwKSxcbiAgICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KCNkZGQgMTAwcHgsIHRyYW5zcGFyZW50IDApLFxuICAgICAgICAgICAgICBsaW5lYXItZ3JhZGllbnQoI2RkZCAxMDBweCwgdHJhbnNwYXJlbnQgMCk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgMzBweCwgNTAlIDYwcHgsIDUwJSAgOTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogNjBweCAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7XG4gICAgICAgICAgICBhbmltYXRpb246IHBhZ2luZyAxcyBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBwYWdpbmcge1xuICAgICAgICAgIHRvIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgtMTgwZGVnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+XG4gICAgPC9kaXY+YCxcbiAgKVxuICByZXR1cm4gcm9vdC5vdXRlckhUTUxcbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcIm5vdGVcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcdTY3MjhcdTY3OTdcdTVCNTBcdTc2ODRcdTdCMTRcdThCQjAtXHU4QkIwXHU0RjRGXHU4MUVBXHU1REYxXHU3Njg0XHU3MEI5XHU2RUY0XCIsXG4gIFwicHJvZHVjdE5hbWVcIjogXCJ2aXRlXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiXjIwLjkuMCB8fCA+PTIxLjEuMFwiLFxuICAgIFwicG5wbVwiOiBcIj49IDkuMS40XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVwcmVzcyBkZXZcIixcbiAgICBcImJ1aWxkXCI6IFwidml0ZXByZXNzIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZXByZXNzIHByZXZpZXdcIixcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXG4gICAgXCJpbnNwZWN0RXNsaW50Q29uZmlnXCI6IFwibnB4IEBlc2xpbnQvY29uZmlnLWluc3BlY3RvclwiLFxuICAgIFwiaW5zcGVjdEJ1aWxkTW9kZVwiOiBcIm5weCBzZXJ2ZSAuL2J1aWxkLy5jYWNoZS9pbnNwZWN0L2NsaWVudFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBmb3Jta2l0L2F1dG8tYW5pbWF0ZVwiOiBcIl4wLjguMlwiLFxuICAgIFwiQGdpc2N1cy92dWVcIjogXCJeMy4xLjFcIixcbiAgICBcIkBsb3R0aWVmaWxlcy9kb3Rsb3R0aWUtdnVlXCI6IFwiXjAuNS40XCIsXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTIuNC4wXCIsXG4gICAgXCJAdnVldXNlL2ludGVncmF0aW9uc1wiOiBcIl4xMi40LjBcIixcbiAgICBcImFsb3ZhXCI6IFwiXjMuMi44XCIsXG4gICAgXCJhcnRwbGF5ZXJcIjogXCJeNS4yLjFcIixcbiAgICBcImQzLWdlb1wiOiBcIl4zLjEuMVwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xM1wiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjYuMFwiLFxuICAgIFwiZ3NhcFwiOiBcIl4zLjEyLjdcIixcbiAgICBcImhhbWJ1cmdlcnNcIjogXCJeMS4yLjFcIixcbiAgICBcImxvZGFzaC1lc1wiOiBcIl40LjE3LjIxXCIsXG4gICAgXCJuYWl2ZS11aVwiOiBcIl4yLjQxLjBcIixcbiAgICBcInBpbmlhXCI6IFwiXjIuMy4wXCIsXG4gICAgXCJwaW5pYS1wbHVnaW4tcGVyc2lzdGVkc3RhdGVcIjogXCJeNC4yLjBcIixcbiAgICBcInRocmVlXCI6IFwiXjAuMTcyLjBcIixcbiAgICBcInRocmVlLmludGVyYWN0aXZlXCI6IFwiXjEuOC4wXCIsXG4gICAgXCJ1bml2ZXJzYWwtY29va2llXCI6IFwiXjcuMi4yXCIsXG4gICAgXCJ2dWUtZWNoYXJ0c1wiOiBcIl43LjAuM1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiXjMuMTQuMFwiLFxuICAgIFwiQGNzcy1yZW5kZXIvdnVlMy1zc3JcIjogXCJeMC4xNS4xNFwiLFxuICAgIFwiQGljb25pZnktanNvbi9jYXJib25cIjogXCJeMS4yLjVcIixcbiAgICBcIkBpY29uaWZ5LWpzb24vbGluZS1tZFwiOiBcIl4xLjIuNVwiLFxuICAgIFwiQGljb25pZnktanNvbi9tYXRlcmlhbC1zeW1ib2xzXCI6IFwiXjEuMi4xMlwiLFxuICAgIFwiQHN0eWxpc3RpYy9zdHlsZWxpbnQtY29uZmlnXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJAdGFpbHdpbmRjc3Mvdml0ZVwiOiBcIjQuMC4wLWJldGEuOVwiLFxuICAgIFwiQHRzY29uZmlnL25vZGUtbHRzXCI6IFwiXjIyLjAuMVwiLFxuICAgIFwiQHR5cGVzL2QzLWdlb1wiOiBcIl4zLjEuMFwiLFxuICAgIFwiQHR5cGVzL2xvZGFzaC1lc1wiOiBcIl40LjE3LjEyXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi4xMC43XCIsXG4gICAgXCJAdHlwZXMvdGhyZWVcIjogXCJeMC4xNzIuMFwiLFxuICAgIFwiQHZpdGUtcHdhL3ZpdGVwcmVzc1wiOiBcIl4wLjUuM1wiLFxuICAgIFwiQHZ1ZS90c2NvbmZpZ1wiOiBcIl4wLjcuMFwiLFxuICAgIFwiYnJvd3NlcnNsaXN0XCI6IFwiXjQuMjQuNFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuMTguMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl4xMC4wLjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tZm9ybWF0XCI6IFwiXjEuMC4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXBlcmZlY3Rpb25pc3RcIjogXCJeNC42LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNS4yLjJcIixcbiAgICBcIm1hcmtkb3duLWl0LWFuY2hvclwiOiBcIl45LjIuMFwiLFxuICAgIFwibm9kZS1odG1sLXBhcnNlclwiOiBcIl43LjAuMVwiLFxuICAgIFwib25seS1hbGxvd1wiOiBcIl4xLjIuMVwiLFxuICAgIFwicG9zdGNzcy1odG1sXCI6IFwiXjEuOC4wXCIsXG4gICAgXCJwb3N0Y3NzLW1hcmtkb3duXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjQuMlwiLFxuICAgIFwicHJldHRpZXItcGx1Z2luLXRhaWx3aW5kY3NzXCI6IFwiXjAuNi4xMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI6IFwiXjUuMTQuMFwiLFxuICAgIFwic2VydmVcIjogXCJeMTQuMi40XCIsXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuMTMuMlwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNlc3Mtb3JkZXJcIjogXCJeNS4xLjFcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtdnVlXCI6IFwiXjEuNS4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkXCI6IFwiXjM3LjAuMFwiLFxuICAgIFwic3R5bGVsaW50LXVzZS1uZXN0aW5nXCI6IFwiXjYuMC4wXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIjQuMC4wLWJldGEuOVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjcuM1wiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMTkuMC4wXCIsXG4gICAgXCJ1bnBsdWdpbi1pY29uc1wiOiBcIl4yMi4wLjBcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjI4LjAuMFwiLFxuICAgIFwidXVpZFwiOiBcIl4xMS4wLjVcIixcbiAgICBcInZpdGUtcGx1Z2luLWFsaWFzLWltcG9ydC1jaGVja2VyXCI6IFwiXjAuMS4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZW52LXBhcnNlXCI6IFwiXjEuMC4xNVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZm9udFwiOiBcIl40LjAuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4taW5zcGVjdFwiOiBcIl4wLjguOVwiLFxuICAgIFwidml0ZXByZXNzXCI6IFwiXjEuNi4zXCIsXG4gICAgXCJ2aXRlcHJlc3Mtc2lkZWJhclwiOiBcIl4xLjMwLjJcIixcbiAgICBcIndvcmtib3gtd2luZG93XCI6IFwiXjcuMy4wXCJcbiAgfSxcbiAgXCJwbnBtXCI6IHtcbiAgICBcInBlZXJEZXBlbmRlbmN5UnVsZXNcIjoge1xuICAgICAgXCJpZ25vcmVNaXNzaW5nXCI6IFtcbiAgICAgICAgXCJyZWFjdFwiLFxuICAgICAgICBcInJlYWN0LWRvbVwiXG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBU0EsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsY0FBYyxpQkFBQUEsc0JBQXFCO0FBQzVDLE9BQU8scUJBQXFCOzs7QUNKNUIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxRQUFRO0FBQ2YsT0FBT0MsV0FBVTtBQUNqQixTQUFTLE1BQU0sY0FBYztBQUM3QixTQUFTLHVCQUF1Qjs7O0FDSmhDLE9BQU8sVUFBVTtBQUNqQixPQUFPLGFBQWE7QUFDcEIsU0FBUyxTQUFTLHFCQUFxQjtBQUN2QyxTQUFTLHNCQUFzQjtBQUUvQixTQUFTLFdBQVcsR0FBbUI7QUFDckMsU0FBTyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsQ0FBQztBQUN0QztBQUVBLElBQU0sU0FBUyxXQUFXLFdBQVc7QUFDckMsSUFBTSxZQUFZO0FBRWxCLFNBQVMsd0JBQXdCQyxPQUFzQjtBQUNyRCxNQUFJQSxNQUFLLFNBQVMsV0FBVyxHQUFHO0FBQzlCLElBQUFBLFFBQU9BLE1BQUssUUFBUSxhQUFhLEVBQUU7QUFBQSxFQUNyQztBQUNBLE1BQUlBLE1BQUssU0FBUyxLQUFLLEdBQUc7QUFDeEIsSUFBQUEsUUFBT0EsTUFBSyxRQUFRLE9BQU8sRUFBRTtBQUFBLEVBQy9CO0FBQ0EsU0FBT0EsTUFBSyxNQUFNLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxHQUFHO0FBQzNDO0FBRUEsU0FBUyxZQUFZLE1BQXNCO0FBQ3pDLFNBQU8sS0FDSixLQUFLLEVBQ0wsUUFBUSxRQUFRLEVBQUUsRUFDbEIsUUFBUSx1Q0FBdUMsRUFBRSxFQUNqRCxRQUFRLG9CQUFv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QUNBLGtCQUFrQixVQUFVLEVBQUUsV0FBVyxHQUFHO0FBQzFDLGNBQU0sV0FBVyx3QkFBd0IsU0FBUyxRQUFRO0FBQzFELFlBQUksU0FBUyxnQkFBZ0IsTUFBTTtBQUNqQyxtQkFBUyxjQUFjLEdBQUcsUUFBUSxxQkFBVyxXQUFXLEtBQUssV0FBVztBQUFBLFFBQzFFO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBTTtBQUFBLFFBQ0osWUFBWSxXQUFXLHNCQUFzQjtBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNULENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsibm9ybWFsaXplUGF0aCIsICJwYXRoIiwgInBhdGgiLCAicGF0aCIsICJwYXJzZSIsICJwYXJzZSIsICJwYXJzZSIsICJwYXJzZSIsICJwYXRoIiwgIm5vcm1hbGl6ZVBhdGgiLCAibm9ybWFsaXplUGF0aCIsICJwYXRoIiwgInBhcnNlIiwgInBhcnNlIiwgImhlYWQiLCAib2JqIiwgIm5vcm1hbGl6ZVBhdGgiXQp9Cg==

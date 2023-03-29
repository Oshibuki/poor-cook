// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/vite@4.1.2_sass@1.58.3+terser@5.16.4/node_modules/vite/dist/node/index.js";
import Vue from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.2+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/vite-plugin-pages@0.28.0_vite@4.1.2/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/vite-ssg-sitemap@0.4.3/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/vite-plugin-vue-layouts@0.7.0_odivvtajfxy4ncwzzxzazp6cke/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import IconsResolver from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/unplugin-icons@0.15.3/node_modules/unplugin-icons/dist/resolver.mjs";
import Components from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/unplugin-vue-components@0.24.0_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VantResolver } from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/unplugin-vue-components@0.24.0_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import AutoImport from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/unplugin-auto-import@0.14.3_@vueuse+core@9.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import Icons from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/unplugin-icons@0.15.3/node_modules/unplugin-icons/dist/vite.mjs";
import Markdown from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/vite-plugin-vue-markdown@0.22.4_vite@4.1.2/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import Inspect from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/vite-plugin-inspect@0.7.15_vite@4.1.2/node_modules/vite-plugin-inspect/dist/index.mjs";
import Prism from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/markdown-it-prism@2.3.0/node_modules/markdown-it-prism/build/index.js";
import LinkAttributes from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import Unocss from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/unocss@0.49.7_vite@4.1.2/node_modules/unocss/dist/vite.mjs";
import legacy from "file:///C:/Users/foreach/codes/cook-dev/node_modules/.pnpm/@vitejs+plugin-legacy@4.0.1_terser@5.16.4+vite@4.1.2/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\foreach\\codes\\cook-dev";
Object.assign(process.env, {
  VITE_COMMIT_REF: process.env.CF_PAGES_COMMIT_SHA || ""
});
var vite_config_default = defineConfig({
  publicPath: "./",
  base: "./",
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    Icons({
      autoInstall: true,
      compiler: "vue3"
    }),
    legacy({
      targets: ["defaults", "not IE 11"]
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"]
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue/macros"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/store"
      ],
      vueTemplate: true,
      resolvers: [
        VantResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon"
        })
      ]
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      resolvers: [IconsResolver({
        prefix: "Icon"
      }), VantResolver()]
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    // https://github.com/antfu/vite-plugin-vue-markdown
    Markdown({
      wrapperComponent: "WrapperMd",
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism);
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
      }
    }),
    // // https://github.com/antfu/vite-plugin-pwa
    // VitePWA({
    //   // use default prompt
    //   // registerType: 'autoUpdate',
    //   registerType: 'prompt',
    //   includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
    //   manifest: {
    //     name: '今天我们来做菜',
    //     short_name: '来做菜',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: '/pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    // }),
    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect()
  ],
  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap();
    }
  },
  // https://github.com/vitest-dev/vitest
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmb3JlYWNoXFxcXGNvZGVzXFxcXGNvb2stZGV2XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmb3JlYWNoXFxcXGNvZGVzXFxcXGNvb2stZGV2XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9mb3JlYWNoL2NvZGVzL2Nvb2stZGV2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tICd2aXRlLXNzZy1zaXRlbWFwJ1xyXG5pbXBvcnQgTGF5b3V0cyBmcm9tICd2aXRlLXBsdWdpbi12dWUtbGF5b3V0cydcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXHJcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi12dWUtbWFya2Rvd24nXHJcbi8vIGltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXHJcbmltcG9ydCBQcmlzbSBmcm9tICdtYXJrZG93bi1pdC1wcmlzbSdcclxuaW1wb3J0IExpbmtBdHRyaWJ1dGVzIGZyb20gJ21hcmtkb3duLWl0LWxpbmstYXR0cmlidXRlcydcclxuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuXHJcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xyXG5cclxuT2JqZWN0LmFzc2lnbihwcm9jZXNzLmVudiwge1xyXG4gIFZJVEVfQ09NTUlUX1JFRjogcHJvY2Vzcy5lbnYuQ0ZfUEFHRVNfQ09NTUlUX1NIQSB8fCAnJyxcclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcHVibGljUGF0aDogJy4vJyxcclxuICBiYXNlOiAnLi8nLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgcGx1Z2luczogW1xyXG4gICAgSWNvbnMoe1xyXG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgICAgY29tcGlsZXI6ICd2dWUzJyxcclxuICAgIH0pLFxyXG4gICAgbGVnYWN5KHtcclxuICAgICAgdGFyZ2V0czogWydkZWZhdWx0cycsICdub3QgSUUgMTEnXSxcclxuICAgIH0pLFxyXG5cclxuICAgIFZ1ZSh7XHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcclxuICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5ub2VydS92aXRlLXBsdWdpbi1wYWdlc1xyXG4gICAgUGFnZXMoe1xyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcclxuICAgIExheW91dHMoKSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICd2dWUvbWFjcm9zJyxcclxuICAgICAgXSxcclxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgZGlyczogW1xyXG4gICAgICAgICdzcmMvY29tcG9zYWJsZXMnLFxyXG4gICAgICAgICdzcmMvc3RvcmUnLFxyXG4gICAgICBdLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcclxuICAgICAgcmVzb2x2ZXJzOiBbVmFudFJlc29sdmVyKCksXHJcbiAgICAgIC8vIEF1dG8gaW1wb3J0IGljb24gY29tcG9uZW50c1xyXG4gICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgIHByZWZpeDogJ0ljb24nLFxyXG4gICAgICAgIH0pXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIC8vIGFsbG93IGF1dG8gbG9hZCBtYXJrZG93biBjb21wb25lbnRzIHVuZGVyIGAuL3NyYy9jb21wb25lbnRzL2BcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcclxuICAgICAgLy8gYWxsb3cgYXV0byBpbXBvcnQgYW5kIHJlZ2lzdGVyIGNvbXBvbmVudHMgdXNlZCBpbiBtYXJrZG93blxyXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxyXG4gICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgcmVzb2x2ZXJzOiBbSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgcHJlZml4OiAnSWNvbicsXHJcbiAgICAgIH0pLCBWYW50UmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5vY3NzXHJcbiAgICAvLyBzZWUgdW5vY3NzLmNvbmZpZy50cyBmb3IgY29uZmlnXHJcbiAgICBVbm9jc3MoKSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duXHJcbiAgICBNYXJrZG93bih7XHJcbiAgICAgIHdyYXBwZXJDb21wb25lbnQ6ICdXcmFwcGVyTWQnLFxyXG4gICAgICBoZWFkRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgbWFya2Rvd25JdFNldHVwKG1kKSB7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9wcmlzbWpzLmNvbS9cclxuICAgICAgICBtZC51c2UoUHJpc20pXHJcbiAgICAgICAgbWQudXNlKExpbmtBdHRyaWJ1dGVzLCB7XHJcbiAgICAgICAgICBtYXRjaGVyOiAobGluazogc3RyaW5nKSA9PiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QobGluayksXHJcbiAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxyXG4gICAgICAgICAgICByZWw6ICdub29wZW5lcicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tcHdhXHJcbiAgICAvLyBWaXRlUFdBKHtcclxuICAgIC8vICAgLy8gdXNlIGRlZmF1bHQgcHJvbXB0XHJcbiAgICAvLyAgIC8vIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgLy8gICByZWdpc3RlclR5cGU6ICdwcm9tcHQnLFxyXG4gICAgLy8gICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uc3ZnJywgJ3NhZmFyaS1waW5uZWQtdGFiLnN2ZyddLFxyXG4gICAgLy8gICBtYW5pZmVzdDoge1xyXG4gICAgLy8gICAgIG5hbWU6ICdcdTRFQ0FcdTU5MjlcdTYyMTFcdTRFRUNcdTY3NjVcdTUwNUFcdTgzREMnLFxyXG4gICAgLy8gICAgIHNob3J0X25hbWU6ICdcdTY3NjVcdTUwNUFcdTgzREMnLFxyXG4gICAgLy8gICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAvLyAgICAgaWNvbnM6IFtcclxuICAgIC8vICAgICAgIHtcclxuICAgIC8vICAgICAgICAgc3JjOiAnL3B3YS0xOTJ4MTkyLnBuZycsXHJcbiAgICAvLyAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXHJcbiAgICAvLyAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgLy8gICAgICAgfSxcclxuICAgIC8vICAgICAgIHtcclxuICAgIC8vICAgICAgICAgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsXHJcbiAgICAvLyAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAvLyAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgLy8gICAgICAgfSxcclxuICAgIC8vICAgICAgIHtcclxuICAgIC8vICAgICAgICAgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsXHJcbiAgICAvLyAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAvLyAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgLy8gICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcclxuICAgIC8vICAgICAgIH0sXHJcbiAgICAvLyAgICAgXSxcclxuICAgIC8vICAgfSxcclxuICAgIC8vIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1pbnNwZWN0XHJcbiAgICAvLyBWaXNpdCBodHRwOi8vbG9jYWxob3N0OjMzMzMvX19pbnNwZWN0LyB0byBzZWUgdGhlIGluc3BlY3RvclxyXG4gICAgSW5zcGVjdCgpLFxyXG4gIF0sXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtc3NnXHJcbiAgc3NnT3B0aW9uczoge1xyXG4gICAgc2NyaXB0OiAnYXN5bmMnLFxyXG4gICAgZm9ybWF0dGluZzogJ21pbmlmeScsXHJcbiAgICBvbkZpbmlzaGVkKCkgeyBnZW5lcmF0ZVNpdGVtYXAoKSB9LFxyXG4gIH0sXHJcblxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlc3QtZGV2L3ZpdGVzdFxyXG4gIHRlc3Q6IHtcclxuICAgIGluY2x1ZGU6IFsndGVzdC8qKi8qLnRlc3QudHMnXSxcclxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgZGVwczoge1xyXG4gICAgICBpbmxpbmU6IFsnQHZ1ZScsICdAdnVldXNlJywgJ3Z1ZS1kZW1pJ10sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVIsT0FBTyxVQUFVO0FBQzFTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLGNBQWM7QUFFckIsT0FBTyxhQUFhO0FBQ3BC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

import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Profiles / Platforms / Stacks","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/adapters.md","filePath":"architecture/adapters.md","lastUpdated":null}');
const _sfc_main = { name: "architecture/adapters.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="profiles-platforms-stacks" tabindex="-1">Profiles / Platforms / Stacks <a class="header-anchor" href="#profiles-platforms-stacks" aria-label="Permalink to &quot;Profiles / Platforms / Stacks&quot;">​</a></h1><p>Adapters 把不同变化维度拆开。</p><h2 id="product-profile" tabindex="-1">Product Profile <a class="header-anchor" href="#product-profile" aria-label="Permalink to &quot;Product Profile&quot;">​</a></h2><p>Product Profile 描述产品形态。当前第一个 profile 是 <code>consumer-h5</code>。</p><p>它关注：</p><ul><li>页面结构。</li><li>需求闭环。</li><li>输入证据优先级。</li><li>H5 常见验收路径。</li></ul><p>它不应该写入具体业务页面和品牌。</p><h2 id="platform-adapter" tabindex="-1">Platform Adapter <a class="header-anchor" href="#platform-adapter" aria-label="Permalink to &quot;Platform Adapter&quot;">​</a></h2><p>Platform Adapter 描述运行平台。当前第一个 adapter 是 <code>web-mobile</code>。</p><p>它关注：</p><ul><li>移动 Web 视口。</li><li>浏览器 runtime 检查。</li><li>H5 截图验收。</li><li>环境阻塞分类。</li></ul><p>平台规则独立后，未来 mini-program、React Native 或 desktop web 可以有自己的验收模型。</p><h2 id="stack-adapter" tabindex="-1">Stack Adapter <a class="header-anchor" href="#stack-adapter" aria-label="Permalink to &quot;Stack Adapter&quot;">​</a></h2><p>Stack Adapter 描述框架和工具链。当前第一个 stack 是 <code>uni-app</code>。</p><p>它关注：</p><ul><li>Vue 3。</li><li>Vite。</li><li><code>src/pages.json</code> 页面注册。</li><li>Playwright。</li><li>项目脚本。</li></ul><h2 id="为什么拆成三层" tabindex="-1">为什么拆成三层 <a class="header-anchor" href="#为什么拆成三层" aria-label="Permalink to &quot;为什么拆成三层&quot;">​</a></h2><p><code>consumer-h5</code> 是产品形态，<code>web-mobile</code> 是运行平台，<code>uni-app</code> 是实现技术栈。三者经常一起出现，但不等价。</p><p>拆开后可以支持这样的组合演进：</p><ul><li>Consumer H5 换成其他技术栈。</li><li>Web Mobile 用于其他产品形态。</li><li>uni-app 支持其他平台验收。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("architecture/adapters.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const adapters = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  adapters as default
};

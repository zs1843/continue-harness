import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Templates / Presets","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/templates-presets.md","filePath":"architecture/templates-presets.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "architecture/templates-presets.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="templates-presets" tabindex="-1">Templates / Presets <a class="header-anchor" href="#templates-presets" aria-label="Permalink to &quot;Templates / Presets&quot;">​</a></h1><p>Templates 和 Presets 都是业务中立文件来源，但用于不同场景。</p><h2 id="templates" tabindex="-1">Templates <a class="header-anchor" href="#templates" aria-label="Permalink to &quot;Templates&quot;">​</a></h2><p><code>templates/</code> 用于接入已有项目。它提供：</p><ul><li><code>AGENTS.md</code></li><li><code>.continue-harness/project.yaml</code></li><li>输入目录 README</li><li>PRODUCT / DESIGN / CURRENT_STATUS / DECISIONS</li><li>history 和 coverage 文件</li><li>API selection</li><li>Design Token 初始文件</li></ul><p><code>init</code> 使用 templates 时会先预检，不覆盖项目已维护文件。</p><h2 id="presets" tabindex="-1">Presets <a class="header-anchor" href="#presets" aria-label="Permalink to &quot;Presets&quot;">​</a></h2><p><code>presets/consumer-h5/</code> 用于创建新项目。它包含一个可运行的 minimal uni-app H5 项目：</p><ul><li><code>package.json</code></li><li><code>src/App.vue</code></li><li><code>src/pages.json</code></li><li><code>src/pages/index/index.vue</code></li><li><code>src/services/http.ts</code></li><li>Playwright 配置和测试</li><li>Harness 项目文档和输入目录</li></ul><h2 id="为什么不放业务示例页" tabindex="-1">为什么不放业务示例页 <a class="header-anchor" href="#为什么不放业务示例页" aria-label="Permalink to &quot;为什么不放业务示例页&quot;">​</a></h2><p>业务示例页会带来错误暗示。真实项目应该从 PRD/RP/UI/API 输入中生成业务页面，而不是从模板里继承一个虚假的默认业务。</p><p>所以 preset 只创建容器、目录和工程能力。输入为空时，项目保持“等待输入”。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("architecture/templates-presets.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const templatesPresets = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  templatesPresets as default
};

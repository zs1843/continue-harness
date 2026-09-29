import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"OpenAPI","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/openapi.md","filePath":"architecture/openapi.md","lastUpdated":null}');
const _sfc_main = { name: "architecture/openapi.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="openapi" tabindex="-1">OpenAPI <a class="header-anchor" href="#openapi" aria-label="Permalink to &quot;OpenAPI&quot;">​</a></h1><p>OpenAPI 能力用于任务级接口生成。</p><h2 id="当前范围" tabindex="-1">当前范围 <a class="header-anchor" href="#当前范围" aria-label="Permalink to &quot;当前范围&quot;">​</a></h2><p>当前实现从本地 OpenAPI JSON 开始，通常来自 Apifox 官方导出。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>.continue-harness/inputs/api/</span></span>
<span class="line"><span>.continue-harness/api/selection.yaml</span></span>
<span class="line"><span>src/types/api.generated.ts</span></span>
<span class="line"><span>src/services/api.generated.ts</span></span>
<span class="line"><span>.continue-harness/api/generated.json</span></span></code></pre></div><h2 id="任务如何选择接口" tabindex="-1">任务如何选择接口 <a class="header-anchor" href="#任务如何选择接口" aria-label="Permalink to &quot;任务如何选择接口&quot;">​</a></h2><p>PRD 决定当前任务需要哪些 operationId。selection.yaml 把任务和 operationId 绑定起来。</p><p>这样做是为了避免一次性生成整个 API，也避免 Agent 根据 PRD 猜字段。</p><h2 id="生成什么" tabindex="-1">生成什么 <a class="header-anchor" href="#生成什么" aria-label="Permalink to &quot;生成什么&quot;">​</a></h2><p>生成内容包括：</p><ul><li>TypeScript request/response types。</li><li>uni.request wrapper。</li><li>managed metadata。</li></ul><h2 id="为什么保护-generated-files" tabindex="-1">为什么保护 generated files <a class="header-anchor" href="#为什么保护-generated-files" aria-label="Permalink to &quot;为什么保护 generated files&quot;">​</a></h2><p>生成文件应该保持可再生。如果开发者手工改了 generated 文件，下次生成会拒绝覆盖。</p><p>业务 mapping 应该放在 generated 层之外。这样接口契约和业务适配不会混在一起。</p><h2 id="未来范围" tabindex="-1">未来范围 <a class="header-anchor" href="#未来范围" aria-label="Permalink to &quot;未来范围&quot;">​</a></h2><p>当前不做在线 Apifox 同步、鉴权拉取、复杂 discriminator 映射和高级 media type 支持。这些属于后续 provider interface 的范围。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("architecture/openapi.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const openapi = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  openapi as default
};

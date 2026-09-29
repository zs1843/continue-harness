import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Case study","description":"","frontmatter":{},"headers":[],"relativePath":"en/showcase/case-study.md","filePath":"en/showcase/case-study.md","lastUpdated":null}');
const _sfc_main = { name: "en/showcase/case-study.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="case-study" tabindex="-1">Case study <a class="header-anchor" href="#case-study" aria-label="Permalink to &quot;Case study&quot;">​</a></h1><p>The harness repository maintains itself through the same protocol exposed to target projects:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>Developer / CI / Agent</span></span>
<span class="line"><span>          ↓</span></span>
<span class="line"><span>        CLI → Core → configuration and adapters</span></span></code></pre></div><p>The repository uses <code>developer_tooling + node + node-esm</code> internally. The first public target combination is <code>consumer-h5 + web-mobile + uni-app</code>; these are adapters, not hard-coded business rules in Core.</p><p>The remaining limitation is evidence: a complete unrelated production project run, its reports, screenshots, and measured outcomes still need to be linked before claiming broad effectiveness.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/showcase/case-study.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const caseStudy = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  caseStudy as default
};

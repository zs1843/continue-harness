import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Input protocol","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/inputs.md","filePath":"en/architecture/inputs.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/architecture/inputs.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="input-protocol" tabindex="-1">Input protocol <a class="header-anchor" href="#input-protocol" aria-label="Permalink to &quot;Input protocol&quot;">​</a></h1><p>Inputs are registered under <code>.continue-harness/inputs/</code> and described by <code>manifest.yaml</code>:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>prd/  rp/  ui/  api/  assets/</span></span></code></pre></div><p>The protocol records type, source, status, and hash. Inspection detects drift and unregistered files. Analysis extracts evidence and conflicts without modifying original input files. Tasks reference the inputs they use so snapshots remain reviewable.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/inputs.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const inputs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  inputs as default
};

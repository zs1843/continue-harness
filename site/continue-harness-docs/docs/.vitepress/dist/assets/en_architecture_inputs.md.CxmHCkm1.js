import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Input protocol","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/inputs.md","filePath":"en/architecture/inputs.md","lastUpdated":null}');
const _sfc_main = { name: "en/architecture/inputs.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="input-protocol" tabindex="-1">Input protocol <a class="header-anchor" href="#input-protocol" aria-label="Permalink to &quot;Input protocol&quot;">​</a></h1><p>Inputs are registered under <code>.continue-harness/inputs/</code> and described by <code>manifest.yaml</code>:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>prd/  rp/  ui/  api/  assets/</span></span></code></pre></div><p>The protocol records type, source, status, and hash. Inspection detects drift and unregistered files. Analysis extracts evidence and conflicts without modifying original input files. Tasks reference the inputs they use so snapshots remain reviewable.</p>', 4)
  ])]);
}
const inputs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  inputs as default
};

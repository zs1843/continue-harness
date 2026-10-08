import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Design Token details","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/design-tokens.md","filePath":"en/architecture/design-tokens.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/architecture/design-tokens.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="design-token-details" tabindex="-1">Design Token details <a class="header-anchor" href="#design-token-details" aria-label="Permalink to &quot;Design Token details&quot;">​</a></h1><p>The project should have one machine-readable Token authority, normally <code>docs/design/tokens.json</code>, with human explanation in <code>docs/design/TOKENS.md</code>.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> design</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> tokens</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> discover</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> design</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> tokens</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> inspect</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> design</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> tokens</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> diff</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span></code></pre></div><p>Discovery reports candidates from existing styles. It does not silently promote inferred values or rewrite source styles. Token changes are recorded in task snapshots and visual evidence.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/design-tokens.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const designTokens = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  designTokens as default
};

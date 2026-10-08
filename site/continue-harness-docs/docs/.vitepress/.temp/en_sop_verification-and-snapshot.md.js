import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Verification and snapshot details","description":"","frontmatter":{},"headers":[],"relativePath":"en/sop/verification-and-snapshot.md","filePath":"en/sop/verification-and-snapshot.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/sop/verification-and-snapshot.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="verification-and-snapshot-details" tabindex="-1">Verification and snapshot details <a class="header-anchor" href="#verification-and-snapshot-details" aria-label="Permalink to &quot;Verification and snapshot details&quot;">​</a></h1><p>Choose a mode by change type, then save the result:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> verify</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> feature</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> task</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> snapshot</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> T001</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --title</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> &quot;Task title&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --request</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> &quot;The user request&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span></code></pre></div><p>Reports live under <code>tmp/continue-harness/</code>. A snapshot captures changed files, verification results, Token differences, and evidence references. It excludes credentials and other sensitive values. Requirement closure must be verified, explicitly deferred, or recorded as externally blocked.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/sop/verification-and-snapshot.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const verificationAndSnapshot = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  verificationAndSnapshot as default
};

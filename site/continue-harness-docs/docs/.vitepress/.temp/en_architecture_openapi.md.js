import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"OpenAPI and input analysis","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/openapi.md","filePath":"en/architecture/openapi.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/architecture/openapi.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="openapi-and-input-analysis" tabindex="-1">OpenAPI and input analysis <a class="header-anchor" href="#openapi-and-input-analysis" aria-label="Permalink to &quot;OpenAPI and input analysis&quot;">​</a></h1><p>OpenAPI generation is task-scoped:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> api</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> inspect</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --task</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> T001</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> api</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> generate</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --task</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> T001</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --dry-run</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> api</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> generate</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --task</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> T001</span></span></code></pre></div><p>The PRD or task selects operationIds. An Apifox-exported local OpenAPI JSON supplies the transport contract. Generated TypeScript types and request wrappers are managed files; manual changes are detected by hash and are not overwritten.</p><p>Online Apifox synchronization, advanced media types, discriminator mapping, and provider-specific extensions are not implemented in the current release.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/openapi.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const openapi = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  openapi as default
};

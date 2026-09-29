import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Reproducible workflow","description":"","frontmatter":{},"headers":[],"relativePath":"en/showcase/workflow-example.md","filePath":"en/showcase/workflow-example.md","lastUpdated":null}');
const _sfc_main = { name: "en/showcase/workflow-example.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="reproducible-workflow" tabindex="-1">Reproducible workflow <a class="header-anchor" href="#reproducible-workflow" aria-label="Permalink to &quot;Reproducible workflow&quot;">​</a></h1><p>This example follows the same protocol used to maintain continue-harness itself.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#B392F0", "--shiki-dark": "#B392F0" })}">node</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> packages/cli/bin/continue-harness.mjs</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> version</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#B392F0", "--shiki-dark": "#B392F0" })}">node</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> packages/cli/bin/continue-harness.mjs</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> inspect</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#B392F0", "--shiki-dark": "#B392F0" })}">node</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> packages/cli/bin/continue-harness.mjs</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> doctor</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span></code></pre></div><p>The important property is not the specific project type. The project configuration selects the adapters and commands, while the Core produces stable inspection, diagnosis, verification, and resume output.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/showcase/workflow-example.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const workflowExample = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  workflowExample as default
};

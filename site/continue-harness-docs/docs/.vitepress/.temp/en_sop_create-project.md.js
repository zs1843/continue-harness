import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Create a project: detailed behavior","description":"","frontmatter":{},"headers":[],"relativePath":"en/sop/create-project.md","filePath":"en/sop/create-project.md","lastUpdated":null}');
const _sfc_main = { name: "en/sop/create-project.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="create-a-project-detailed-behavior" tabindex="-1">Create a project: detailed behavior <a class="header-anchor" href="#create-a-project-detailed-behavior" aria-label="Permalink to &quot;Create a project: detailed behavior&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> plan</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> create</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> my-h5</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> create</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> my-h5</span></span></code></pre></div><p>The current preset creates a minimal uni-app + Vue 3 + Vite project, Playwright runtime and visual checks, <code>.continue-harness/</code> state, project facts, history, coverage, and the aggregate <code>consumer-h5-harness</code> Skill. Dependencies are installed unless <code>--skip-install</code> is used.</p><p>Creation is intentionally separate from business intake. Add PRD, RP, UI, API, and asset evidence after the container exists, then run <code>inputs inspect</code>, <code>inputs analyze</code>, and create the first task.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/sop/create-project.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const createProject = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  createProject as default
};

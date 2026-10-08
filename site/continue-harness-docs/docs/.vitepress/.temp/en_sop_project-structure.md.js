import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Project structure details","description":"","frontmatter":{},"headers":[],"relativePath":"en/sop/project-structure.md","filePath":"en/sop/project-structure.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/sop/project-structure.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="project-structure-details" tabindex="-1">Project structure details <a class="header-anchor" href="#project-structure-details" aria-label="Permalink to &quot;Project structure details&quot;">​</a></h1><p>The generated structure separates project facts, raw inputs, task history, implementation code, and verification evidence:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>.continue-harness/       configuration, inputs, API selection, models, UI adjustments</span></span>
<span class="line"><span>docs/              product, design, decisions, status, history, coverage</span></span>
<span class="line"><span>src/               project-owned implementation</span></span>
<span class="line"><span>tests/             project-owned unit, runtime, interaction, and visual checks</span></span>
<span class="line"><span>tmp/continue-harness/  generated reports and command logs</span></span></code></pre></div><p>The exact framework directories belong to the selected Stack Adapter. Harness templates must remain business-neutral and must not replace existing project-owned files.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/sop/project-structure.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const projectStructure = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  projectStructure as default
};

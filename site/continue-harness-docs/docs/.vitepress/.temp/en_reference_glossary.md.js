import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Glossary","description":"","frontmatter":{},"headers":[],"relativePath":"en/reference/glossary.md","filePath":"en/reference/glossary.md","lastUpdated":null}');
const _sfc_main = { name: "en/reference/glossary.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="glossary" tabindex="-1">Glossary <a class="header-anchor" href="#glossary" aria-label="Permalink to &quot;Glossary&quot;">​</a></h1><table tabindex="0"><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Core</td><td>Framework-neutral runtime for configuration, diagnostics, execution, and reports</td></tr><tr><td>Product Profile</td><td>Rules caused by product shape</td></tr><tr><td>Platform Adapter</td><td>Runtime and acceptance rules</td></tr><tr><td>Stack Adapter</td><td>Framework and toolchain rules</td></tr><tr><td>Input</td><td>Registered PRD, RP, UI, API, or asset evidence</td></tr><tr><td>Task</td><td>Stable ID connecting evidence, implementation, verification, and snapshots</td></tr><tr><td>Resume</td><td>Read-only collaboration handoff state</td></tr><tr><td>UI Contract</td><td>Project-owned component, Token, and visual boundary record</td></tr><tr><td>Skill</td><td>An invokable Agent workflow</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/reference/glossary.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const glossary = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  glossary as default
};

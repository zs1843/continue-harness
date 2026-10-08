import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Core, CLI, and adapters","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/core.md","filePath":"en/architecture/core.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/architecture/core.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="core-cli-and-adapters" tabindex="-1">Core, CLI, and adapters <a class="header-anchor" href="#core-cli-and-adapters" aria-label="Permalink to &quot;Core, CLI, and adapters&quot;">​</a></h1><h2 id="core" tabindex="-1">Core <a class="header-anchor" href="#core" aria-label="Permalink to &quot;Core&quot;">​</a></h2><p>Core owns configuration loading, named command resolution, verification execution, diagnostics, input analysis, task metadata, resume state, and Markdown/JSON/log reports. It does not understand business pages, brands, API payloads, or project Token values.</p><h2 id="cli" tabindex="-1">CLI <a class="header-anchor" href="#cli" aria-label="Permalink to &quot;CLI&quot;">​</a></h2><p>The canonical entry point is <code>continue-harness</code>. <code>fe-harness</code> remains an executable compatibility alias for existing projects. The CLI exposes human-readable output and stable <code>--json</code> output for Agents and CI.</p><h2 id="adapters" tabindex="-1">Adapters <a class="header-anchor" href="#adapters" aria-label="Permalink to &quot;Adapters&quot;">​</a></h2><ul><li>A Product Profile describes checks caused by product shape. The first public profile is <code>consumer-h5</code>.</li><li>A Platform Adapter describes runtime acceptance. The first public adapter is <code>web-mobile</code>.</li><li>A Stack Adapter describes framework and toolchain integration. The first public adapter is <code>uni-app</code>.</li><li>A UI System Adapter describes component semantics and Token mapping without importing a production UI dependency.</li></ul><p>Target projects select adapters in <code>.continue-harness/project.yaml</code>; Core loads the descriptors without importing product code.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/core.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const core = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  core as default
};

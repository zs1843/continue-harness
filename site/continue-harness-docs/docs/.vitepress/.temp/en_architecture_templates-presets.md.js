import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Templates and presets","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/templates-presets.md","filePath":"en/architecture/templates-presets.md","lastUpdated":null}');
const _sfc_main = { name: "en/architecture/templates-presets.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="templates-and-presets" tabindex="-1">Templates and presets <a class="header-anchor" href="#templates-and-presets" aria-label="Permalink to &quot;Templates and presets&quot;">​</a></h1><p>Templates are business-neutral files used by <code>init</code> for an existing project. Presets are complete business-neutral project containers used by <code>create</code>.</p><p>Neither layer may contain business pages, brands, API endpoints, real credentials, or project Token values. Existing files are preflighted before any write, and project-owned changes are preserved.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/templates-presets.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const templatesPresets = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  templatesPresets as default
};

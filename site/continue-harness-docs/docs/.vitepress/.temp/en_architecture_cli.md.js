import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"CLI boundaries","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/cli.md","filePath":"en/architecture/cli.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/architecture/cli.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="cli-boundaries" tabindex="-1">CLI boundaries <a class="header-anchor" href="#cli-boundaries" aria-label="Permalink to &quot;CLI boundaries&quot;">​</a></h1><p>The canonical executable is <code>continue-harness</code>; <code>fe-harness</code> remains a compatibility alias. The CLI owns command routing, human-readable help, stable JSON output, plan previews, resource installation, and process exit semantics. Core owns execution and project protocols.</p><p>The CLI must not encode business pages, API paths, brand values, or project-private decisions. Public interface changes require compatibility review.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/cli.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cli = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  cli as default
};

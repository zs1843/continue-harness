import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Design principles","description":"","frontmatter":{},"headers":[],"relativePath":"en/background/principles.md","filePath":"en/background/principles.md","lastUpdated":null}');
const _sfc_main = { name: "en/background/principles.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="design-principles" tabindex="-1">Design principles <a class="header-anchor" href="#design-principles" aria-label="Permalink to &quot;Design principles&quot;">​</a></h1><ol><li>Project-owned facts are authoritative.</li><li>Core stays independent of product, platform, framework, and business domain.</li><li>Dry-run and read-only inspection precede mutation.</li><li>Evidence is loaded by task type instead of all at once.</li><li>Verification distinguishes business failures, environment blocks, and unconfigured checks.</li><li>Agent adapters stay thin; <code>AGENTS.md</code> remains the constraint authority.</li><li>Publishing, dependency changes, and public protocol changes require explicit approval.</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/background/principles.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const principles = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  principles as default
};

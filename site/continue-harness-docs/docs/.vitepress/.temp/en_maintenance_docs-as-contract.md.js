import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Documentation as a contract","description":"","frontmatter":{},"headers":[],"relativePath":"en/maintenance/docs-as-contract.md","filePath":"en/maintenance/docs-as-contract.md","lastUpdated":null}');
const _sfc_main = { name: "en/maintenance/docs-as-contract.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="documentation-as-a-contract" tabindex="-1">Documentation as a contract <a class="header-anchor" href="#documentation-as-a-contract" aria-label="Permalink to &quot;Documentation as a contract&quot;">​</a></h1><p>Update the docs when any of these change:</p><ul><li>public CLI commands, JSON output, or configuration schema;</li><li>Core, Profile, Platform, Stack, UI System, or UI Contract protocols;</li><li>generated file paths, task snapshot contents, or verification semantics;</li><li>Agent constraints, Skill installation, or provider adapters.</li></ul><p>Run the docs build and the workspace test suite before publishing. Keep examples business-neutral and do not copy project secrets or domain values into the documentation.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/maintenance/docs-as-contract.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const docsAsContract = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  docsAsContract as default
};

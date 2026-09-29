import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"SOP overview","description":"","frontmatter":{},"headers":[],"relativePath":"en/sop/overview.md","filePath":"en/sop/overview.md","lastUpdated":null}');
const _sfc_main = { name: "en/sop/overview.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="sop-overview" tabindex="-1">SOP overview <a class="header-anchor" href="#sop-overview" aria-label="Permalink to &quot;SOP overview&quot;">​</a></h1><p>The complete workflow is:</p><ol><li>Create or adopt a project.</li><li>Place and register source inputs.</li><li>Inspect and analyze evidence.</li><li>Create a stable task ID.</li><li>Load only the evidence needed by the task.</li><li>Implement and run the matching verification mode.</li><li>Save a snapshot, history, and current status.</li></ol><p>See the <a href="/en/guide/overview">workflow guide</a> for the short path and <a href="/en/guide/verification">verification guide</a> for the completion gates.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/sop/overview.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  overview as default
};

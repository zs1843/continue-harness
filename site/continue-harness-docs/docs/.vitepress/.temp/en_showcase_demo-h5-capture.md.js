import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Screenshots and evidence","description":"","frontmatter":{},"headers":[],"relativePath":"en/showcase/demo-h5-capture.md","filePath":"en/showcase/demo-h5-capture.md","lastUpdated":null}');
const _sfc_main = { name: "en/showcase/demo-h5-capture.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="screenshots-and-evidence" tabindex="-1">Screenshots and evidence <a class="header-anchor" href="#screenshots-and-evidence" aria-label="Permalink to &quot;Screenshots and evidence&quot;">​</a></h1><p>Screenshots are supporting evidence for runtime and visual verification, not a replacement for requirement closure.</p><p>Capture at least:</p><ul><li>the task and selected inputs;</li><li><code>inputs inspect</code> output with hashes and status;</li><li>the verification report and environment classification;</li><li>visual baselines and diffs when visual mode is configured;</li><li>the final task snapshot and next actions.</li></ul><p>Keep captures free of credentials, cookies, access tokens, and private customer data.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/showcase/demo-h5-capture.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const demoH5Capture = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  demoH5Capture as default
};

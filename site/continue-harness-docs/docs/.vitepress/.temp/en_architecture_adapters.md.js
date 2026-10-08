import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Profiles, platforms, and stacks","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/adapters.md","filePath":"en/architecture/adapters.md","lastUpdated":1790673739000}');
const _sfc_main = { name: "en/architecture/adapters.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="profiles-platforms-and-stacks" tabindex="-1">Profiles, platforms, and stacks <a class="header-anchor" href="#profiles-platforms-and-stacks" aria-label="Permalink to &quot;Profiles, platforms, and stacks&quot;">​</a></h1><p>Adapters keep changes isolated:</p><table tabindex="0"><thead><tr><th>Layer</th><th>Describes</th><th>Does not own</th></tr></thead><tbody><tr><td>Product Profile</td><td>Product-shape checks and requirement closure</td><td>Business pages or copy</td></tr><tr><td>Platform Adapter</td><td>Runtime, viewport, browser, and visual acceptance</td><td>Framework implementation</td></tr><tr><td>Stack Adapter</td><td>Framework directories, scripts, and page registration</td><td>Product rules</td></tr><tr><td>UI System Adapter</td><td>Component catalog, semantic mapping, and Token mapping</td><td>Production dependency installation</td></tr></tbody></table><p>The repository currently includes and validates <code>consumer-h5 + web-mobile + uni-app</code>. This is the initial implementation, not a Core limitation; other combinations can be added through independent Profile, Platform, and Stack Adapters.</p><h2 id="configuration-ownership" tabindex="-1">Configuration ownership <a class="header-anchor" href="#configuration-ownership" aria-label="Permalink to &quot;Configuration ownership&quot;">​</a></h2><p>Each target project owns <code>.continue-harness/project.yaml</code>. It selects adapters and maps symbolic verification steps to actual project commands. The repository&#39;s own <code>developer_tooling + node + node-esm</code> configuration describes maintenance of this repository; it is not a target-project preset.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/adapters.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const adapters = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  adapters as default
};

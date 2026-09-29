import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Profiles, platforms, and stacks","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/adapters.md","filePath":"en/architecture/adapters.md","lastUpdated":null}');
const _sfc_main = { name: "en/architecture/adapters.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="profiles-platforms-and-stacks" tabindex="-1">Profiles, platforms, and stacks <a class="header-anchor" href="#profiles-platforms-and-stacks" aria-label="Permalink to &quot;Profiles, platforms, and stacks&quot;">​</a></h1><p>Adapters keep changes isolated:</p><table tabindex="0"><thead><tr><th>Layer</th><th>Describes</th><th>Does not own</th></tr></thead><tbody><tr><td>Product Profile</td><td>Product-shape checks and requirement closure</td><td>Business pages or copy</td></tr><tr><td>Platform Adapter</td><td>Runtime, viewport, browser, and visual acceptance</td><td>Framework implementation</td></tr><tr><td>Stack Adapter</td><td>Framework directories, scripts, and page registration</td><td>Product rules</td></tr><tr><td>UI System Adapter</td><td>Component catalog, semantic mapping, and Token mapping</td><td>Production dependency installation</td></tr></tbody></table><p>The current public combination is <code>consumer-h5 + web-mobile + uni-app</code>. Other combinations are planned only after evidence from unrelated projects.</p><h2 id="configuration-ownership" tabindex="-1">Configuration ownership <a class="header-anchor" href="#configuration-ownership" aria-label="Permalink to &quot;Configuration ownership&quot;">​</a></h2><p>Each target project owns <code>.continue-harness/project.yaml</code>. It selects adapters and maps symbolic verification steps to actual project commands. The repository&#39;s own <code>developer_tooling + node + node-esm</code> configuration describes maintenance of this repository; it is not a target-project preset.</p>', 6)
  ])]);
}
const adapters = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  adapters as default
};

import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Verification modes","description":"","frontmatter":{},"headers":[],"relativePath":"en/reference/verification-modes.md","filePath":"en/reference/verification-modes.md","lastUpdated":null}');
const _sfc_main = { name: "en/reference/verification-modes.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="verification-modes" tabindex="-1">Verification modes <a class="header-anchor" href="#verification-modes" aria-label="Permalink to &quot;Verification modes&quot;">​</a></h1><table tabindex="0"><thead><tr><th>Mode</th><th>Typical use</th></tr></thead><tbody><tr><td><code>quick</code></td><td>Fast fail-fast feedback</td></tr><tr><td><code>feature</code></td><td>Completed feature gate</td></tr><tr><td><code>runtime</code></td><td>Browser startup and runtime checks</td></tr><tr><td><code>interaction</code></td><td>A configured critical interaction</td></tr><tr><td><code>visual</code></td><td>Screenshot baseline comparison</td></tr><tr><td><code>audit</code></td><td>Run all configured checks and report all failures</td></tr></tbody></table><p>Modes are symbolic names. The target project maps them to actual commands in <code>.continue-harness/project.yaml</code>, so the same workflow can work with different package managers and test runners.</p>', 3)
  ])]);
}
const verificationModes = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  verificationModes as default
};

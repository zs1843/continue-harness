import { _ as _export_sfc, o as openBlock, c as createElementBlock, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Problems solved","description":"","frontmatter":{},"headers":[],"relativePath":"en/background/problems.md","filePath":"en/background/problems.md","lastUpdated":null}');
const _sfc_main = { name: "en/background/problems.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createBaseVNode("h1", {
      id: "problems-solved",
      tabindex: "-1"
    }, [
      createTextVNode("Problems solved "),
      createBaseVNode("a", {
        class: "header-anchor",
        href: "#problems-solved",
        "aria-label": 'Permalink to "Problems solved"'
      }, "​")
    ], -1),
    createBaseVNode("p", null, "continue-harness addresses recurring collaboration failures:", -1),
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, "Requirements and design evidence are scattered across chat, files, and screenshots."),
      createBaseVNode("li", null, "Agents load too much context or start guessing when context is missing."),
      createBaseVNode("li", null, "A successful build is mistaken for complete requirement coverage."),
      createBaseVNode("li", null, "Generated API files and manual changes overwrite each other."),
      createBaseVNode("li", null, "Provider-specific Agent rules drift apart.")
    ], -1),
    createBaseVNode("p", null, "The harness responds with registered inputs, task-scoped evidence, requirement closure, managed-file protection, one constraint authority, and resumable reports.", -1)
  ])]);
}
const problems = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  problems as default
};

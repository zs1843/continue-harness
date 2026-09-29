import { _ as _export_sfc, o as openBlock, c as createElementBlock, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"CLI boundaries","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/cli.md","filePath":"en/architecture/cli.md","lastUpdated":null}');
const _sfc_main = { name: "en/architecture/cli.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createBaseVNode("h1", {
      id: "cli-boundaries",
      tabindex: "-1"
    }, [
      createTextVNode("CLI boundaries "),
      createBaseVNode("a", {
        class: "header-anchor",
        href: "#cli-boundaries",
        "aria-label": 'Permalink to "CLI boundaries"'
      }, "​")
    ], -1),
    createBaseVNode("p", null, [
      createTextVNode("The canonical executable is "),
      createBaseVNode("code", null, "continue-harness"),
      createTextVNode("; "),
      createBaseVNode("code", null, "fe-harness"),
      createTextVNode(" remains a compatibility alias. The CLI owns command routing, human-readable help, stable JSON output, plan previews, resource installation, and process exit semantics. Core owns execution and project protocols.")
    ], -1),
    createBaseVNode("p", null, "The CLI must not encode business pages, API paths, brand values, or project-private decisions. Public interface changes require compatibility review.", -1)
  ])]);
}
const cli = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  cli as default
};

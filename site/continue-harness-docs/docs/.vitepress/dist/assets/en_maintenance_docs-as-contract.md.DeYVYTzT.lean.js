import { _ as _export_sfc, o as openBlock, c as createElementBlock, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Documentation as a contract","description":"","frontmatter":{},"headers":[],"relativePath":"en/maintenance/docs-as-contract.md","filePath":"en/maintenance/docs-as-contract.md","lastUpdated":null}');
const _sfc_main = { name: "en/maintenance/docs-as-contract.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createBaseVNode("h1", {
      id: "documentation-as-a-contract",
      tabindex: "-1"
    }, [
      createTextVNode("Documentation as a contract "),
      createBaseVNode("a", {
        class: "header-anchor",
        href: "#documentation-as-a-contract",
        "aria-label": 'Permalink to "Documentation as a contract"'
      }, "​")
    ], -1),
    createBaseVNode("p", null, "Update the docs when any of these change:", -1),
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, "public CLI commands, JSON output, or configuration schema;"),
      createBaseVNode("li", null, "Core, Profile, Platform, Stack, UI System, or UI Contract protocols;"),
      createBaseVNode("li", null, "generated file paths, task snapshot contents, or verification semantics;"),
      createBaseVNode("li", null, "Agent constraints, Skill installation, or provider adapters.")
    ], -1),
    createBaseVNode("p", null, "Run the docs build and the workspace test suite before publishing. Keep examples business-neutral and do not copy project secrets or domain values into the documentation.", -1)
  ])]);
}
const docsAsContract = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  docsAsContract as default
};

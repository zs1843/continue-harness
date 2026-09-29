import { _ as _export_sfc, o as openBlock, c as createElementBlock, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Templates and presets","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/templates-presets.md","filePath":"en/architecture/templates-presets.md","lastUpdated":null}');
const _sfc_main = { name: "en/architecture/templates-presets.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createBaseVNode("h1", {
      id: "templates-and-presets",
      tabindex: "-1"
    }, [
      createTextVNode("Templates and presets "),
      createBaseVNode("a", {
        class: "header-anchor",
        href: "#templates-and-presets",
        "aria-label": 'Permalink to "Templates and presets"'
      }, "​")
    ], -1),
    createBaseVNode("p", null, [
      createTextVNode("Templates are business-neutral files used by "),
      createBaseVNode("code", null, "init"),
      createTextVNode(" for an existing project. Presets are complete business-neutral project containers used by "),
      createBaseVNode("code", null, "create"),
      createTextVNode(".")
    ], -1),
    createBaseVNode("p", null, "Neither layer may contain business pages, brands, API endpoints, real credentials, or project Token values. Existing files are preflighted before any write, and project-owned changes are preserved.", -1)
  ])]);
}
const templatesPresets = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  templatesPresets as default
};

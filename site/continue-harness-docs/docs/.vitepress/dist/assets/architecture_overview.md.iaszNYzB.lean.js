import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a3 as createStaticVNode, E as createVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"架构总览","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/overview.md","filePath":"architecture/overview.md","lastUpdated":null}');
const _sfc_main = { name: "architecture/overview.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ZoomableImage = resolveComponent("ZoomableImage");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 7)),
    createVNode(_component_ZoomableImage, {
      src: "/ai-architecture.svg",
      alt: "continue-harness AI 协作架构",
      caption: "点击图片放大；放大后可滚轮缩放、拖拽平移、双击重置，按 Esc 关闭。"
    }),
    _cache[1] || (_cache[1] = createStaticVNode("", 9))
  ]);
}
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  overview as default
};

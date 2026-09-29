import { _ as _export_sfc, o as openBlock, c as createElementBlock, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Why use a harness?","description":"","frontmatter":{},"headers":[],"relativePath":"en/background/why-harness.md","filePath":"en/background/why-harness.md","lastUpdated":null}');
const _sfc_main = { name: "en/background/why-harness.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createBaseVNode("h1", {
      id: "why-use-a-harness",
      tabindex: "-1"
    }, [
      createTextVNode("Why use a harness? "),
      createBaseVNode("a", {
        class: "header-anchor",
        href: "#why-use-a-harness",
        "aria-label": 'Permalink to "Why use a harness?"'
      }, "​")
    ], -1),
    createBaseVNode("p", null, "AI-assisted development fails predictably when facts stay in chat, agents read inconsistent rules, and completion is inferred from a successful build. A harness makes those facts and checks durable.", -1),
    createBaseVNode("p", null, "continue-harness focuses on four problems:", -1),
    createBaseVNode("ol", null, [
      createBaseVNode("li", null, "Evidence is registered instead of remaining in scattered tools and messages."),
      createBaseVNode("li", null, "Tasks have stable IDs, snapshots, and history."),
      createBaseVNode("li", null, "Verification results distinguish business failures, environment blocks, and unconfigured checks."),
      createBaseVNode("li", null, "A new Agent can resume from project facts, Git changes, reports, and next actions.")
    ], -1),
    createBaseVNode("p", null, "The harness is useful when work is long-lived, multi-agent, or needs an auditable handoff. It stays out of business decisions and project-owned design values.", -1)
  ])]);
}
const whyHarness = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  whyHarness as default
};

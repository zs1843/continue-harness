import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Why use a harness?","description":"","frontmatter":{},"headers":[],"relativePath":"en/background/why-harness.md","filePath":"en/background/why-harness.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/background/why-harness.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="why-use-a-harness" tabindex="-1">Why use a harness? <a class="header-anchor" href="#why-use-a-harness" aria-label="Permalink to &quot;Why use a harness?&quot;">​</a></h1><p>AI-assisted development fails predictably when facts stay in chat, agents read inconsistent rules, and completion is inferred from a successful build. A harness makes those facts and checks durable.</p><p>continue-harness focuses on four problems:</p><ol><li>Evidence is registered instead of remaining in scattered tools and messages.</li><li>Tasks have stable IDs, snapshots, and history.</li><li>Verification results distinguish business failures, environment blocks, and unconfigured checks.</li><li>A new Agent can resume from project facts, Git changes, reports, and next actions.</li></ol><p>The harness is useful when work is long-lived, multi-agent, or needs an auditable handoff. It stays out of business decisions and project-owned design values.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/background/why-harness.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const whyHarness = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  whyHarness as default
};

import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Agent collaboration rules","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/agent-workflow.md","filePath":"en/guide/agent-workflow.md","lastUpdated":null}');
const _sfc_main = { name: "en/guide/agent-workflow.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="agent-collaboration-rules" tabindex="-1">Agent collaboration rules <a class="header-anchor" href="#agent-collaboration-rules" aria-label="Permalink to &quot;Agent collaboration rules&quot;">​</a></h1><h2 id="one-constraint-authority" tabindex="-1">One constraint authority <a class="header-anchor" href="#one-constraint-authority" aria-label="Permalink to &quot;One constraint authority&quot;">​</a></h2><p><code>AGENTS.md</code> is the project constraint body. <code>CLAUDE.md</code> and the Cursor rule are provider adapters, not duplicate rule sets. Skills are invokable workflows and cannot override project constraints.</p><h2 id="recommended-execution-order" tabindex="-1">Recommended execution order <a class="header-anchor" href="#recommended-execution-order" aria-label="Permalink to &quot;Recommended execution order&quot;">​</a></h2><ol><li>Read <code>AGENTS.md</code>, <code>.continue-harness/project.yaml</code>, and project fact documents.</li><li>Run <code>inspect</code> and <code>doctor</code> to check readiness.</li><li>Load the PRD/RP/UI/API evidence attached to the current task instead of all inputs.</li><li>Implement within the project&#39;s existing directory and dependency boundaries.</li><li>Select a verification mode by change type; retry the same cause at most twice.</li><li>Update status, decisions, history, and the task snapshot.</li><li>End the conversation with verification results, remaining risks, and numbered next actions.</li></ol><h2 id="evidence-by-task-type" tabindex="-1">Evidence by task type <a class="header-anchor" href="#evidence-by-task-type" aria-label="Permalink to &quot;Evidence by task type&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Task</th><th>Read first</th></tr></thead><tbody><tr><td>Business implementation</td><td>PRODUCT, PRD, RP, input manifest</td></tr><tr><td>UI adjustment</td><td>DESIGN, Tokens, UI Contract, UI input, visual reports</td></tr><tr><td>API integration</td><td>API input, <code>selection.yaml</code>, OpenAPI snapshot</td></tr><tr><td>Architecture change</td><td>ARCHITECTURE, DECISIONS, relevant history</td></tr></tbody></table><h2 id="human-approval-boundaries" tabindex="-1">Human approval boundaries <a class="header-anchor" href="#human-approval-boundaries" aria-label="Permalink to &quot;Human approval boundaries&quot;">​</a></h2><p>People confirm authoritative business facts, input conflicts, deferrals and external blocks, protected component or Token boundaries, and changes to production dependencies, public CLI behavior, or publishing. Agents can automate read-only checks, plan previews, implementation, and authorized verification.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/guide/agent-workflow.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const agentWorkflow = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  agentWorkflow as default
};

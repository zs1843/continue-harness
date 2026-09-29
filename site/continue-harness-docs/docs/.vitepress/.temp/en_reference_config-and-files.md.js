import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Configuration and files","description":"","frontmatter":{},"headers":[],"relativePath":"en/reference/config-and-files.md","filePath":"en/reference/config-and-files.md","lastUpdated":null}');
const _sfc_main = { name: "en/reference/config-and-files.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="configuration-and-files" tabindex="-1">Configuration and files <a class="header-anchor" href="#configuration-and-files" aria-label="Permalink to &quot;Configuration and files&quot;">​</a></h1><h2 id="project-configuration" tabindex="-1">Project configuration <a class="header-anchor" href="#project-configuration" aria-label="Permalink to &quot;Project configuration&quot;">​</a></h2><p>Every target project owns:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>.continue-harness/project.yaml</span></span></code></pre></div><p>The file selects <code>product_type</code>, platforms, stack, project facts, named commands, and verification modes. The repository&#39;s configuration describes the harness itself and is not copied as a target project&#39;s business rules.</p><h2 id="durable-project-state" tabindex="-1">Durable project state <a class="header-anchor" href="#durable-project-state" aria-label="Permalink to &quot;Durable project state&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Path</th><th>Purpose</th></tr></thead><tbody><tr><td><code>.continue-harness/inputs/</code></td><td>Registered PRD/RP/UI/API/assets evidence</td></tr><tr><td><code>.continue-harness/api/selection.yaml</code></td><td>Task-scoped operationId selection</td></tr><tr><td><code>.continue-harness/models/</code></td><td>Page Flow and Layout Spec models</td></tr><tr><td><code>.continue-harness/ui/adjustments.yaml</code></td><td>Structured visual adjustments</td></tr><tr><td><code>docs/history/</code></td><td>PRD and implementation history</td></tr><tr><td><code>docs/IMPLEMENTATION_COVERAGE.md</code></td><td>Requirement closure</td></tr><tr><td><code>tmp/continue-harness/</code></td><td>Verification reports and logs</td></tr></tbody></table><p>Generated artifacts and dependency directories are ignored by Git. Secrets remain project-owned and must not enter templates, snapshots, or reports.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/reference/config-and-files.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const configAndFiles = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  configAndFiles as default
};

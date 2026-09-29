import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Architecture overview","description":"","frontmatter":{},"headers":[],"relativePath":"en/architecture/overview.md","filePath":"en/architecture/overview.md","lastUpdated":null}');
const _sfc_main = { name: "en/architecture/overview.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="architecture-overview" tabindex="-1">Architecture overview <a class="header-anchor" href="#architecture-overview" aria-label="Permalink to &quot;Architecture overview&quot;">​</a></h1><p>continue-harness composes target-project behavior from:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>Core</span></span>
<span class="line"><span>  + Product Profile</span></span>
<span class="line"><span>  + Platform Adapter</span></span>
<span class="line"><span>  + Stack Adapter</span></span>
<span class="line"><span>  + optional UI System Adapter</span></span>
<span class="line"><span>  + project-owned configuration</span></span></code></pre></div><h2 id="dependency-direction" tabindex="-1">Dependency direction <a class="header-anchor" href="#dependency-direction" aria-label="Permalink to &quot;Dependency direction&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>CLI → Core</span></span>
<span class="line"><span>Core → configuration only</span></span>
<span class="line"><span>Project configuration → Profile + Platform + Stack selection</span></span>
<span class="line"><span>Profiles / Platforms / Stacks → declarative descriptors</span></span>
<span class="line"><span>Examples → public CLI behavior</span></span>
<span class="line"><span>Tests → Core and CLI</span></span></code></pre></div><p>Core does not import a profile, platform, stack, example, or target project. This is the boundary that keeps generic collaboration capabilities independent from product rules.</p><h2 id="repository-map" tabindex="-1">Repository map <a class="header-anchor" href="#repository-map" aria-label="Permalink to &quot;Repository map&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Path</th><th>Responsibility</th></tr></thead><tbody><tr><td><code>packages/core/</code></td><td>Configuration, diagnostics, input analysis, execution, reports, resume</td></tr><tr><td><code>packages/cli/</code></td><td>Public command line and JSON protocol</td></tr><tr><td><code>profiles/</code></td><td>Product-shape verification descriptors</td></tr><tr><td><code>platforms/</code></td><td>Runtime and acceptance descriptors</td></tr><tr><td><code>stacks/</code></td><td>Framework and toolchain descriptors</td></tr><tr><td><code>ui-systems/</code></td><td>Optional UI System adapters</td></tr><tr><td><code>templates/</code></td><td>Business-neutral files for existing projects</td></tr><tr><td><code>presets/</code></td><td>New-project containers</td></tr><tr><td><code>skills/</code></td><td>Agent workflows</td></tr><tr><td><code>schemas/</code></td><td>Public configuration protocol</td></tr><tr><td><code>tests/</code></td><td>Core, CLI, and orchestration tests</td></tr></tbody></table><h2 id="safety-boundaries" tabindex="-1">Safety boundaries <a class="header-anchor" href="#safety-boundaries" aria-label="Permalink to &quot;Safety boundaries&quot;">​</a></h2><p>Initialization supports dry-run and preflights every target before writing. Doctor is read-only. Credentials remain project-owned. API generation is task-scoped and protects manually changed generated files. Publishing and remote operations require explicit approval.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/architecture/overview.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  overview as default
};

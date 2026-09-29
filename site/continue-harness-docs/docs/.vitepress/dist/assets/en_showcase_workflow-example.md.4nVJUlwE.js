import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Reproducible workflow","description":"","frontmatter":{},"headers":[],"relativePath":"en/showcase/workflow-example.md","filePath":"en/showcase/workflow-example.md","lastUpdated":null}');
const _sfc_main = { name: "en/showcase/workflow-example.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="reproducible-workflow" tabindex="-1">Reproducible workflow <a class="header-anchor" href="#reproducible-workflow" aria-label="Permalink to &quot;Reproducible workflow&quot;">​</a></h1><p>This example follows the same protocol used to maintain continue-harness itself.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> packages/cli/bin/continue-harness.mjs</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> version</span></span>\n<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> packages/cli/bin/continue-harness.mjs</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> inspect</span><span style="--shiki-light:#79B8FF;--shiki-dark:#79B8FF;"> --json</span></span>\n<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> packages/cli/bin/continue-harness.mjs</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> doctor</span><span style="--shiki-light:#79B8FF;--shiki-dark:#79B8FF;"> --json</span></span></code></pre></div><p>The important property is not the specific project type. The project configuration selects the adapters and commands, while the Core produces stable inspection, diagnosis, verification, and resume output.</p>', 4)
  ])]);
}
const workflowExample = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  workflowExample as default
};

import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Project structure details","description":"","frontmatter":{},"headers":[],"relativePath":"en/sop/project-structure.md","filePath":"en/sop/project-structure.md","lastUpdated":null}');
const _sfc_main = { name: "en/sop/project-structure.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="project-structure-details" tabindex="-1">Project structure details <a class="header-anchor" href="#project-structure-details" aria-label="Permalink to &quot;Project structure details&quot;">​</a></h1><p>The generated structure separates project facts, raw inputs, task history, implementation code, and verification evidence:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>.continue-harness/       configuration, inputs, API selection, models, UI adjustments</span></span>\n<span class="line"><span>docs/              product, design, decisions, status, history, coverage</span></span>\n<span class="line"><span>src/               project-owned implementation</span></span>\n<span class="line"><span>tests/             project-owned unit, runtime, interaction, and visual checks</span></span>\n<span class="line"><span>tmp/continue-harness/  generated reports and command logs</span></span></code></pre></div><p>The exact framework directories belong to the selected Stack Adapter. Harness templates must remain business-neutral and must not replace existing project-owned files.</p>', 4)
  ])]);
}
const projectStructure = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  projectStructure as default
};

import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Task and implementation details","description":"","frontmatter":{},"headers":[],"relativePath":"en/sop/task-and-implementation.md","filePath":"en/sop/task-and-implementation.md","lastUpdated":null}');
const _sfc_main = { name: "en/sop/task-and-implementation.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="task-and-implementation-details" tabindex="-1">Task and implementation details <a class="header-anchor" href="#task-and-implementation-details" aria-label="Permalink to &quot;Task and implementation details&quot;">​</a></h1><p>Create a task before implementation so evidence, files, verification, and handoff use the same ID:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#F97583;--shiki-dark:#F97583;">continue</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;">-harness</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> task</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#79B8FF;--shiki-dark:#79B8FF;"> --title</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> &quot;Implement the scoped change&quot;</span><span style="--shiki-light:#79B8FF;--shiki-dark:#79B8FF;"> --json</span></span>\n<span class="line"><span style="--shiki-light:#F97583;--shiki-dark:#F97583;">continue</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;">-harness</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> resume</span><span style="--shiki-light:#79B8FF;--shiki-dark:#79B8FF;"> --json</span></span></code></pre></div><p>Read evidence by task type: PRD/RP for business work, DESIGN/Tokens/UI Contract for UI work, OpenAPI and <code>selection.yaml</code> for API work, and architecture decisions for structural work. Keep page, component, service, repository, store, and utility boundaries owned by the target project.</p>', 4)
  ])]);
}
const taskAndImplementation = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  taskAndImplementation as default
};

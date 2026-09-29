import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Case study","description":"","frontmatter":{},"headers":[],"relativePath":"en/showcase/case-study.md","filePath":"en/showcase/case-study.md","lastUpdated":null}');
const _sfc_main = { name: "en/showcase/case-study.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="case-study" tabindex="-1">Case study <a class="header-anchor" href="#case-study" aria-label="Permalink to &quot;Case study&quot;">​</a></h1><p>The harness repository maintains itself through the same protocol exposed to target projects:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>Developer / CI / Agent</span></span>\n<span class="line"><span>          ↓</span></span>\n<span class="line"><span>        CLI → Core → configuration and adapters</span></span></code></pre></div><p>The repository uses <code>developer_tooling + node + node-esm</code> internally. The first public target combination is <code>consumer-h5 + web-mobile + uni-app</code>; these are adapters, not hard-coded business rules in Core.</p><p>The remaining limitation is evidence: a complete unrelated production project run, its reports, screenshots, and measured outcomes still need to be linked before claiming broad effectiveness.</p>', 5)
  ])]);
}
const caseStudy = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  caseStudy as default
};

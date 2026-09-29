import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Build and deploy the docs","description":"","frontmatter":{},"headers":[],"relativePath":"en/deploy/build.md","filePath":"en/deploy/build.md","lastUpdated":null}');
const _sfc_main = { name: "en/deploy/build.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="build-and-deploy-the-docs" tabindex="-1">Build and deploy the docs <a class="header-anchor" href="#build-and-deploy-the-docs" aria-label="Permalink to &quot;Build and deploy the docs&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#79B8FF;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> site/continue-harness-docs</span></span>\n<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> install</span></span>\n<span class="line"><span style="--shiki-light:#B392F0;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#9ECBFF;--shiki-dark:#9ECBFF;"> docs:build</span></span></code></pre></div><p>The static output is written to:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/.vitepress/dist/</span></span></code></pre></div><p>Preview it locally with <code>npm run docs:preview</code>. Any static host that serves the generated directory can host the documentation site.</p>', 5)
  ])]);
}
const build = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  build as default
};

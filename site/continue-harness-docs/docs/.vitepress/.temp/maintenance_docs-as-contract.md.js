import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"文档维护规则","description":"","frontmatter":{},"headers":[],"relativePath":"maintenance/docs-as-contract.md","filePath":"maintenance/docs-as-contract.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "maintenance/docs-as-contract.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="文档维护规则" tabindex="-1">文档维护规则 <a class="header-anchor" href="#文档维护规则" aria-label="Permalink to &quot;文档维护规则&quot;">​</a></h1><p>这份文档应该和 Harness 一起演进，但不需要每次内部实现改动都更新。</p><h2 id="必须更新文档的情况" tabindex="-1">必须更新文档的情况 <a class="header-anchor" href="#必须更新文档的情况" aria-label="Permalink to &quot;必须更新文档的情况&quot;">​</a></h2><ul><li>CLI 命令、参数、输出或默认帮助变化。</li><li><code>create</code> 或 <code>init</code> 生成内容变化。</li><li><code>.continue-harness/project.yaml</code> schema 或配置语义变化。</li><li>Profile、Platform、Stack 能力变化。</li><li>Agent Skill 读取顺序或工作流变化。</li><li>Doctor 检查、verify mode、报告格式变化。</li><li>OpenAPI、UI System、Design Token 等专项能力变化。</li><li>当前状态、限制或 roadmap 明显变化。</li></ul><h2 id="可以不更新文档的情况" tabindex="-1">可以不更新文档的情况 <a class="header-anchor" href="#可以不更新文档的情况" aria-label="Permalink to &quot;可以不更新文档的情况&quot;">​</a></h2><ul><li>纯内部重构，没有行为变化。</li><li>测试实现方式调整，但用户可见结果不变。</li><li>修复拼写、格式化或局部代码风格。</li></ul><h2 id="推荐变更习惯" tabindex="-1">推荐变更习惯 <a class="header-anchor" href="#推荐变更习惯" aria-label="Permalink to &quot;推荐变更习惯&quot;">​</a></h2><p>提交 Harness 行为改动时，把相关文档改动放在同一个 PR 或同一组提交里。这样文档不是额外宣传材料，而是工程验收的一部分。</p><h2 id="文档站构建检查" tabindex="-1">文档站构建检查 <a class="header-anchor" href="#文档站构建检查" aria-label="Permalink to &quot;文档站构建检查&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> site/continue-harness-docs</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#B392F0", "--shiki-dark": "#B392F0" })}">pnpm</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> docs:build</span></span></code></pre></div><p>如果本地没有安装依赖，先运行：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#B392F0", "--shiki-dark": "#B392F0" })}">pnpm</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> install</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("maintenance/docs-as-contract.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const docsAsContract = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  docsAsContract as default
};

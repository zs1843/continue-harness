import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"配置与文件","description":"","frontmatter":{},"headers":[],"relativePath":"reference/config-and-files.md","filePath":"reference/config-and-files.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "reference/config-and-files.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="配置与文件" tabindex="-1">配置与文件 <a class="header-anchor" href="#配置与文件" aria-label="Permalink to &quot;配置与文件&quot;">​</a></h1><h2 id="项目配置" tabindex="-1">项目配置 <a class="header-anchor" href="#项目配置" aria-label="Permalink to &quot;项目配置&quot;">​</a></h2><p>入口文件：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>.continue-harness/project.yaml</span></span></code></pre></div><p>它声明：</p><ul><li>Harness 包和版本。</li><li>项目名称和产品类型。</li><li>platform 选择。</li><li>stack adapter。</li><li>facts 文件路径。</li><li>命令映射。</li><li>verify modes。</li><li>可选 sources、ui、api 配置。</li></ul><h2 id="关键事实文件" tabindex="-1">关键事实文件 <a class="header-anchor" href="#关键事实文件" aria-label="Permalink to &quot;关键事实文件&quot;">​</a></h2><table tabindex="0"><thead><tr><th>文件</th><th>作用</th></tr></thead><tbody><tr><td><code>AGENTS.md</code></td><td>项目唯一约束本体</td></tr><tr><td><code>docs/PROJECT_MAP.md</code></td><td>模块地图</td></tr><tr><td><code>docs/CURRENT_STATUS.md</code></td><td>当前状态和限制</td></tr><tr><td><code>docs/PRODUCT.md</code></td><td>产品事实</td></tr><tr><td><code>docs/DESIGN.md</code></td><td>设计事实</td></tr><tr><td><code>docs/DECISIONS.md</code></td><td>长期决策</td></tr><tr><td><code>docs/IMPLEMENTATION_COVERAGE.md</code></td><td>需求覆盖</td></tr></tbody></table><h2 id="生成报告" tabindex="-1">生成报告 <a class="header-anchor" href="#生成报告" aria-label="Permalink to &quot;生成报告&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>tmp/continue-harness/</span></span></code></pre></div><p>该目录被 Git 忽略。报告可以作为本地调试和 CI artifact。</p><h2 id="生成接口文件" tabindex="-1">生成接口文件 <a class="header-anchor" href="#生成接口文件" aria-label="Permalink to &quot;生成接口文件&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>src/types/api.generated.ts</span></span>
<span class="line"><span>src/services/api.generated.ts</span></span>
<span class="line"><span>.continue-harness/api/generated.json</span></span></code></pre></div><p>这些文件受 managed metadata 保护。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("reference/config-and-files.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const configAndFiles = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  configAndFiles as default
};

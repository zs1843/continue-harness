import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"术语表","description":"","frontmatter":{},"headers":[],"relativePath":"reference/glossary.md","filePath":"reference/glossary.md","lastUpdated":null}');
const _sfc_main = { name: "reference/glossary.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="术语表" tabindex="-1">术语表 <a class="header-anchor" href="#术语表" aria-label="Permalink to &quot;术语表&quot;">​</a></h1><h2 id="harness" tabindex="-1">Harness <a class="header-anchor" href="#harness" aria-label="Permalink to &quot;Harness&quot;">​</a></h2><p>一套围绕项目事实、约束、验证和留痕的工程协议。</p><h2 id="core" tabindex="-1">Core <a class="header-anchor" href="#core" aria-label="Permalink to &quot;Core&quot;">​</a></h2><p>业务无关运行时，负责配置、诊断、验证、报告和安全写入。</p><h2 id="product-profile" tabindex="-1">Product Profile <a class="header-anchor" href="#product-profile" aria-label="Permalink to &quot;Product Profile&quot;">​</a></h2><p>产品形态规则，比如 Consumer H5。</p><h2 id="platform-adapter" tabindex="-1">Platform Adapter <a class="header-anchor" href="#platform-adapter" aria-label="Permalink to &quot;Platform Adapter&quot;">​</a></h2><p>运行平台规则，比如 Web Mobile。</p><h2 id="stack-adapter" tabindex="-1">Stack Adapter <a class="header-anchor" href="#stack-adapter" aria-label="Permalink to &quot;Stack Adapter&quot;">​</a></h2><p>框架和工具链规则，比如 uni-app。</p><h2 id="input" tabindex="-1">Input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;Input&quot;">​</a></h2><p>原始证据，包括 PRD、RP、UI、API 和 assets。</p><h2 id="design-token" tabindex="-1">Design Token <a class="header-anchor" href="#design-token" aria-label="Permalink to &quot;Design Token&quot;">​</a></h2><p>项目唯一机器可读视觉真值。它保存颜色、字号、间距、圆角、阴影、层级和动效等语义值，并记录来源状态。</p><h2 id="token-authority" tabindex="-1">Token Authority <a class="header-anchor" href="#token-authority" aria-label="Permalink to &quot;Token Authority&quot;">​</a></h2><p>Token 取值的权威来源。优先级为：高保真 UI、RP、用户临时视觉要求、项目既有 Token、DESIGN 原则、Harness 默认值、Agent 推断。</p><h2 id="requirement-closure" tabindex="-1">Requirement Closure <a class="header-anchor" href="#requirement-closure" aria-label="Permalink to &quot;Requirement Closure&quot;">​</a></h2><p>需求闭环。要求 PRD/RP 中可达页面、状态、动作和返回路径都被验证、延期或记录为外部阻塞。</p><h2 id="managed-file" tabindex="-1">Managed File <a class="header-anchor" href="#managed-file" aria-label="Permalink to &quot;Managed File&quot;">​</a></h2><p>由 Harness 生成并带 metadata 保护的文件。手工修改后，后续生成应拒绝覆盖。</p><h2 id="aggregate-skill" tabindex="-1">Aggregate Skill <a class="header-anchor" href="#aggregate-skill" aria-label="Permalink to &quot;Aggregate Skill&quot;">​</a></h2><p>默认安装的聚合工作流 Skill，例如 <code>consumer-h5-harness</code>。</p><h2 id="command-specific-skill" tabindex="-1">Command-specific Skill <a class="header-anchor" href="#command-specific-skill" aria-label="Permalink to &quot;Command-specific Skill&quot;">​</a></h2><p>针对单个命令或专项能力的 Skill，例如 <code>continue-harness-api</code>、<code>continue-harness-design-tokens</code>。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("reference/glossary.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const glossary = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  glossary as default
};

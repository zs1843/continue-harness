import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"架构总览","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/overview.md","filePath":"architecture/overview.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "architecture/overview.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ZoomableImage = resolveComponent("ZoomableImage");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="架构总览" tabindex="-1">架构总览 <a class="header-anchor" href="#架构总览" aria-label="Permalink to &quot;架构总览&quot;">​</a></h1><p>continue-harness 使用组合模型：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>Core</span></span>
<span class="line"><span>  + Product Profile</span></span>
<span class="line"><span>  + Platform Adapter</span></span>
<span class="line"><span>  + Stack Adapter</span></span>
<span class="line"><span>  + optional UI System Adapter</span></span>
<span class="line"><span>  + Project-owned configuration</span></span></code></pre></div><h2 id="依赖方向" tabindex="-1">依赖方向 <a class="header-anchor" href="#依赖方向" aria-label="Permalink to &quot;依赖方向&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>CLI -&gt; Core</span></span>
<span class="line"><span>Core -&gt; configuration only</span></span>
<span class="line"><span>Project configuration -&gt; Profile + Platform + Stack selection</span></span>
<span class="line"><span>Profiles / Platforms / Stacks -&gt; declarative descriptors</span></span>
<span class="line"><span>Examples -&gt; public CLI behavior</span></span>
<span class="line"><span>Tests -&gt; Core and CLI</span></span></code></pre></div><p>Core 不导入 Profile、Platform、Stack、example 或目标项目。这是业务无关能力的关键。</p><h2 id="ai-协作架构图" tabindex="-1">AI 协作架构图 <a class="header-anchor" href="#ai-协作架构图" aria-label="Permalink to &quot;AI 协作架构图&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_ZoomableImage, {
    src: "/ai-architecture.svg",
    alt: "continue-harness AI 协作架构",
    caption: "点击图片放大；放大后可滚轮缩放、拖拽平移、双击重置，按 Esc 关闭。"
  }, null, _parent));
  _push(`<p>这张图表达三条边界：</p><ul><li>人负责确认权威事实，包括业务目标、视觉来源、接口选择、冲突和延期。</li><li>Agent 负责遵循 <code>AGENTS.md</code> 和 Skill 工作流，按任务类型读取证据并执行实现与验证。</li><li>Core 只执行通用协议，不直接理解业务；业务、接口和设计事实始终由项目持有。</li></ul><h2 id="当前模块地图" tabindex="-1">当前模块地图 <a class="header-anchor" href="#当前模块地图" aria-label="Permalink to &quot;当前模块地图&quot;">​</a></h2><table tabindex="0"><thead><tr><th>路径</th><th>职责</th></tr></thead><tbody><tr><td><code>packages/core/</code></td><td>配置加载、验证执行、诊断、报告</td></tr><tr><td><code>packages/cli/</code></td><td>公共命令行入口</td></tr><tr><td><code>profiles/</code></td><td>产品形态规则</td></tr><tr><td><code>platforms/</code></td><td>运行平台规则</td></tr><tr><td><code>stacks/</code></td><td>框架和工具链规则</td></tr><tr><td><code>ui-systems/</code></td><td>可选 UI System Adapter</td></tr><tr><td><code>templates/</code></td><td>接入已有项目时创建的业务中立文件</td></tr><tr><td><code>presets/</code></td><td>创建新项目时使用的业务中立项目模板</td></tr><tr><td><code>skills/</code></td><td>Agent 工作流 Skills</td></tr><tr><td><code>schemas/</code></td><td>公共配置协议</td></tr><tr><td><code>tests/</code></td><td>Core、CLI 和编排测试</td></tr></tbody></table><h2 id="为什么这样分层" tabindex="-1">为什么这样分层 <a class="header-anchor" href="#为什么这样分层" aria-label="Permalink to &quot;为什么这样分层&quot;">​</a></h2><p>分层的目的不是追求复杂，而是防止变化互相污染：</p><ul><li>业务形态变化不应该改 Core。</li><li>运行平台变化不应该改产品 Profile。</li><li>框架工具链变化不应该改业务输入协议。</li><li>Agent 工作流变化不应该复制多份项目约束。</li></ul><h2 id="每层包含什么" tabindex="-1">每层包含什么 <a class="header-anchor" href="#每层包含什么" aria-label="Permalink to &quot;每层包含什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>层级</th><th>包含</th><th>不包含</th></tr></thead><tbody><tr><td>Core</td><td>配置、诊断、验证、报告、输入分析、安全写入、managed-file 保护</td><td>业务页面、品牌、接口路径、Token 值</td></tr><tr><td>CLI</td><td>用户命令、JSON 输出、计划预览、安装入口、帮助文本</td><td>业务决策、项目私有规则</td></tr><tr><td>Profile</td><td>产品形态检查、需求闭环、输入优先级</td><td>具体业务流程和页面文案</td></tr><tr><td>Platform</td><td>运行平台验收、移动视口、浏览器检查、视觉基线语义</td><td>具体框架实现</td></tr><tr><td>Stack</td><td>框架目录、脚本、页面注册、工具链约束</td><td>产品形态规则</td></tr><tr><td>Templates</td><td>既有项目接入所需的业务中立文件</td><td>项目已有内容的覆盖策略</td></tr><tr><td>Presets</td><td>新项目容器、基础源码、测试和文档骨架</td><td>真实业务页面</td></tr><tr><td>Skills</td><td>Agent 可调用 SOP 和命令工作流</td><td>项目唯一约束正文</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("architecture/overview.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  overview as default
};

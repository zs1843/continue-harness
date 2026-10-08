import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"任务与实现","description":"","frontmatter":{},"headers":[],"relativePath":"sop/task-and-implementation.md","filePath":"sop/task-and-implementation.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "sop/task-and-implementation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="任务与实现" tabindex="-1">任务与实现 <a class="header-anchor" href="#任务与实现" aria-label="Permalink to &quot;任务与实现&quot;">​</a></h1><h2 id="创建任务编号" tabindex="-1">创建任务编号 <a class="header-anchor" href="#创建任务编号" aria-label="Permalink to &quot;创建任务编号&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> task</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> create</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --title</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> &quot;任务名称&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --json</span></span></code></pre></div><p>任务编号通常类似 <code>T001</code>。它的作用不是形式化命名，而是把下面这些内容绑定起来：</p><ul><li>PRD/RP 片段。</li><li>API operationId 选择。</li><li>实现文件。</li><li>验证结果。</li><li>快照和历史。</li></ul><h2 id="按任务类型加载证据" tabindex="-1">按任务类型加载证据 <a class="header-anchor" href="#按任务类型加载证据" aria-label="Permalink to &quot;按任务类型加载证据&quot;">​</a></h2><p>实现开始前，Agent 应先判断任务类型：</p><table tabindex="0"><thead><tr><th>任务类型</th><th>需要读取</th></tr></thead><tbody><tr><td>业务实现</td><td>manifest、PRODUCT、PRD/RP</td></tr><tr><td>UI 调整</td><td>DESIGN、Design Token、UI 输入、视觉调整记录</td></tr><tr><td>API 接入</td><td>API 输入、OpenAPI snapshot、selection.yaml</td></tr><tr><td>架构决策</td><td>DECISIONS、ARCHITECTURE、相关历史</td></tr></tbody></table><h2 id="为什么不一次读完" tabindex="-1">为什么不一次读完 <a class="header-anchor" href="#为什么不一次读完" aria-label="Permalink to &quot;为什么不一次读完&quot;">​</a></h2><p>一次读完所有材料看似稳妥，实际会造成上下文污染。比如 API 任务不应该被旧视觉调整记录干扰；UI 调整也不应该因为未选 operationId 被迫进入接口生成流程。</p><p>按任务加载证据能让 Agent 的注意力更接近真实问题，也能减少 token 消耗。</p><h2 id="实现边界" tabindex="-1">实现边界 <a class="header-anchor" href="#实现边界" aria-label="Permalink to &quot;实现边界&quot;">​</a></h2><p>Consumer H5 preset 建议的边界：</p><ul><li>页面放在 <code>src/pages/</code>，不要把多个独立页面堆进一个 <code>.vue</code>。</li><li>组件放在 <code>src/components/</code>。</li><li>请求封装放在 <code>src/services/</code>。</li><li>业务数据映射放在 <code>src/repositories/</code>。</li><li>跨页面纯函数放在 <code>src/utils/</code>。</li><li>状态管理放在 <code>src/stores/</code>。</li></ul><p>这些目录不是为了制造仪式感，而是让页面、组件、接口、状态和工具函数有明确归属。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("sop/task-and-implementation.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const taskAndImplementation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  taskAndImplementation as default
};

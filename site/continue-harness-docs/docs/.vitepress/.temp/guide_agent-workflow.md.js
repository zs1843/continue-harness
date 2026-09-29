import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Agent 协作规则","description":"","frontmatter":{},"headers":[],"relativePath":"guide/agent-workflow.md","filePath":"guide/agent-workflow.md","lastUpdated":null}');
const _sfc_main = { name: "guide/agent-workflow.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="agent-协作规则" tabindex="-1">Agent 协作规则 <a class="header-anchor" href="#agent-协作规则" aria-label="Permalink to &quot;Agent 协作规则&quot;">​</a></h1><h2 id="唯一约束来源" tabindex="-1">唯一约束来源 <a class="header-anchor" href="#唯一约束来源" aria-label="Permalink to &quot;唯一约束来源&quot;">​</a></h2><p><code>AGENTS.md</code> 是项目约束本体。<code>CLAUDE.md</code> 和 Cursor rule 只是供应商适配，不应复制另一份完整规则。Skills 是可调用的工作流，不拥有覆盖项目约束的权限。</p><h2 id="推荐执行顺序" tabindex="-1">推荐执行顺序 <a class="header-anchor" href="#推荐执行顺序" aria-label="Permalink to &quot;推荐执行顺序&quot;">​</a></h2><ol><li>读取 <code>AGENTS.md</code>、<code>.continue-harness/project.yaml</code> 和项目事实文档。</li><li>运行 <code>inspect</code> 和 <code>doctor</code>，确认项目是否准备好。</li><li>读取当前任务关联的 PRD/RP/UI/API 证据，不一次加载全部输入。</li><li>实现变更，并保持项目原有目录和依赖边界。</li><li>按改动类型选择 <code>verify</code> 模式，失败最多针对同一原因重试两次。</li><li>更新状态、决策、历史和任务快照。</li><li>结束对话时输出验证结果、剩余风险和可执行的编号动作。</li></ol><h2 id="按任务类型读取证据" tabindex="-1">按任务类型读取证据 <a class="header-anchor" href="#按任务类型读取证据" aria-label="Permalink to &quot;按任务类型读取证据&quot;">​</a></h2><table tabindex="0"><thead><tr><th>任务</th><th>首先读取</th></tr></thead><tbody><tr><td>业务实现</td><td>PRODUCT、PRD、RP、输入 manifest</td></tr><tr><td>UI 调整</td><td>DESIGN、Token、UI Contract、UI 输入和视觉报告</td></tr><tr><td>API 接入</td><td>API 输入、selection.yaml、OpenAPI snapshot</td></tr><tr><td>架构调整</td><td>ARCHITECTURE、DECISIONS、相关历史</td></tr></tbody></table><h2 id="人的确认边界" tabindex="-1">人的确认边界 <a class="header-anchor" href="#人的确认边界" aria-label="Permalink to &quot;人的确认边界&quot;">​</a></h2><p>人需要确认业务权威事实、输入冲突、延期和外部阻塞、组件或 Token 的保护边界，以及会修改生产依赖、公开 CLI 或发布行为的变更。Agent 可以自动执行只读检查、计划预览、实现和已授权的验证。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/agent-workflow.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const agentWorkflow = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  agentWorkflow as default
};

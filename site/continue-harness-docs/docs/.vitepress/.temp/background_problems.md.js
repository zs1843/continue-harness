import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"要解决的问题","description":"","frontmatter":{},"headers":[],"relativePath":"background/problems.md","filePath":"background/problems.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "background/problems.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="要解决的问题" tabindex="-1">要解决的问题 <a class="header-anchor" href="#要解决的问题" aria-label="Permalink to &quot;要解决的问题&quot;">​</a></h1><h2 id="_1-需求证据散落" tabindex="-1">1. 需求证据散落 <a class="header-anchor" href="#_1-需求证据散落" aria-label="Permalink to &quot;1. 需求证据散落&quot;">​</a></h2><p>PRD、RP、UI、API 和 assets 往往来自不同工具。它们可能在聊天记录、网盘、截图、导出文件和临时目录里。没有统一登记时，开发者和 Agent 很难回答“当前任务到底依据哪份输入”。</p><p>continue-harness 把原始输入放进 <code>.continue-harness/inputs/</code>，并通过 manifest 记录来源、类型和状态。原始输入默认只读，分析结果另行生成。</p><h2 id="_2-agent-上下文过载" tabindex="-1">2. Agent 上下文过载 <a class="header-anchor" href="#_2-agent-上下文过载" aria-label="Permalink to &quot;2. Agent 上下文过载&quot;">​</a></h2><p>Agent 如果每次都读取全部设计、API、历史和任务文件，很容易把无关约束混入当前任务。如果读得太少，又会开始猜测。</p><p>continue-harness 的默认策略是先读取稳定工作流，再按任务类型加载证据：</p><ul><li>业务任务读取 PRD/RP。</li><li>UI 任务再读取 DESIGN、Token、UI 输入和视觉调整记录。</li><li>API 任务再读取 OpenAPI 输入和 operationId 选择。</li><li>长期冲突或架构决策时才读取 DECISIONS。</li></ul><h2 id="_3-完成标准不可证明" tabindex="-1">3. 完成标准不可证明 <a class="header-anchor" href="#_3-完成标准不可证明" aria-label="Permalink to &quot;3. 完成标准不可证明&quot;">​</a></h2><p>页面能打开、构建能过，不代表需求已经完整实现。尤其是多层流程里，容易漏掉弹窗、异常状态、返回路径和二级页面。</p><p>continue-harness 在 Consumer H5 feature/audit 中引入 requirement closure：可达页面、状态、动作和返回路径必须被验证、明确延期或记录为外部阻塞。</p><h2 id="_4-自动生成和手工代码混在一起" tabindex="-1">4. 自动生成和手工代码混在一起 <a class="header-anchor" href="#_4-自动生成和手工代码混在一起" aria-label="Permalink to &quot;4. 自动生成和手工代码混在一起&quot;">​</a></h2><p>接口类型和请求 wrapper 如果生成后被手动改写，下次生成就可能覆盖业务修复。</p><p>continue-harness 的 OpenAPI 生成是任务级的，并带 managed-file 冲突保护。生成层保持纯契约，业务映射应该放在单独 service 或 repository。</p><h2 id="_5-多-agent-规则漂移" tabindex="-1">5. 多 Agent 规则漂移 <a class="header-anchor" href="#_5-多-agent-规则漂移" aria-label="Permalink to &quot;5. 多 Agent 规则漂移&quot;">​</a></h2><p>Codex、Claude Code、Cursor 都可能有自己的入口文件。如果每个入口都复制一份完整规则，迟早会出现“同一个项目有多套规范”。</p><p>continue-harness 让 <code>AGENTS.md</code> 成为唯一约束本体。<code>CLAUDE.md</code> 和 Cursor rule 只是薄适配，Skills 是可调用工作流，不覆盖项目约束。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("background/problems.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const problems = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  problems as default
};

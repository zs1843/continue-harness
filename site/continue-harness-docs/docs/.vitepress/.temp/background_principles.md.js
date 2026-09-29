import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"设计原则","description":"","frontmatter":{},"headers":[],"relativePath":"background/principles.md","filePath":"background/principles.md","lastUpdated":null}');
const _sfc_main = { name: "background/principles.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="设计原则" tabindex="-1">设计原则 <a class="header-anchor" href="#设计原则" aria-label="Permalink to &quot;设计原则&quot;">​</a></h1><h2 id="core-不理解业务" tabindex="-1">Core 不理解业务 <a class="header-anchor" href="#core-不理解业务" aria-label="Permalink to &quot;Core 不理解业务&quot;">​</a></h2><p>Core 不能包含产品页面、领域状态、接口路径、品牌和 Token 值。它只负责可复用机制：配置、命令解析、诊断、验证、报告和安全写入。</p><p>这样做的代价是需要更多显式配置；收益是 Harness 不会被某个业务项目绑死。</p><h2 id="项目事实归项目所有" tabindex="-1">项目事实归项目所有 <a class="header-anchor" href="#项目事实归项目所有" aria-label="Permalink to &quot;项目事实归项目所有&quot;">​</a></h2><p><code>.continue-harness/project.yaml</code> 是目标项目拥有的配置。项目选择 profile、platform、stack，并把符号化验证步骤映射到真实命令。</p><p>Harness 可以提供模板和默认值，但不能长期替项目保存真实业务事实。</p><h2 id="初始化必须安全" tabindex="-1">初始化必须安全 <a class="header-anchor" href="#初始化必须安全" aria-label="Permalink to &quot;初始化必须安全&quot;">​</a></h2><p>接入已有项目时，Harness 要先预检所有目标文件。只要有真实冲突，就停止写入。已有相同文件保留，已有不同内容报告为项目已维护或冲突。</p><p>这条原则是为了避免工程工具用“初始化”的名义覆盖用户维护的规则。</p><h2 id="能力默认轻量-按需展开" tabindex="-1">能力默认轻量，按需展开 <a class="header-anchor" href="#能力默认轻量-按需展开" aria-label="Permalink to &quot;能力默认轻量，按需展开&quot;">​</a></h2><p>新项目默认只安装聚合 Consumer H5 Skill。命令级 Skills、OpenAPI、UI System、Design Token discovery 和视觉基线都是按任务需要启用。</p><p>这不是删除能力，而是降低默认认知成本。</p><h2 id="验证是完成证据" tabindex="-1">验证是完成证据 <a class="header-anchor" href="#验证是完成证据" aria-label="Permalink to &quot;验证是完成证据&quot;">​</a></h2><p>验证报告不是形式化步骤，而是任务完成的证据。失败命令、环境阻塞、未配置能力和业务失败应该被区分记录。</p><p>Consumer H5 的完整功能验收不只看构建和首屏，还要看需求闭环。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("background/principles.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const principles = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  principles as default
};

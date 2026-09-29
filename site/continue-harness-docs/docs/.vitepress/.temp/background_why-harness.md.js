import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"为什么做 Harness","description":"","frontmatter":{},"headers":[],"relativePath":"background/why-harness.md","filePath":"background/why-harness.md","lastUpdated":null}');
const _sfc_main = { name: "background/why-harness.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="为什么做-harness" tabindex="-1">为什么做 Harness <a class="header-anchor" href="#为什么做-harness" aria-label="Permalink to &quot;为什么做 Harness&quot;">​</a></h1><p>AI 参与前端研发后，单个页面的生成速度提高了，但交付的不确定性没有自动消失。真正反复出问题的地方，通常不是“有没有代码”，而是这些问题：</p><ul><li>Agent 读到的 PRD、原型、视觉稿和接口信息不一致。</li><li>开发者不知道某个实现细节来自哪份证据。</li><li>页面能跑起来，但 PRD/RP 中的状态、弹窗、返回路径没有完整覆盖。</li><li>不同 Agent 供应商各有一份规则，时间一长就互相漂移。</li><li>验证命令、报告路径和完成标准依赖个人习惯，无法稳定交接。</li></ul><p>continue-harness 解决的是这层协作结构，而不是替业务写页面。它把项目中应该长期存在的工程事实固定下来：输入、约束、配置、验证和历史。</p><h2 id="不是脚手架-而是工程协议" tabindex="-1">不是脚手架，而是工程协议 <a class="header-anchor" href="#不是脚手架-而是工程协议" aria-label="Permalink to &quot;不是脚手架，而是工程协议&quot;">​</a></h2><p>普通脚手架通常解决“如何快速创建一个项目”。continue-harness 更关注创建之后的生命周期：</p><ul><li>新输入进来时如何登记。</li><li>Agent 开始任务前应该读哪些文件。</li><li>接口字段应该来自 OpenAPI 还是 PRD 猜测。</li><li>什么时候算完成。</li><li>哪些验证失败是环境问题，哪些是业务问题。</li><li>完成后如何留下不可变快照。</li></ul><p>所以它既包含 <code>create</code>，也包含 <code>init</code>、<code>inputs</code>、<code>task</code>、<code>doctor</code>、<code>verify</code>、<code>skills</code> 等后续工作流。</p><h2 id="为什么强调业务无关" tabindex="-1">为什么强调业务无关 <a class="header-anchor" href="#为什么强调业务无关" aria-label="Permalink to &quot;为什么强调业务无关&quot;">​</a></h2><p>如果 Harness 把某个业务页面、状态枚举、品牌色或接口路径写进 Core，它就会很快退化成某个项目的私有工具。这样短期看方便，长期会让复用和维护都变差。</p><p>当前架构把责任拆开：</p><ul><li>Core 只理解配置、诊断、验证、报告和安全写入。</li><li>Profile 描述产品形态，比如 Consumer H5。</li><li>Platform 描述运行环境，比如 Web Mobile。</li><li>Stack 描述技术栈，比如 uni-app。</li><li>项目自己持有业务事实和 Design Token。</li></ul><p>这种拆分让 Harness 能服务不同项目，同时不抢走项目自己的产品判断权。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("background/why-harness.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const whyHarness = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  whyHarness as default
};

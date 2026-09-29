import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"UI System","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/ui-system.md","filePath":"architecture/ui-system.md","lastUpdated":null}');
const _sfc_main = { name: "architecture/ui-system.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ui-system" tabindex="-1">UI System <a class="header-anchor" href="#ui-system" aria-label="Permalink to &quot;UI System&quot;">​</a></h1><p>UI System Adapter 是可选协议，不是默认 UI 依赖。它依赖项目已经明确的 Design Token 真值，但不替项目定义 Token。</p><h2 id="它解决什么" tabindex="-1">它解决什么 <a class="header-anchor" href="#它解决什么" aria-label="Permalink to &quot;它解决什么&quot;">​</a></h2><p>真实项目经常会选择 TDesign、Vant 或其他组件库。Harness 不能在 Core 中导入这些库，但又需要让 Agent 知道组件语义和 Token 映射。</p><p>UI System Adapter 提供：</p><ul><li>组件语义。</li><li>Design Token 映射。</li><li>组件使用约束。</li><li>页面转场和布局 section 描述。</li><li>视觉调整记录格式。</li></ul><h2 id="为什么不自动加生产依赖" tabindex="-1">为什么不自动加生产依赖 <a class="header-anchor" href="#为什么不自动加生产依赖" aria-label="Permalink to &quot;为什么不自动加生产依赖&quot;">​</a></h2><p>UI runtime 是项目技术决策。Adapter 安装只是证据安装，不应该自动修改生产依赖。</p><p>如果项目决定采用某个 UI runtime，需要：</p><ol><li>锁定生产依赖版本。</li><li>迁移组件使用。</li><li>验证页面和视觉。</li><li>再移除旧 runtime。</li></ol><h2 id="design-token-权威" tabindex="-1">Design Token 权威 <a class="header-anchor" href="#design-token-权威" aria-label="Permalink to &quot;Design Token 权威&quot;">​</a></h2><p>项目拥有唯一 machine-readable Design Token source。Adapter 只解释如何映射到组件库变量。</p><p>已有项目接入时，应先执行只读 discovery，识别 CSS Variables 和高频视觉值，再由用户确认语义 Token。</p><p>详细规则见 <a href="./design-tokens">Design Token</a>。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("architecture/ui-system.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const uiSystem = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  uiSystem as default
};

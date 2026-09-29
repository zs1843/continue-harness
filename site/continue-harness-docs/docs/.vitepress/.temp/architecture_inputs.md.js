import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Inputs","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/inputs.md","filePath":"architecture/inputs.md","lastUpdated":null}');
const _sfc_main = { name: "architecture/inputs.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="inputs" tabindex="-1">Inputs <a class="header-anchor" href="#inputs" aria-label="Permalink to &quot;Inputs&quot;">​</a></h1><p>Inputs 模块负责把原始证据纳入项目。</p><h2 id="文件职责" tabindex="-1">文件职责 <a class="header-anchor" href="#文件职责" aria-label="Permalink to &quot;文件职责&quot;">​</a></h2><table tabindex="0"><thead><tr><th>文件或目录</th><th>职责</th></tr></thead><tbody><tr><td><code>.continue-harness/inputs/manifest.yaml</code></td><td>登记输入清单</td></tr><tr><td><code>.continue-harness/inputs/prd/</code></td><td>产品需求</td></tr><tr><td><code>.continue-harness/inputs/rp/</code></td><td>原型和交互</td></tr><tr><td><code>.continue-harness/inputs/ui/</code></td><td>视觉参考</td></tr><tr><td><code>.continue-harness/inputs/api/</code></td><td>API 输入</td></tr><tr><td><code>.continue-harness/inputs/assets/</code></td><td>素材</td></tr></tbody></table><h2 id="inspect-做什么" tabindex="-1">Inspect 做什么 <a class="header-anchor" href="#inspect-做什么" aria-label="Permalink to &quot;Inspect 做什么&quot;">​</a></h2><p>Inspect 比对 manifest 和实际文件：</p><ul><li>找到未登记文件。</li><li>找到登记但缺失的文件。</li><li>报告 manifest 状态。</li><li>输出稳定 JSON。</li></ul><h2 id="analyze-做什么" tabindex="-1">Analyze 做什么 <a class="header-anchor" href="#analyze-做什么" aria-label="Permalink to &quot;Analyze 做什么&quot;">​</a></h2><p>Analyze 是轻量文本分析：</p><ul><li>抽取 labelled conclusions。</li><li>区分 business、interaction、visual。</li><li>报告 same-key conflicts。</li><li>不修改原始输入。</li></ul><h2 id="为什么不是复杂知识库" tabindex="-1">为什么不是复杂知识库 <a class="header-anchor" href="#为什么不是复杂知识库" aria-label="Permalink to &quot;为什么不是复杂知识库&quot;">​</a></h2><p>当前阶段优先验证本地文件流和任务闭环。复杂 PDF、图片和在线同步可以后续接入，但不应该阻塞首个稳定 Harness 协议。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("architecture/inputs.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const inputs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  inputs as default
};

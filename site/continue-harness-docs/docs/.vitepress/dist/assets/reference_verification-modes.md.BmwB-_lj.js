import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"验证模式","description":"","frontmatter":{},"headers":[],"relativePath":"reference/verification-modes.md","filePath":"reference/verification-modes.md","lastUpdated":null}');
const _sfc_main = { name: "reference/verification-modes.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="验证模式" tabindex="-1">验证模式 <a class="header-anchor" href="#验证模式" aria-label="Permalink to &quot;验证模式&quot;">​</a></h1><h2 id="quick" tabindex="-1">quick <a class="header-anchor" href="#quick" aria-label="Permalink to &quot;quick&quot;">​</a></h2><p>快速反馈，适合小范围变更。通常运行单元测试和版本检查。</p><h2 id="feature" tabindex="-1">feature <a class="header-anchor" href="#feature" aria-label="Permalink to &quot;feature&quot;">​</a></h2><p>完整功能验收。Consumer H5 中 feature 包含需求闭环，不能只用构建成功替代。</p><h2 id="runtime" tabindex="-1">runtime <a class="header-anchor" href="#runtime" aria-label="Permalink to &quot;runtime&quot;">​</a></h2><p>浏览器或运行时检查。当前 minimal fixture 使用 Playwright 验证 H5 页面响应、核心内容、console error 和 page error。</p><h2 id="interaction" tabindex="-1">interaction <a class="header-anchor" href="#interaction" aria-label="Permalink to &quot;interaction&quot;">​</a></h2><p>关键交互检查。默认可以未配置，但必须明确报告，不应假装通过。</p><h2 id="visual" tabindex="-1">visual <a class="header-anchor" href="#visual" aria-label="Permalink to &quot;visual&quot;">​</a></h2><p>视觉回归。缺少 baseline 时报告 <code>not_configured</code>，有 baseline 后执行截图对比。</p><h2 id="audit" tabindex="-1">audit <a class="header-anchor" href="#audit" aria-label="Permalink to &quot;audit&quot;">​</a></h2><p>审计模式会尽量收集完整结果，通常不 fail-fast。适合发布前、交接前或诊断复杂问题。</p><h2 id="环境阻塞" tabindex="-1">环境阻塞 <a class="header-anchor" href="#环境阻塞" aria-label="Permalink to &quot;环境阻塞&quot;">​</a></h2><p>本地端口监听失败等工具链限制会被分类为环境阻塞，而不是业务失败。这能避免把 sandbox 或机器限制误判成项目问题。</p>', 15)
  ])]);
}
const verificationModes = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  verificationModes as default
};

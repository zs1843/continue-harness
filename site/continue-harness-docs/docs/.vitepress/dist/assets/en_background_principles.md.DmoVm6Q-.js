import { _ as _export_sfc, o as openBlock, c as createElementBlock, a3 as createStaticVNode } from "./chunks/framework.qfuioCLE.js";
const __pageData = JSON.parse('{"title":"Design principles","description":"","frontmatter":{},"headers":[],"relativePath":"en/background/principles.md","filePath":"en/background/principles.md","lastUpdated":null}');
const _sfc_main = { name: "en/background/principles.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [..._cache[0] || (_cache[0] = [
    createStaticVNode('<h1 id="design-principles" tabindex="-1">Design principles <a class="header-anchor" href="#design-principles" aria-label="Permalink to &quot;Design principles&quot;">​</a></h1><ol><li>Project-owned facts are authoritative.</li><li>Core stays independent of product, platform, framework, and business domain.</li><li>Dry-run and read-only inspection precede mutation.</li><li>Evidence is loaded by task type instead of all at once.</li><li>Verification distinguishes business failures, environment blocks, and unconfigured checks.</li><li>Agent adapters stay thin; <code>AGENTS.md</code> remains the constraint authority.</li><li>Publishing, dependency changes, and public protocol changes require explicit approval.</li></ol>', 2)
  ])]);
}
const principles = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  principles as default
};

import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Agent integration details","description":"","frontmatter":{},"headers":[],"relativePath":"en/sop/agent-codex-claude.md","filePath":"en/sop/agent-codex-claude.md","lastUpdated":1790672909000}');
const _sfc_main = { name: "en/sop/agent-codex-claude.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="agent-integration-details" tabindex="-1">Agent integration details <a class="header-anchor" href="#agent-integration-details" aria-label="Permalink to &quot;Agent integration details&quot;">​</a></h1><p><code>AGENTS.md</code> is the canonical constraint body. Claude Code and Cursor files are thin adapters:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span>AGENTS.md</span></span>
<span class="line"><span>CLAUDE.md</span></span>
<span class="line"><span>.cursor/rules/continue-harness.mdc</span></span></code></pre></div><p>Install workflows by provider when needed:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-dark github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#F97583", "--shiki-dark": "#F97583" })}">continue</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}">-harness</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> skills</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> install</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --project</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --provider</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> all</span><span style="${ssrRenderStyle({ "--shiki-light": "#79B8FF", "--shiki-dark": "#79B8FF" })}"> --name</span><span style="${ssrRenderStyle({ "--shiki-light": "#9ECBFF", "--shiki-dark": "#9ECBFF" })}"> consumer-h5-harness</span></span></code></pre></div><p>Codex and Cursor use <code>.agents/skills</code>; Claude Code uses <code>.claude/skills</code>. Skills describe procedures and never override project constraints.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/sop/agent-codex-claude.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const agentCodexClaude = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  agentCodexClaude as default
};

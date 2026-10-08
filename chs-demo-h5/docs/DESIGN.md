# 设计规范

本文只维护全局设计原则，不保存具体 Design Token 数值。机器可读 Token 唯一事实来源为 `docs/design/tokens.json`。

RP 负责页面流程和交互，Page Flow Model 与 Layout Spec 负责结构化中间表示；UI System Adapter
负责组件语义和框架映射；UI 图用于 Token 提炼、视觉校准和页面例外，不单独承担业务权威。

- 高保真 UI 优先决定视觉和 Token。
- 没有高保真 UI 时，可参考低保真 RP，但必须记录为推断或待确认。
- UI 改动需要视觉回归；没有基线时只能报告“未配置”。
- 不得用脚手架默认示例、通用审美或 Agent 自行推断覆盖项目输入。

## Token 提炼

- `docs/design/tokens.json` 初始为 `pending_extraction`，表示等待从项目输入提炼。
- 有高保真 UI 时，必须优先从 UI 提炼颜色、字体、字号、字重、行高、间距、圆角、阴影、边框、控件高度、图标尺寸、层级、动效和断点。
- 没有高保真 UI 但有 RP 时，可以从 RP 提炼结构性 Token，并把来源标记为低保真 RP、置信度标记为推断或待确认。
- 先由 RP 提炼，后续补充高保真 UI 时，必须更新 `docs/design/tokens.json`，用 UI 来源覆盖 RP 推断，并记录差异。

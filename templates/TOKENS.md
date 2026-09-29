# Design Token 说明

机器可读 Token 唯一事实来源是 `docs/design/tokens.json`。本文只解释 Token 的中文语义、来源和使用注意事项，不定义第二套数值。

Token 更新必须记录来源优先级、修改前值、修改后值、影响页面、影响组件，并写入任务快照的 `design-token-diff.json`。

## 提炼规则

- 有高保真 UI 时，必须优先从 UI 提炼 Token。
- 没有高保真 UI 但有 RP 时，可以从 RP 提炼结构性 Token，并把来源标记为 `低保真 RP`，置信度标记为 `inferred` 或 `needs_confirmation`。
- 先用 RP 提炼过 Token，后续又补充高保真 UI 时，必须重新提炼 `docs/design/tokens.json`，用 UI 来源覆盖 RP 推断，并记录修改前值、修改后值、影响页面和影响组件。
- UI/RP 都没有提供的 Token 不应留作空对象宣称完成；应标记为 `pending_extraction`、`needs_confirmation` 或记录明确默认来源。
- 每个 Token 值建议记录 `value`、`source`、`confidence`、`source_input_id`、`source_path` 和 `note`，便于后续追溯。

# Design Token 说明

`docs/design/tokens.json` 是唯一机器可读 Token 真值来源。本文只做中文解释，不定义第二套数值。

Token 初始状态允许是 `pending_extraction`，表示等待从 PRD/RP/UI 输入中提炼。实现 UI 前必须处理：

- 有高保真 UI 时，优先从 UI 稿提炼。
- 没有 UI 但有 RP 时，从 RP 提炼并标记为推断或待确认。
- 先用 RP 提炼，后补 UI 时，必须更新 JSON，用 UI 来源覆盖 RP 推断，并记录 Token diff。
- 每个 Token 值建议记录 `value`、`source`、`confidence`、`source_input_id`、`source_path` 和 `note`。

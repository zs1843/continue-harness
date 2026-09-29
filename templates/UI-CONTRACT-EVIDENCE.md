# UI Contract Evidence

设计稿、截图和线上页面记录是视觉证据，不是第二套 Design Token 真值。

每份证据应记录：

- 来源和查询日期；
- 页面、组件和关键状态；
- 视口或设备信息；
- 关联输入编号或任务编号；
- 用于支持的 Token、组件或布局决策。

最终确认的视觉值只能写入 `docs/design/tokens.json`。证据文件建议存放在
`docs/ui-contract-evidence/`，并通过任务快照或 `design-token-diff.json` 建立关联。

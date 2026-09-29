# API 输入

保存 OpenAPI、接口文档和字段说明。不得保存密钥、Cookie、Access Token 或 `.env` 内容。

Apifox 导出的 OpenAPI JSON 必须登记到输入 manifest，再在
`.continue-harness/api/selection.yaml` 按任务选择 operationId。使用
`continue-harness api inspect --task T001` 检查，用 `continue-harness api generate --task T001`
生成受哈希保护的类型和请求封装。

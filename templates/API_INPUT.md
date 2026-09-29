# API 输入

## 用途

保存 OpenAPI、接口文档、接口截图、字段说明和错误码说明。

Apifox 导出的 OpenAPI 3.x JSON 先登记到 `.continue-harness/inputs/manifest.yaml`，再在
`.continue-harness/api/selection.yaml` 按任务关联 PRD、API 输入和 operationId。运行
`continue-harness api inspect --task T001` 检查，再用 `continue-harness api generate --task T001`
生成 `src/types/api.generated.ts` 和 `src/services/api.generated.ts`。

PRD 决定任务需要哪些接口；OpenAPI 决定路径、方法、请求和响应字段。生成文件受哈希
保护，检测到手工修改时 CLI 会拒绝覆盖。

## 支持形式

JSON、YAML、Markdown、HTML、PDF、图片或项目确认的接口文档导出。

## 安全规则

不得提交 Access Token、Cookie、密钥或 `.env` 内容。真实凭据只允许放在本地环境变量、CI Secret 或已认证工具连接中。

## 进入快照

任务快照只记录输入文件路径、版本、状态和哈希，不保存敏感凭据。

# OpenAPI

OpenAPI 能力用于任务级接口生成。本页说明输入位置、任务选择、生成产物、生成保护和未实现范围。日常由 `continue-harness-api` Skill 执行 `inspect` 和 `generate`，CLI 为可选入口。

## 输入与产物

当前实现从本地 OpenAPI JSON 开始，通常来自 Apifox 官方导出。

```text
.continue-harness/inputs/api/
.continue-harness/api/selection.yaml
src/types/api.generated.ts
src/services/api.generated.ts
.continue-harness/api/generated.json
```

## 任务选择

PRD 决定当前任务需要哪些 operationId，`selection.yaml` 把任务和 operationId 绑定起来。生成按任务范围进行，避免一次性生成整个 API，也避免 Agent 根据 PRD 猜字段。

## 生成产物

- TypeScript request/response types 写入 `src/types/api.generated.ts`。
- 请求函数写入 `src/services/api.generated.ts`，调用项目 `src/services/http.ts` 的 `request` wrapper（生成 `import { request } from './http'`），不是 `uni.request`。
- managed metadata 写入 `.continue-harness/api/generated.json`。

## 生成保护

生成文件保持可再生。生成前记录 hash；如果开发者手工改了 generated 文件，下次生成会拒绝覆盖。业务 mapping 放在 generated 层之外，接口契约和业务适配分开。

## 未实现

当前不做在线 Apifox 同步、鉴权拉取、复杂 discriminator 映射和高级 media type 支持；引用参数（`$ref` parameter）在生成时被跳过，尚未解析。

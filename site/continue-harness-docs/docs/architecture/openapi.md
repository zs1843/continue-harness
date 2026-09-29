# OpenAPI

OpenAPI 能力用于任务级接口生成。

## 当前范围

当前实现从本地 OpenAPI JSON 开始，通常来自 Apifox 官方导出。

```text
.continue-harness/inputs/api/
.continue-harness/api/selection.yaml
src/types/api.generated.ts
src/services/api.generated.ts
.continue-harness/api/generated.json
```

## 任务如何选择接口

PRD 决定当前任务需要哪些 operationId。selection.yaml 把任务和 operationId 绑定起来。

这样做是为了避免一次性生成整个 API，也避免 Agent 根据 PRD 猜字段。

## 生成什么

生成内容包括：

- TypeScript request/response types。
- uni.request wrapper。
- managed metadata。

## 为什么保护 generated files

生成文件应该保持可再生。如果开发者手工改了 generated 文件，下次生成会拒绝覆盖。

业务 mapping 应该放在 generated 层之外。这样接口契约和业务适配不会混在一起。

## 未来范围

当前不做在线 Apifox 同步、鉴权拉取、复杂 discriminator 映射和高级 media type 支持。这些属于后续 provider interface 的范围。

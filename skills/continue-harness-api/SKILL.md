---
name: continue-harness-api
description: 检查 Apifox 导出的 OpenAPI JSON，并通过 continue-harness 生成任务级 TypeScript 接口类型和 uni-app 请求封装。适用于登记 API 依据、关联 PRD 任务与 operationId、预览接口生成、重新生成受管理的接口文件或处理生成冲突。
---

# 管理接口生成

## 工作流程

1. 阅读 `AGENTS.md`、`.continue-harness/project.yaml`、输入清单、任务 PRD 和
   `.continue-harness/api/selection.yaml`。
2. 缺少 Apifox OpenAPI JSON 时，请用户提供导出文件。本地导出足以完成任务时，不索要访问令牌；
   不得持久化保存凭据。
3. 在 `.continue-harness/inputs/manifest.yaml` 中将文件登记为状态为 `active` 的 `api` 输入。
   原始文件作为只读依据保留。
4. 根据 PRD 确定所需操作。如果多个操作都可能满足核心流程，请用户选择，不得编造 operationId。
5. 在 `.continue-harness/api/selection.yaml` 中配置任务：

   ```yaml
   tasks:
     T001:
       prd_inputs: [PRD-T001]
       api_input: API-001
       operations: [getUser]
   ```

6. 运行 `continue-harness api inspect --task T001 --json`。
7. 运行 `continue-harness api generate --task T001 --dry-run --json`。遇到 `conflict` 时停止；
   将业务映射移入非生成的服务层或仓储层，保留手工修改。
8. 确认计划无冲突后，运行 `continue-harness api generate --task T001`。
9. 在独立的非生成文件中添加项目专属的错误归一化、DTO 到视图模型的映射、缓存或流程编排。
   不得直接修改 `api.generated.ts`。
10. 运行 `continue-harness verify quick`；接口接入具体功能后，再使用 `feature` 模式验证。
11. 在任务历史中记录变更文件、输入编号、所选操作和实际验证结果。

## 依据与权威来源

- 以 PRD 确定产品范围和所需操作。
- 以 OpenAPI 为请求方法、路径、参数、请求体和响应结构的权威来源。
- 差异涉及核心流程、身份认证、支付、权限或数据结构时，必须先获得确认。
- 生成代码仅承担传输层基础设施职责，不承载业务语义。

## 当前支持边界

支持本地 OpenAPI 3.x / Swagger 2.0 JSON 导出文件。Apifox 在线同步属于后续适配能力；
只有同步命令已经实现且当前确实在使用时，才索要 Apifox 访问令牌。

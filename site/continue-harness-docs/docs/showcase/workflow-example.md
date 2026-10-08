# 可复现示例：预览项目创建与检查状态

这组命令只读取仓库或输出创建计划，不会创建业务项目。它展示 Harness 如何让操作前的目标文件和当前项目事实可见。命令从仓库根目录执行，输出摘录基于 `0.1.0`。

## 1. 查看版本

```bash
node packages/cli/bin/continue-harness.mjs version
```

```text
0.1.0
```

## 2. 预览新项目会生成什么

```bash
node packages/cli/bin/continue-harness.mjs plan create demo-h5 --json
```

输出中的 `entries` 列出每个目标文件及其处理状态。以下是实际输出中的部分条目：

```json
{
  "action": "create",
  "entries": [
    { "status": "create", "target": ".continue-harness/project.yaml" },
    { "status": "create", "target": "AGENTS.md" },
    { "status": "create", "target": "src/pages/index/index.vue" },
    { "status": "create", "target": "tests/e2e/runtime.spec.mjs" }
  ],
  "name": "demo-h5",
  "status": "ready"
}
```

完整结果还包含输入目录、项目事实文档、基础组件、HTTP 封装、验证脚本和 Agent Skill。`ready` 表示这次计划没有发现阻止创建的冲突；它不表示依赖已经安装或业务页面已经完成。`create` 会在执行前对目标路径做预检；接入已有项目时可用 `plan init --json` 查看 `create`、`unchanged` 和 `conflict` 状态。[创建项目 SOP](../sop/create-project.md) 和 [接入已有项目 SOP](../sop/init-existing-project.md) 给出后续步骤。

## 3. 查看当前仓库的项目事实

```bash
node packages/cli/bin/continue-harness.mjs inspect --json
```

当前仓库的输出会标明 `product_type: developer_tooling`、`stack.adapter: node-esm`，并列出 `quick`、`feature`、`audit` 验证模式。这个配置用于维护 Harness 本身；生成项目会使用自己的 `.continue-harness/project.yaml`，项目类型、技术栈、验证模式和输入状态不能与 Harness 仓库混用。

## 4. 运行只读诊断

```bash
node packages/cli/bin/continue-harness.mjs doctor --json
```

Doctor 给每项检查一个稳定 `code` 和状态，例如 `passed`、`not_configured` 或 `not_applicable`。在当前仓库中，CI 入口和 OpenAPI Snapshot 会被报告为 `not_configured`；这表示它们当前没有配置，不能解读为检查失败。目标项目的诊断内容取决于自己的配置和文件。

## 示例状态

`demo-h5` 已登记一份 PRD 草稿。当前可验证的是输入登记、哈希检查和 `draft` 状态；业务页面与业务验收尚未完成。[证据记录](./demo-h5-capture.md)区分了已验证事实与后续业务验收所需的证据类型。

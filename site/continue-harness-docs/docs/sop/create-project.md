# 创建新项目

Continue Harness 创建的是项目约束与协作空间，不是语言或框架脚手架。推荐通过 Agent 使用 `continue-harness-create`。

## 确认项目事实

提供项目名称、目标目录、目标、范围和交付物。通过对话确认项目类型、运行环境与技术栈；未知项保持 pending。Agent 会先预览写入内容，再创建项目。

基本信息确认后，再确定本次任务所需的输入。需求是必需依据；UI、接口契约、数据定义和部署约束按适用性选择，不要求准备固定清单。

## 生成内容

- `.continue-harness/` 下的项目配置与 Intake 状态。
- 用于登记输入来源的清单模板。
- 唯一约束入口 `AGENTS.md` 及供应商薄适配文件。
- 项目事实、当前状态、决策、验收记录和交接历史骨架。

创建过程不生成业务代码、不选择框架，也不安装业务工程依赖。创建完成不代表项目实现或验收完成。

## 开始首个任务

登记确认后的输入，创建任务，并建立需求 → 实现项 → 验收项 → 证据关联。范围与标准明确后再实现，将项目自身的测试命令接入验证，记录结果并准备交接。

不同项目形态使用同一协作闭环；具体文件与工具由已确认的项目事实决定。

<details>
<summary>CLI 参考</summary>

```bash
continue-harness plan create my-project --json
continue-harness create my-project
cd my-project
continue-harness intake inspect --json
```

默认只创建约束空间。后续参见[输入与证据](../guide/evidence.md)、[验证与验收](../guide/verification.md)和[安装 Skills](../skills/install.md)。

</details>

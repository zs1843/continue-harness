# 开始使用

Continue Harness 用于保持需求到验收的闭环，并让后续协作者能够恢复项目级上下文。开始时先让 Agent 确认项目事实，再根据项目类型和本次任务选择输入依据与检查方式。

## 发送给 Agent

将下面的请求发送给 Agent。若已安装与当前阶段相关的操作 Skill，Agent 可以调用它；没有 Skill 时也可按本文提示通过对话协作。无需安装聚合项目 Skill。Agent 不应假设 CLI 已安装或自动从未验证来源下载。

```text
请使用 Continue Harness 检查并接管当前项目。

先判断这是新项目还是已有项目，并按对应流程执行。先通过对话确认项目目标、范围、交付物、约束、协作角色和现有资料；未知事实标记为待确认，不要猜测。
根据已确认的项目事实和任务类型，确定需要登记的输入依据与适用检查；说明不适用项，不要要求每个项目提供相同材料。
在不修改业务实现的前提下完成检查与计划预览。说明将创建或保留哪些协作记录、发现的风险，以及需要我确认的事项。获得确认后再写入。
输出已确认事实、待确认问题、输入依据、检查结果和下一步。
```

接入完成后，提供具体需求时应同时说明目标、范围、非目标和验收标准。Agent 先恢复当前任务及其依据，再建立“需求 → 实现项 → 验收项 → 证据 → 交接状态”的关联，并运行项目已声明的检查。

## 新建与接入

- [新建项目](/sop/create-project)：为新项目建立协作约束和记录。
- [接入已有项目](/sop/init-existing-project)：预览影响后补充缺失记录，保留项目自有内容。

项目事实和任务决定后续所需的材料；输入类别、验收方式和检查命令并非固定清单。

## CLI 入口（可选）

CLI 供需要直接操作或排查 Agent 执行过程的维护者使用。前提是当前环境已具备兼容版本；命令行参考不代表 CLI 已自动安装。

```bash
continue-harness plan create project-name --json
continue-harness create project-name
continue-harness init --dry-run
continue-harness inputs inspect --json
continue-harness task create --title "已确认的工作项" --json
continue-harness verify feature
continue-harness resume --json
```

创建流程准备约束和协作记录，不创建业务实现。接入时，计划会区分待创建文件、未修改的管理文件和已被项目修改的文件；后者会被保留，缺失文件仍可补建。实际写入错误或并发变化可能导致部分文件已写入，流程不承诺事务回滚。

命令详情见[命令参考](/reference/commands)。

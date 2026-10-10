# CLI 示例

本页展示如何预览通用项目记录计划，以及如何读取项目事实和诊断结果。日常操作推荐通过对应的 Agent Skill 发起；Skill 会在需要时调用 CLI。

## 查看版本

```bash
continue-harness version
```

## 预览创建计划

计划命令只报告目标与冲突，不写入文件：

```bash
continue-harness plan create sample-project --json
```

计划中会列出本次准备创建的记录文件、项目名称、目标位置和状态。计划输出是本次执行目标的权威来源；不要把某一示例的文件数量当作所有项目的固定清单。

## 查看项目状态

```bash
continue-harness inspect --json
continue-harness doctor --json
```

Inspect 读取项目配置和协作状态。Doctor 以只读方式检查已配置能力；未配置项目输入或可选检查时，不应将其解释为通过。

## 输入、任务与验证

```bash
continue-harness inputs inspect --json
continue-harness task create --title "确认的工作项" --json
continue-harness verify feature
continue-harness resume --json
```

实际输入类型和项目检查由项目事实、任务范围及配置决定。验证结果应与验收项和证据一同检查，交接时以报告中的实际状态为准。

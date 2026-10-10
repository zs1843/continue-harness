# 接入已有项目

接入已有项目时，先检查项目现状和目标文件，再决定是否补充 Harness 记录。推荐由 `continue-harness-init` Skill 执行；CLI 作为可选入口。

## 预览与写入

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

计划会标明可创建文件、未修改的管理文件和已被项目修改的文件：

| 状态 | 含义 | 接入行为 |
| --- | --- | --- |
| `create` | 目标文件不存在 | 创建文件 |
| `managed_unchanged` | 目标与模板一致 | 保留，不重写 |
| `project_owned_modified` | 目标文件已被项目修改 | 保留，不覆盖；不阻止创建其他缺失文件 |

接入不是全有全无的事务操作，写入错误或并发变化可能留下部分结果。Doctor 只读检查当前配置和已启用能力。

## 增量接入

1. 确认项目约束、目标和责任人。
2. 复用已有的项目文档与证据，登记来源和适用性。
3. 确认任务及验收标准，并映射项目实际检查。
4. 执行配置的检查，审阅报告和未解决项。
5. 保存可恢复的上下文和交接动作。

只在已确认的需求与验收需要时启用可选能力。接入不会替换项目现有工作流，也不会自动改写现有资料。

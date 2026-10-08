# 任务、恢复与快照

任务编号将需求、实现、验收和证据关联起来。交接状态记录当前完成程度及下一步，使后续协作者能够依据项目文件继续工作。

## 创建任务

通过 `continue-harness-task` Skill 创建或继续任务。开始实现前，确认目标、范围、非目标及验收标准，将所需输入登记到 manifest，并在验收表中建立关联。

原始依据保存在输入文件中，验收关系保存在 `docs/ACCEPTANCE.md`。日志记录执行过程，决策文档记录长期选择，快照保存交接时的状态。

## 恢复项目上下文

恢复信息包含项目 Intake 事实、PROJECT、CURRENT_STATUS 和 DECISIONS 文档、任务清单、有效输入及来源、验收记录、验证状态、快照和 Git 改动。使用这些引用回查原始材料，不以聊天摘要代替项目事实。

`resume --task T001` 聚焦指定任务，并保留项目级上下文。报告若属于其他任务或输入、实现版本已经变化，会标记为需要确认。项目文档由协作者持续维护；Harness 不会自动判断旧决策是否应当失效。

<ZoomableImage
  src="/diagrams/context-recovery-zh.svg"
  alt="恢复项目上下文并核对报告是否仍然适用"
  caption="使用历史验证结果前，先检查所属任务和版本。"
/>

## 保存交接状态

创建快照前，检查输入与验收关联，并运行当前任务的验证。快照保存：

- 任务说明与项目文件哈希清单。
- 验证报告副本及其任务和版本关联。
- Intake、验收关系、决策和输入指纹。
- 延期、阻塞、风险及交接说明。

快照保存于 `docs/history/tasks/`。文件清单是版本索引，不是整个项目的备份；代码历史仍由 Git 管理。

## 继续工作

交接说明应明确已完成项、未完成项、证据位置、未决问题及下一步。任务范围变化后先更新需求和验收标准，再继续实现。

<details>
<summary>CLI 参考</summary>

```bash
continue-harness task create --title "任务名称" --json
continue-harness resume --task T001 --json
continue-harness verify feature --task T001
continue-harness task snapshot T001 --title "任务名称" --request "本次要求" --json
```

</details>

# 输入与证据

输入是实现和验收的依据。Continue Harness 记录输入的来源、版本和关联任务，并检查输入变化是否影响已有结论。

## 确定所需输入

先通过对话确认项目目标、范围、类型、运行环境和技术栈，再结合当前任务确认所需输入。项目类型提供候选问题，最终清单以已确认的任务为准。

| 任务 | 可能需要的输入 |
| --- | --- |
| 修改界面布局 | 需求、设计参考或现有界面约定 |
| 修复前端逻辑 | 复现步骤、预期行为、相关接口契约 |
| 修改后台任务 | 业务规则、数据契约、运行约束 |
| 数据处理 | 数据来源、字段定义、评估指标 |
| 部署变更 | 环境配置、依赖关系、验收与回滚要求 |

这些是示例，不是固定必填清单。UI、API、Design Token 都不属于所有项目的必需输入。即使涉及界面，也只有任务确实依赖设计系统时才需要 Token。

Intake 支持自定义输入项。确认输入时记录来源；标记不适用时记录原因。项目目标或技术栈变化后，已有输入需要重新确认。

<ZoomableImage
  src="/diagrams/input-selection-zh.svg"
  alt="根据项目事实与任务需要选择输入"
  caption="确认来源、记录不适用原因，或保留待确认问题。"
/>

## 登记输入

在 `.continue-harness/inputs/manifest.yaml` 中登记输入。现有 prd、rp、ui、api、assets 类型继续可用，也可以使用项目自定义类型：

```yaml
version: 1
inputs:
  - id: REQ-001
    type: requirements
    path: docs/requirements/export.md
    task_id: T001
    status: active
    source: 用户确认的导出需求
    version: "1"
```

类型名使用小写字母、数字、下划线或连字符。路径指向真实项目文件，不要求复制到固定目录。对话中的需求可以在确认后保存为文件，再登记来源和版本；使用 sha256 可以检测文件变化。

输入的适用原因可以记录在 Intake 的 note 中。待确认输入保留 pending；无需创建空 UI、API 或设计文档。

## 检查变化

使用 `continue-harness-inputs` Skill 检查输入。inspect 检查文件、哈希、冲突和未登记材料；diff 显示输入变化；analyze 提取文本线索。PDF、图片等材料需要 Agent 或相应工具解读。

输入变化后，重新确认需求和受影响的验收项，并运行验证。自动检查可以发现登记和关联问题；它不能判断业务需求是否完整。

## 关联验收

在 `docs/ACCEPTANCE.md` 的需求列引用输入编号，必要时附章节，例如 `REQ-001#导出格式`。实现项、验收标准和证据使用同一任务编号关联，详见[验证](/guide/verification)。

<details>
<summary>CLI 参考</summary>

```bash
continue-harness intake evidence --id data_contract --status confirmed --source docs/data.md --note "本任务依赖字段定义"
continue-harness intake evidence --id ui --status not_applicable --note "本次只修改计算逻辑"
continue-harness inputs inspect --json
continue-harness inputs diff --json
continue-harness inputs analyze --json
```

</details>

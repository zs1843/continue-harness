# 输入与证据

输入为实现和验收提供依据。Continue Harness 记录来源、版本、适用性和任务关联，并标记输入变化对既有结论的影响。

## 确定所需输入

先通过对话确认项目目标、范围、类型、运行环境和已知约束，再根据当前任务逐项判断输入是否适用。项目类型帮助 Agent 形成问题，最终清单以确认后的任务为准。

可能的输入包括需求材料、行为说明、视觉依据、接口契约、数据说明、运行环境约束、验收条件或项目已有资料。它们是按需选择的候选项，不是固定必填清单。

Intake 支持自定义输入项。当前 CLI 还为若干常见项目类型提供候选问题；其他类型使用通用候选问题集。这些问题不限制项目技术栈，也不会让可选输入成为必需项。确认输入时记录来源；标记不适用时记录原因。项目事实变化后，重新确认受影响的输入。

<ZoomableImage
  src="/diagrams/input-selection-zh.svg"
  alt="根据项目事实与任务需要选择输入"
  caption="确认来源、记录不适用原因，或保留待确认问题。"
/>

## 登记输入

在 `.continue-harness/inputs/manifest.yaml` 中登记输入。类型可以沿用现有类别，也可以按项目使用自定义名称：

```yaml
version: 1
inputs:
  - id: REQ-001
    type: requirements
    path: docs/requirements/export.md
    task_id: T001
    status: active
    source: 已确认的需求来源
    version: "1"
```

路径指向真实项目资料，不要求复制到固定目录。对话中确认的需求可以保存为项目资料并登记来源和版本。内容指纹可用于识别后续变化。

待确认输入保留 pending；不适用的输入记录理由；无需创建空白材料。

## 检查变化

使用 `continue-harness-inputs` Skill 检查输入。inspect 检查文件、哈希、冲突和未登记材料；diff 报告输入变化；analyze 提取文本线索。需要语义解释的材料由 Agent 或合适工具审阅。

输入变化后，重新确认受影响的需求和验收项，并运行相关验证。自动检查可以发现登记和关联问题，不能判断业务需求是否完整。

## 关联验收

在 `docs/ACCEPTANCE.md` 中引用输入编号和必要的章节位置。实现项、验收标准和证据使用同一任务编号关联，详见[验证](./verification.md)。

<details>
<summary>CLI 参考</summary>

```bash
continue-harness intake evidence --id data_contract --status confirmed --source docs/data.md --note "本任务依赖字段定义"
continue-harness inputs inspect --json
continue-harness inputs diff --json
continue-harness inputs analyze --json
```

</details>

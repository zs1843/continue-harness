# 验证与快照

本页说明按改动选择验证模式、验收门禁的判定规则，以及快照的创建和内容。模式定义见[验证模式](../reference/verification-modes.md)，命令参数见[命令](../reference/commands.md)。

## 选择模式

模式名称、映射规则和未配置结果以[验证模式](../reference/verification-modes.md)为准。按改动范围选择：小范围配置或工具改动用 `quick`，功能完成用 `feature`，发布前或交接前用 `audit`。

选定模式后用 `verify` Skill 执行验证。

**Skill**：`continue-harness-verify`

**CLI（可选）**：

```bash
continue-harness verify feature
```

## 验收门禁

feature、audit 检查当前任务的验收关联；绑定任务但没有验收记录、引用不完整或存在未收口项时失败。延期和阻塞也不能当作通过。Intake 已配置但未确认，或验证前后绑定状态变化，同样会阻断完成结论。

具体字段、覆盖粒度及报告有效性以[验证与验收](../guide/verification.md)为准，状态判定见[验证模式](../reference/verification-modes.md)。

## 报告

验证报告写入 `tmp/continue-harness/`，内容包括 Markdown、JSON 和每个命令的日志；目录结构见[配置与文件](../reference/config-and-files.md)。报告区分命令失败、环境阻塞、未配置能力和业务失败。

## 创建快照

用 `task` Skill 创建任务快照。

**Skill**：`continue-harness-task`

**CLI（可选）**：

```bash
continue-harness task snapshot T001 --title "任务名称" --request "本次用户要求" --json
```

创建快照要求输入检查为 `passed`，验收状态不是 `needs_confirmation` 或 `not_configured`；已配置的 Intake 必须为 `confirmed`。此外，必须已有当前任务的验证报告，且任务编号和上下文指纹仍匹配，验证期间绑定状态未变化。报告可以记录失败结果，快照会如实保留；它不因此成为验收通过。敏感内容扫描发现问题时也会停止创建。

快照记录：

- 任务说明。
- 修改文件。
- 验证结果。
- 项目上下文、验收关系和输入/实现指纹。
- 相关证据。

## 限制

快照排除 `.env*` 等敏感文件名，并扫描部分常见凭据格式；这不是完整的秘密检测，交接前仍需检查项目文档及证据中是否包含敏感内容。`not_configured` 表示能力缺失，不能当作验证通过。

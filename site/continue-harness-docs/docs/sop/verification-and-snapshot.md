# 验证与快照

本页说明按改动选择验证模式、验收门禁的生效条件，以及快照的创建和内容。模式定义见[验证模式](../reference/verification-modes.md)，命令参数见[命令](../reference/commands.md)。

## 选择模式

模式名称、映射规则和未配置结果以[验证模式](../reference/verification-modes.md)为准。按改动范围选择：小范围配置或工具改动用 `quick`，功能完成用 `feature`，发布前或交接前用 `audit`。

选定模式后用 `verify` Skill 执行验证。

**Skill**：`continue-harness-verify`

**CLI（可选）**：

```bash
continue-harness verify feature
```

## 验收门禁

`verify feature` 和 `verify audit` 追加读取 `docs/ACCEPTANCE.md`。只有该文件存在、含 Markdown 表格且表头有状态列时门禁才生效：未收口项记为失败，延期或外部阻塞项记为 `blocked`。

验证绑定了任务时（显式 `--task`，或缺省时取最近任务），`docs/ACCEPTANCE.md` 不存在、没有表格、表头缺少状态列或存在未收口项时，`verify feature` 与 `verify audit` 一律失败；只有完全没有任务绑定时才不参与失败判定。Consumer H5 preset 不生成 `docs/ACCEPTANCE.md`，它把需求闭环检查登记为 `commands.coverage_closure` 并放进 `verify.feature`，因此该项目类型需要自行提供验收表，否则绑定任务后验证不会通过。

## 报告

验证报告写入 `tmp/continue-harness/`，内容包括 Markdown、JSON 和每个命令的日志；目录结构见[配置与文件](../reference/config-and-files.md)。报告区分命令失败、环境阻塞、未配置能力和业务失败。

## 创建快照

用 `task` Skill 创建任务快照。

**Skill**：`continue-harness-task`

**CLI（可选）**：

```bash
continue-harness task snapshot T001 --title "任务名称" --request "本次用户要求" --json
```

快照记录：

- 任务说明。
- 修改文件。
- 验证结果。
- 项目上下文、验收关系和输入/实现指纹。
- 相关证据。

## 限制

快照不保存 `.env`、密钥、Cookie 或 Access Token。`not_configured` 表示能力缺失，不能当作验证通过。

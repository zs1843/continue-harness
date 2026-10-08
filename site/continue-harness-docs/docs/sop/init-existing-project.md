# 接入已有项目

本页说明给已有项目补 Harness 文件的命令、预检状态和增量接入顺序。命令参数见[命令](../reference/commands.md)。

## 命令

先用 `init` Skill 做只读预检，确认不会覆盖项目自有文件。

**Skill**：`continue-harness-init`

**CLI（可选）**：

```bash
continue-harness init --dry-run
```

需要机器可读的写入计划时用 `plan` Skill。

**Skill**：`continue-harness-plan`

**CLI（可选）**：

```bash
continue-harness plan init --json
```

确认计划后用 `init` Skill 写入缺失的 Harness 文件。

**Skill**：`continue-harness-init`

**CLI（可选）**：

```bash
continue-harness init
```

写入完成后用 `doctor` Skill 做只读诊断。

**Skill**：`continue-harness-doctor`

**CLI（可选）**：

```bash
continue-harness doctor
```

## 预检状态

初始化计划在写入前把文件分成几类：

| 状态 | 含义 |
| --- | --- |
| `create` | 目标文件不存在，可以创建 |
| `unchanged` | 文件已存在且内容一致 |
| `managed_unchanged` | 脚手架管理文件未修改 |
| `project_owned_modified` | 项目已维护，不能直接覆盖 |
| `conflict` | 真实冲突，必须人工处理 |

计划中只要存在冲突，`init` 就不写入任何文件。`--dry-run` 和 `plan init` 输出同一份计划，分别用于人工检查和机器读取。

## 增量接入

`init` 不替换项目的包管理器、测试运行器、样式和 Agent 规则，只补充缺失的 Harness 文件。团队按以下顺序启用能力：

1. 补 `.continue-harness/project.yaml`。
2. 补输入目录和项目文档。
3. 启用 `doctor` 和 `verify`。
4. 按任务需要启用 Design Token、OpenAPI 或 UI System。

## 存量 Token 发现

接入后先用 Design Token Skill 扫描项目已有的视觉值。

**Skill**：`continue-harness-design-tokens`

**CLI（可选）**：

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```

`discover` 只读扫描 `src/` 下 Vue、CSS、SCSS、Less 等样式文件，输出 CSS Variables、高频颜色、字体、间距、圆角、阴影、尺寸、层级、动效和断点候选。确认候选后再更新唯一 Token 真值。

Token 取值优先级见[术语表](../reference/glossary.md)。

## 限制

`discover` 只输出候选值，不写入 `docs/design/tokens.json`；Token 真值的更新由人确认后执行。

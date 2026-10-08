# 创建新项目

本页说明从零创建项目的命令、生成内容和证据补充顺序。目录与路径清单见[项目结构](./project-structure.md)，命令参数见[命令](../reference/commands.md)。

## 命令

先用 `plan` Skill 预览写入计划，确认后再创建项目。

**Skill**：`continue-harness-plan`

**CLI（可选）**：

```bash
continue-harness plan create my-project --preset consumer-h5 --json
```

确认计划后用 `create` Skill 生成项目。

**Skill**：`continue-harness-create`

**CLI（可选）**：

```bash
continue-harness create my-project --preset consumer-h5
```

离线创建同样由 `continue-harness-create` 完成，只是加上 `--skip-install`。

**Skill**：`continue-harness-create`

**CLI（可选）**：

```bash
continue-harness create my-project --preset consumer-h5 --skip-install
```

## 生成内容

显式选择 Consumer H5 preset 后，命令生成：

- uni-app + Vue 3 + Vite 基础项目。
- Playwright runtime 和 visual 验证配置。
- `.continue-harness/project.yaml` 和标准输入目录。
- `AGENTS.md`、`CLAUDE.md`、Cursor rule。
- 该 preset 使用的聚合 Skill：`consumer-h5-harness`。
- docs 下的 PRODUCT、DESIGN、CURRENT_STATUS、PROJECT_MAP、history 和 coverage 文件。
- src 下的 components、services、repositories、stores、utils 等边界目录。

不指定 `--preset` 时使用 generic preset，只生成 Harness 事实目录、Agent 入口和验收骨架，不生成业务页面和框架配置。两个 preset 的文件差异见[配置与文件](../reference/config-and-files.md)。

## 创建与输入的先后顺序

创建命令生成容器和规则，不完成业务。已有材料在创建之后进入项目：

1. 创建项目和输入目录。
2. 把材料放入 `.continue-harness/inputs/prd|rp|ui|api|assets/`。
3. 运行 `continue-harness inputs inspect` 和 `inputs analyze`。
4. 运行 `continue-harness task create` 建立首个任务。

缺少 PRD、UI 或 API 不阻塞创建；这些材料在对应任务开始前登记即可。

## 默认 Skill

Consumer H5 preset 使用 `consumer-h5-harness`；通用项目使用聚合 Skill `generic-harness`。命令级 Skill 按需安装，从仓库的 `skills/<名称>/` 复制到宿主目录：

```bash
cp -R <仓库路径>/skills/continue-harness-api .agents/skills/
```

CLI 可用时也可运行 `continue-harness skills install --project --name continue-harness-api`。详见[安装 Skills](../skills/install.md)。

## 限制

`--skip-install` 跳过依赖安装，生成的项目在安装依赖前无法执行验证命令。

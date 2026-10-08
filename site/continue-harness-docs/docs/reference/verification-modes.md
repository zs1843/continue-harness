# 验证模式

本页定义 6 个验证模式的名称、行为和未配置时的结果。命令入口见[命令](./commands.md)。

## quick

fail-fast 快速反馈。按 `verify.quick.commands` 的顺序执行，首个非通过步骤立即停止。模式未定义命令时返回 `not_configured`。

默认用 `continue-harness-verify` Skill 执行本模式；CLI 可选：`continue-harness verify quick`。

## feature

功能完成门禁。执行 `verify.feature.commands`，并在满足条件时追加验收门禁，见下文「验收门禁」。

默认用 `continue-harness-verify` Skill 执行本模式；CLI 可选：`continue-harness verify feature`。

## runtime

浏览器或运行时检查。Consumer H5 映射到 `dev_ready` 和 `runtime`，后者用 Playwright 检查页面响应、核心内容、console error 和 page error。

默认用 `continue-harness-verify` Skill 执行本模式；CLI 可选：`continue-harness verify runtime`。

## interaction

关键交互检查。Consumer H5 中标记为 `not_configured`；`not_configured` 表示该能力没有配置，不表示通过。

默认用 `continue-harness-verify` Skill 执行本模式；CLI 可选：`continue-harness verify interaction`。

## visual

截图基线对比。缺少 baseline 时该模式整体返回 `not_configured`，不会把未配置的截图检查记为通过。

默认用 `continue-harness-verify` Skill 执行本模式；CLI 可选：`continue-harness verify visual`。

## audit

收集全部配置的检查结果，`fail_fast` 为 `false`，通常用于发布前、交接前或诊断复杂问题。`audit` 同样执行验收门禁。

默认用 `continue-harness-verify` Skill 执行本模式；CLI 可选：`continue-harness verify audit`。

## 配置映射

模式是符号名。CLI 从 `.continue-harness/project.yaml` 读取 `verify.<mode>`，再把其中的命令名解析为 `commands` 里的实际命令，因此同一套模式可以对应不同包管理器和测试运行器。

模式在 `verify` 中完全缺失时命令报错；模式定义为 `status: not_configured` 时返回 `not_configured` 且不执行任何步骤。

## 验收门禁

`feature` 和 `audit` 会额外读取 `docs/ACCEPTANCE.md`。仅当该文件存在、含 Markdown 表格且表头有状态列时验收门禁才生效：存在未收口项时追加失败项；验收项已标记延期或外部阻塞时追加 `blocked` 项。

验证绑定了任务时（显式 `--task`，或缺省时取最近任务），`docs/ACCEPTANCE.md` 不存在、没有表格、表头缺少状态列或存在未收口项时，验收项一律判为失败。只有完全没有任务绑定时，`not_configured` 才不参与失败判定。

## 环境阻塞

命令因端口监听被拒（`listen EPERM`、`EACCES ... listen`）而失败时，结果归类为 `blocked` 环境阻塞，不计为项目业务失败。

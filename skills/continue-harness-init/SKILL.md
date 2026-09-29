---
name: continue-harness-init
description: Safely connect continue-harness to an existing Consumer H5 project. Use when initializing project constraints, input directories, history, tokens, verification, or project-local Skills without overwriting project-owned files.
---

# 接入现有项目

1. 阅读现有 `AGENTS.md`、包配置、页面注册、源码结构和 CI 配置。
2. 运行 `continue-harness plan init --json`。
3. 将“项目已维护”视为项目所有内容，不覆盖；仅对“待创建”执行写入。真实冲突必须交由用户决定。
4. 经计划确认后执行 `continue-harness init`。
5. 运行 `continue-harness inspect --json` 和 `continue-harness doctor`。
6. 主动盘点存量设计：运行 `continue-harness design tokens discover --json`，同时读取已有 CSS Variables、SCSS/Less 变量、全局样式、UI 框架主题配置、公共组件和高频页面样式。不得因为没有新 UI/RP 就跳过现有风格提取。
7. 将发现结果按语义归并到 `docs/design/tokens.json`：存量明确变量标记 `source: 项目已有 Design Token`；从重复样式归纳的值标记 `source: 项目已有实现` 和 `confidence: inferred`；冲突或低频值保持 `needs_confirmation`。先展示候选和影响范围，确认后才写 Token，不改原样式文件。
8. 检查颜色、字体、字号、字重、行高、间距、圆角、阴影、边框、控件高度、图标尺寸、层级、动效和断点；不能只提取品牌色。记录未归一的硬编码值和多套主题来源。
9. 确认根目录 `AGENTS.md` 是唯一约束本体；`CLAUDE.md` 和 Cursor Rule 只能导入或指向它。
10. 缺少项目级命令 Skills 时执行 `continue-harness skills install --project --provider all`。
11. 只补充缺失能力；不自动改旧项目命令、锁文件、业务 API、原始输入或现有样式。Token 提取是建立现状事实，不是重设计。
12. 再运行 `continue-harness design tokens inspect --json`；用中文报告新增文件、保留文件、Token 候选、已确认/推断/冲突值、建议迁移项和未配置能力。

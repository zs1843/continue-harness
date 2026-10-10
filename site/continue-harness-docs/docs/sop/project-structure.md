# 项目结构

默认项目只包含协作记录，不规定业务工程目录。已有项目保留自身的源码、依赖文件和测试结构。

## 示例目录树

以下为目录职责示意，不代表每个项目都会生成全部文件或目录。实际写入范围以当前 `create` / `init` 计划为准。

```text
.continue-harness/
  project.yaml         # 项目配置与命令映射
  intake.yaml          # 已确认事实和输入适用性
  inputs/
    README.md
    manifest.yaml      # 输入来源、版本与任务关联
  logs/                # 执行记录
AGENTS.md              # 唯一约束正文
CLAUDE.md              # 供应商入口
.cursor/rules/
.agents/skills/              # 仅在用户选择 Skill 时存在
.claude/skills/              # 仅在用户选择 Skill 时存在
docs/
  PROJECT.md           # 目标、范围与交付物
  CURRENT_STATUS.md    # 进展和下一步
  DECISIONS.md         # 长期决策
  ACCEPTANCE.md        # 需求、实现与证据关联
  history/             # 交接快照
```

## 职责边界

输入保留在登记的真实路径；日志记录执行过程，历史目录保存交接状态，不再复制一套需求正文。

任务命令按需创建任务元数据和需求草稿。验证报告写入 `tmp/continue-harness/`，可被后续运行覆盖；快照在 `docs/history/tasks/` 保留报告副本和上下文。

## 业务代码与测试

Continue Harness 不要求 `src/pages`、组件目录、特定语言或测试运行器。先确认项目架构，再把项目自己的命令接入验证。UI、API 等材料只在任务依赖时登记。

参见[输入与证据](../guide/evidence.md)和[任务、恢复与快照](../guide/tasks-and-resume.md)。

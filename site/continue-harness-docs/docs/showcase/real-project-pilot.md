# 真实项目 Pilot

> 最近复验：2026-10-09。使用本地 Harness 源码运行；两个项目均未改写验收记录。

本页验证 Intake、输入登记、任务查询、历史记录、上下文恢复、诊断、Audit 和快照门禁。它不代表业务交付已经验收。

## 复验结果

| 检查 | HeTun-Site | Workbench-Admin |
| --- | --- | --- |
| Intake | confirmed | confirmed |
| 输入检查与分析 | passed | passed |
| 任务查询、历史与上下文恢复 | passed；恢复结果包含当前失败报告 | passed；恢复结果包含当前失败报告 |
| 项目已配置的检查 | 均通过 | 均通过 |
| Doctor | failed：环境文件忽略规则缺失；Agent 约束未说明输入清单流程 | failed：环境文件忽略规则缺失；Agent 约束未说明输入清单流程 |
| 验收关联 | needs_confirmation，5 项未闭环 | needs_confirmation，5 项未闭环 |
| Audit | **failed** | **failed** |
| 新快照 | 被未闭环验收阻止 | 被未闭环验收阻止 |

验收表的既有记录缺少机器可核验的任务、需求、实现和证据关联，并存在未覆盖需求。旧记录中的 `verified` 状态不足以单独通过门禁。没有修改 Pilot 项目的验收状态，也没有为得到通过结果而补造证据。

## 复验流程

两项目均执行以下流程；命令的完整参数、退出码和原始输出见本地证据包。

```text
intake inspect
inputs inspect → inputs analyze
task inspect → task history → resume
doctor
verify audit --task T001
task snapshot T001
```

两次 Audit 的项目自有检查均通过，但验收关联未闭环，因此整体状态保持 `failed`。快照命令据此拒绝生成新快照。上下文恢复命令本身成功，并明确呈现了失败状态。

## 可复核证据

公开摘要：[Pilot 结果与报告哈希](/evidence/pilot-2026-10-09.json)。原始命令输出、报告、项目命令日志及本次使用的 Harness 源码副本保存在仓库内的 `.continue-harness/evidence/pilot-rerun-2026-10-09-source-current/`，不随 Site 发布。项目源码以各自 Git 提交号标识；Harness 源码副本和 SHA-256 清单可用于核对运行版本。

| 项目 | 源码提交 | Audit | 报告 SHA-256 |
| --- | --- | --- | --- |
| HeTun-Site | `cf053e1b40b515f4716e1685c0731c6b776c1f8b` | failed | `6a2bd7dbddecf304bccfe04ea63cc19a203b3e25a4b70160f9377f801b6af1d0` |
| Workbench-Admin | `22da4ad755a2682377540f791684bea257c30740` | failed | `1d795fa0e68f12a16b12428c95322e6f19156c6f429599f44280c9cc1ccd4d20` |

## 结论边界

本次验证了任务、输入、日志、上下文恢复和报告绑定在两个不同项目结构中可执行；也确认当前验收门禁会拒绝缺少关联的记录。它没有证明两个 Pilot 已完成业务验收或生成新快照。旧的 `passed` 结论来自较早的门禁运行，不能代表本次结果。

下一步应由项目负责人确认并补齐原有验收记录的关联证据，再复跑 Audit；Harness 不代替项目负责人确认事实。

# Harness 日志

命令日志写入 `commands.ndjson`。日志是追加式执行轨迹，用于记录命令、时间、退出码、输出摘要和产物路径；它不是项目约束、长期决策或任务交接快照。

Agent 运行日志应关联任务、输入、快照和验收结果，不得写入密钥、Cookie、Token 或敏感请求体。长期有效的决策写入 `docs/DECISIONS.md`，不可变交接上下文写入 `docs/history/`。

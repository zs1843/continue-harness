# 任务、恢复与留痕

## 稳定任务编号

```bash
continue-harness task create --title "任务名称" --json
continue-harness task inspect T001 --json
continue-harness task history T001 --json
```

任务编号把 PRD/RP、API operationId、实现文件、验证报告和快照串在一起。编号会继续读取已有 PRD、manifest、历史、覆盖记录和快照目录，不会因为迁移或换人重新从 `T001` 开始。

## 恢复协作现场

```bash
continue-harness resume
continue-harness resume --json
continue-harness resume --task T001 --json
```

`resume` 是只读的。它汇总当前任务、输入状态、最近快照、覆盖矩阵、持久决策、Git 改动和最多三个下一步动作。新 Agent 先读这份状态，再按任务类型加载证据，可以减少上下文漂移。

## 快照

```bash
continue-harness task snapshot T001 \
  --title "任务名称" \
  --request "本次用户要求" \
  --json
```

快照包含任务说明、修改文件、验证结果、Design Token diff 和相关证据。它不会保存 `.env`、密钥、Cookie 或 Access Token。

## 当前对话的交接

每次对话完成后，Agent 应告诉用户接下来可以做什么，并列出少量编号动作。用户回复动作编号即可继续；缺少事实、存在冲突或需要审批时，仍必须明确说明，不能用编号选择掩盖边界。

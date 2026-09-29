# 验证与快照

## 选择验证模式

| 场景 | 推荐模式 |
| --- | --- |
| 小范围配置或工具改动 | `continue-harness verify quick` |
| 完整功能实现 | `continue-harness verify feature` |
| 视觉回归 | `continue-harness verify visual` |
| 发布前或审计 | `continue-harness verify audit` |

## feature 为什么重要

`feature` 不是简单跑测试。对 Consumer H5 来说，它还承担需求闭环：

- 可达页面是否覆盖。
- 弹窗和状态是否覆盖。
- 用户动作和返回路径是否覆盖。
- 未完成项是否明确延期或记录为外部阻塞。

这能防止“首屏能打开，所以功能完成”的错觉。

## 报告输出

验证报告写入：

```text
tmp/continue-harness/
```

报告包括 Markdown、JSON 和每个命令的日志。命令失败、环境阻塞、未配置能力和业务失败应该被区分记录。

## 创建快照

```bash
continue-harness task snapshot T001 --title "任务名称" --request "本次用户要求" --json
```

快照记录：

- 任务说明。
- 修改文件。
- 验证结果。
- Design Token diff。
- 相关证据。

快照不保存 `.env`、密钥、Cookie 或 Access Token。

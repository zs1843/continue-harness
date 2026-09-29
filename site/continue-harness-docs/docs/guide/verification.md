# 验证与报告

验证模式由 `.continue-harness/project.yaml` 映射到底层命令。Agent 不应写死某个包管理器命令，而应读取项目配置。

| 模式 | 用途 |
| --- | --- |
| `quick` | 小范围改动的快速、失败即停检查 |
| `feature` | 功能完成门禁，包含项目配置的完整检查 |
| `runtime` | 页面启动、浏览器响应和运行时错误 |
| `interaction` | 关键用户流程；项目未配置时会明确标记 |
| `visual` | 截图基线和像素差异 |
| `audit` | 尽量运行所有已配置检查并汇总失败 |

```bash
continue-harness verify quick
continue-harness verify feature
continue-harness verify runtime
continue-harness verify visual
continue-harness verify audit
```

Consumer H5 的 `feature` 和 `audit` 还包含 requirement closure：可达页面、弹窗、状态、动作和返回路径必须被验证、明确延期，或记录为外部阻塞。首屏能打开、构建成功或截图成功都只是证据，不能替代需求覆盖闭环。

## 报告

报告默认写入：

```text
tmp/continue-harness/
```

目录中会有 Markdown、JSON 和每个命令的日志。业务失败、环境阻塞、未配置能力和通过状态需要分开解释。

## 当前限制

- 视觉验证没有基线时会报告 `not_configured`，不能当作通过。
- 本地端口监听被环境禁止时会归类为环境阻塞。
- 交互验证不会凭空生成关键流程，必须由项目配置真实入口。

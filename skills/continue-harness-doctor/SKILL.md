---
name: continue-harness-doctor
description: Diagnose a continue-harness project without modifying it. Use when checking Node/pnpm, scripts, uni-app pages, inputs, task history, Design Token integrity, visual baselines, sensitive files, Agent workflow, or distinguishing deterministic failures from warnings and unconfigured capabilities.
---

# 诊断 Harness 项目

1. 运行 `continue-harness doctor --json` 获取可追踪结果；需要人读输出时运行 `continue-harness doctor`。
2. 按“失败、待确认、未配置、通过、不适用”分组，不把启发式建议升级为确定性错误。
3. 优先修复确定性失败；修复前读取建议与项目事实。
4. 工具链、端口权限、registry 或 Corepack 问题应与项目业务失败分开报告。
5. Doctor 是只读操作。用户只要求诊断时不得直接修改项目。
6. 修复完成后重跑一次，并报告仍未配置的能力。

# 任务与实现

本页说明任务编号的创建、按任务类型读取证据的范围和实现边界。命令参数见[命令](../reference/commands.md)。

## 创建任务

用 `task` Skill 创建任务编号。

**Skill**：`continue-harness-task`

**CLI（可选）**：

```bash
continue-harness task create --title "任务名称" --json
```

任务编号通常形如 `T001`。它把以下内容绑定到同一任务编号：

- PRD/RP 片段。
- API operationId 选择。
- 实现文件。
- 验证结果。
- 快照和历史。

## 按任务类型读取证据

| 任务类型 | 需要读取 |
| --- | --- |
| 业务实现 | manifest、PRODUCT、PRD/RP |
| UI 调整 | DESIGN、Design Token、UI 输入、视觉调整记录 |
| API 接入 | API 输入、OpenAPI snapshot、selection.yaml |
| 架构决策 | DECISIONS、ARCHITECTURE、相关历史 |

## 证据加载范围

每次只加载当前任务类型对应的证据。全部读入会把无关材料带进上下文，例如 API 任务混入旧视觉调整记录，或 UI 调整被迫进入接口生成流程。

## 目录职责

Consumer H5 preset 建议的边界：

- 页面放在 `src/pages/`，不同页面拆成不同目录。
- 组件放在 `src/components/`。
- 请求封装放在 `src/services/`。
- 业务数据映射放在 `src/repositories/`。
- 跨页面纯函数放在 `src/utils/`。
- 状态管理放在 `src/stores/`。

这些目录让页面、组件、接口、状态和工具函数各有归属。

## 限制

`docs/ACCEPTANCE.md` 不存在、含表格但缺少状态列，或存在未收口项时，`task snapshot` 都在写入前报错。快照要求验收已收口。

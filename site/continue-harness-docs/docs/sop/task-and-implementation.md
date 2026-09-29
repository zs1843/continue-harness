# 任务与实现

## 创建任务编号

```bash
continue-harness task create --title "任务名称" --json
```

任务编号通常类似 `T001`。它的作用不是形式化命名，而是把下面这些内容绑定起来：

- PRD/RP 片段。
- API operationId 选择。
- 实现文件。
- 验证结果。
- 快照和历史。

## 按任务类型加载证据

实现开始前，Agent 应先判断任务类型：

| 任务类型 | 需要读取 |
| --- | --- |
| 业务实现 | manifest、PRODUCT、PRD/RP |
| UI 调整 | DESIGN、Design Token、UI 输入、视觉调整记录 |
| API 接入 | API 输入、OpenAPI snapshot、selection.yaml |
| 架构决策 | DECISIONS、ARCHITECTURE、相关历史 |

## 为什么不一次读完

一次读完所有材料看似稳妥，实际会造成上下文污染。比如 API 任务不应该被旧视觉调整记录干扰；UI 调整也不应该因为未选 operationId 被迫进入接口生成流程。

按任务加载证据能让 Agent 的注意力更接近真实问题，也能减少 token 消耗。

## 实现边界

Consumer H5 preset 建议的边界：

- 页面放在 `src/pages/`，不要把多个独立页面堆进一个 `.vue`。
- 组件放在 `src/components/`。
- 请求封装放在 `src/services/`。
- 业务数据映射放在 `src/repositories/`。
- 跨页面纯函数放在 `src/utils/`。
- 状态管理放在 `src/stores/`。

这些目录不是为了制造仪式感，而是让页面、组件、接口、状态和工具函数有明确归属。

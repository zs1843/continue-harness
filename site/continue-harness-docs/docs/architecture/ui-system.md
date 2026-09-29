# UI System

UI System Adapter 是可选协议，不是默认 UI 依赖。它依赖项目已经明确的 Design Token 真值，但不替项目定义 Token。

## 它解决什么

真实项目经常会选择 TDesign、Vant 或其他组件库。Harness 不能在 Core 中导入这些库，但又需要让 Agent 知道组件语义和 Token 映射。

UI System Adapter 提供：

- 组件语义。
- Design Token 映射。
- 组件使用约束。
- 页面转场和布局 section 描述。
- 视觉调整记录格式。

## 为什么不自动加生产依赖

UI runtime 是项目技术决策。Adapter 安装只是证据安装，不应该自动修改生产依赖。

如果项目决定采用某个 UI runtime，需要：

1. 锁定生产依赖版本。
2. 迁移组件使用。
3. 验证页面和视觉。
4. 再移除旧 runtime。

## Design Token 权威

项目拥有唯一 machine-readable Design Token source。Adapter 只解释如何映射到组件库变量。

已有项目接入时，应先执行只读 discovery，识别 CSS Variables 和高频视觉值，再由用户确认语义 Token。

详细规则见 [Design Token](./design-tokens.md)。

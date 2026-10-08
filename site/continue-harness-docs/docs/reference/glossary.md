# 术语表

本页定义文档和 CLI 输出中反复出现的术语。

| 术语 | 含义 |
| --- | --- |
| Harness | 围绕项目事实、约束、验证和留痕的工程协议 |
| Core | 业务无关运行时，负责配置、诊断、验证、报告和安全写入 |
| Product Profile | 产品形态规则，例如 Consumer H5 |
| Platform Adapter | 运行平台规则，例如 Web Mobile |
| Stack Adapter | 框架和工具链规则，例如 uni-app |
| Input | 登记的原始证据：PRD、RP、UI、API 或 assets |
| Design Token | 项目唯一机器可读视觉真值；保存颜色、字号、间距、圆角、阴影、层级和动效等语义值，并记录来源状态 |
| Token Authority | Token 取值的权威来源，优先级为：高保真 UI、RP、用户临时视觉要求、项目既有 Token、DESIGN 原则、Harness 默认值、Agent 推断 |
| Requirement Closure | 需求闭环；要求 PRD/RP 中可达页面、状态、动作和返回路径都被验证、延期或记录为外部阻塞 |
| Task | 稳定编号，把证据、实现、验证和快照绑定到同一任务编号 |
| Resume | 只读的协作现场汇总，包含当前任务、输入状态、快照和下一步动作 |
| Managed File | 由 Harness 生成并带 metadata 保护的文件；手工修改后，后续生成拒绝覆盖 |
| UI Contract | 项目自有的组件、Token 和视觉边界记录 |
| Aggregate Skill | 按 preset 和项目阶段选择的聚合工作流 Skill；用户不需要记住具体 Skill 名称 |
| Command-specific Skill | 针对单个命令或专项能力的 Skill，例如 `continue-harness-api`、`continue-harness-design-tokens` |

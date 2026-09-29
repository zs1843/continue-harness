# UI System 与视觉生成边界

## 权威分工

| 证据 | 负责内容 |
| --- | --- |
| PRD | 业务规则、权限和验收条件 |
| RP | 页面节点、流程、交互和状态 |
| Page Flow Model | 可达页面、状态和跳转的机器可读闭包 |
| Layout Spec | 页面区域、滚动/固定关系、语义组件和视觉参考元数据 |
| UI System Adapter | 组件目录、语义映射、Token 映射和使用约束 |
| Semantic Design Token | 与框架无关的品牌、密度、排版和视觉参数 |
| UI Reference | 视觉校准、截图比较和页面例外证据 |

UI 图不单独承担业务或交互权威。RP 不单独承担最终视觉权威。

## 通用配置

```yaml
ui:
  system:
    adapter: tdesign-uniapp
    version: 0.1.0-experimental
    policy: preferred
facts:
  ui_system_adapter: .continue-harness/ui-systems/tdesign-uniapp/adapter.yaml
  page_flow_model: .continue-harness/models/page-flow.yaml
  layout_specs: .continue-harness/models/layout-specs.yaml
  ui_adjustments: .continue-harness/ui/adjustments.yaml
```

`required` 表示存在语义映射时必须采用系统组件；`preferred` 允许有记录地包装或自定义；
`none` 表示项目明确不使用组件系统。Core 只验证协议，不导入具体组件库。

Adapter 描述文件由 Harness 提供，不等于安装 UI runtime。项目真正引用组件后，runtime 必须作为
生产依赖保留并锁定版本：

```yaml
ui:
  system:
    adapter: tdesign-uniapp
    version: 0.1.0-experimental
    policy: preferred
    runtime:
      status: installed
      package: "<项目确认的 UI 包>"
      version: "<锁定版本>"
```

只安装试用且源码没有引用时可以卸载。切换 UI 框架时必须先完成组件和 Token 迁移，运行 feature、
runtime、interaction、visual 验证，再移除旧 runtime。不得长期并存多个完整 UI 框架。

## Adapter 证据顺序

安装包类型声明 → 同版本源码/元数据 → 同版本官方文档 → `llms.txt` → MCP → 模型记忆。
在线证据必须记录查询时间和对应安装版本，不能用最新版文档解释旧依赖。

## 微调归因

视觉差异按 `token`、`component`、`layout`、`responsive`、`page_exception` 分类，记录在
`.continue-harness/ui/adjustments.yaml`。跨两个无关项目重复出现的差异才考虑上升为默认 Token、
Adapter 规则或 Layout Pattern；业务特例保留在项目内。

真实 pilot 必须记录首次与最终截图差异率、生成迭代次数和人工调整数量。只有两个无关项目中
相同指标都下降，才能宣称 Adapter 减少了微调；协议 fixture 通过不能替代这一结论。

## TDesign UniApp

首个 Adapter 为实验状态，只提供协议和映射证据，不自动添加生产依赖。项目必须自行锁定并验证
实际 TDesign UniApp 包版本、H5 兼容性、包体积、主题覆盖、弹层滚动、键盘和安全区行为。

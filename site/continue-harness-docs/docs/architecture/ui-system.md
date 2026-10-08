# UI System

UI System Adapter 是可选的组件语义映射协议，不是默认 UI 依赖。本页说明 Adapter 现状、协议文件、UI Contract 行为、Token 关系和依赖策略。

## Adapter

`tdesign-uniapp` 是唯一的 UI System Adapter，标记为 experimental，不是任何 preset 的依赖。Adapter 提供：

- 组件语义。
- Design Token 映射。
- 组件使用约束。
- 页面转场和布局 section 描述。
- 视觉调整记录格式。

`ui systems` 与 `ui contract` 目前仅提供 CLI，没有对应 Skill。

```bash
continue-harness ui systems list --json
continue-harness ui systems install tdesign-uniapp --dry-run --json
```

## 协议文件

项目通过 facts 指向三个协议文件，`core/ui-system.mjs` 分别校验：

| 文件 | schema | 校验函数 |
| --- | --- | --- |
| `.continue-harness/models/page-flow.yaml` | `page-flow-model/v1` | `validatePageFlowModel` |
| `.continue-harness/models/layout-specs.yaml` | `layout-spec/v1` | `validateLayoutSpecCollection` |
| `.continue-harness/ui/adjustments.yaml` | `ui-adjustments/v1` | `validateAdjustmentLog` |

Page Flow Model 承接 RP 的页面节点和转场，Layout Spec 承接页面布局、section 和视觉参考元数据，Adjustment Log 记录 token、component、layout、responsive 和 page_exception 五类调整。

## UI Contract

仅 CLI：`continue-harness ui contract inventory --write` 扫描 `src/` 下的 `.vue` 文件并生成组件清单，组件状态一律标记为 `protected`，“使用页面”“公开接口”“视觉状态”固定为待确认。采用记录、组件边界与视觉证据由模板文件承载，需人工确认后才能作为证据。

```bash
continue-harness ui contract inspect --json
continue-harness ui contract inventory --write --json
```

## Design Token

项目拥有唯一 machine-readable Design Token source，Adapter 只解释如何映射到组件库变量。已有项目接入时先执行只读 discovery（默认由 `continue-harness-design-tokens` Skill 执行，CLI 可选），识别 CSS Variables 和高频视觉值，再由用户确认语义 Token。详细规则见 [Design Token](./design-tokens.md)。

## 依赖策略

UI runtime 是项目技术决策，Adapter 安装只写证据，不修改生产依赖。项目决定采用某个 UI runtime 时依次执行：

1. 锁定生产依赖版本。
2. 迁移组件使用。
3. 验证页面和视觉。
4. 移除旧 runtime。

## 边界

Page Flow Model、Layout Spec 和 Adjustment Log 协议目前只在 `list-detail`、`form-result` 两个内置 fixture 上验证；其他页面结构需要补充对应证据。

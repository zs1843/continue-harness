# Design Token

Design Token 是 UI 任务中可选的、唯一机器可读视觉真值。它回答的问题不是“这个按钮看起来差不多吗”，而是“颜色、字号、间距、圆角、阴影、层级和动效到底以哪份来源为准”。它不绑定特定产品、平台或框架。

## Token 真值文件

默认真值文件是：

```text
docs/design/tokens.json
```

解释文档是：

```text
docs/design/TOKENS.md
```

`tokens.json` 保存机器可读数值，`TOKENS.md` 只解释来源、命名、使用方式和维护规则，不复制第二套数值。

## 来源优先级

当不同来源给出不同视觉信息时，优先级固定为：

| 优先级 | 来源 | 为什么 |
| --- | --- | --- |
| 1 | 高保真 UI | 最接近最终视觉交付，通常是视觉验收的直接依据 |
| 2 | RP | 描述页面结构、交互状态和局部视觉暗示，低于高保真 UI |
| 3 | 用户临时视觉要求 | 用户可以覆盖既有输入，但必须记录覆盖原因 |
| 4 | 项目既有 Token | 已上线或已沉淀的项目视觉资产，不能被模板轻易覆盖 |
| 5 | `docs/DESIGN.md` 原则 | 设计原则提供方向，但通常不如具体 Token 精确 |
| 6 | Harness 默认值 | 只能作为空项目占位，不能宣称代表真实业务视觉 |
| 7 | Agent 推断 | 最低优先级，只能临时标记为 inferred，等待确认 |

这条顺序的核心是：越接近真实视觉交付和用户明确表达的来源，权重越高；越通用、越推断性的来源，权重越低。

## 为什么不能让 Harness 默认值成为真实 Token

Harness 默认值只是为了让空项目有稳定结构。它不代表品牌、不代表产品气质，也不代表 UI 稿。

如果把默认值当成真实 Token，会产生三个问题：

- 页面看似有设计系统，实际没有视觉证据。
- Agent 会围绕占位值继续扩展，后续替换成本更高。
- 验收时无法说明视觉值来自哪里。

所以新项目的 Token 状态应保持 `pending_extraction`，等真实 UI/RP/项目样式进入后再提炼。

## 如何定义 Token

定义 Token 时先确认来源，再写数值。

推荐步骤：

1. 运行 `continue-harness design tokens inspect --json`，确认唯一真值文件和当前状态。
2. 查看本任务是否有高保真 UI、RP、用户临时要求或既有项目样式。
3. 按来源优先级确定每个 Token 的 authority。
4. 在 `docs/design/tokens.json` 中写入语义 Token，而不是直接写页面局部样式。
5. 在 `TOKENS.md` 中解释命名、来源和使用规则。
6. 运行 `continue-harness design tokens diff --json`，把差异写入任务快照和变更历史。

## 什么是语义 Token

语义 Token 描述“用途”，不是描述“颜色长相”。

推荐：

```json
{
  "color": {
    "brandPrimary": {
      "value": "#2f6f73",
      "source": "ui",
      "status": "confirmed"
    },
    "textPrimary": {
      "value": "#202124",
      "source": "existing_project",
      "status": "confirmed"
    }
  }
}
```

不推荐：

```json
{
  "color": {
    "green1": "#2f6f73",
    "darkText": "#202124"
  }
}
```

语义命名可以让组件和页面表达意图。`brandPrimary` 可以映射到按钮、导航和强调态；`green1` 只能描述颜色本身，无法说明业务含义。

## Existing Project 的 Token 发现

接入已有项目时，不应该直接用空模板覆盖既有样式。应先只读发现：

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```

发现范围包括 `src/` 下的 Vue、CSS、SCSS 和 Less。输出候选包括：

- CSS Variables。
- 高频颜色。
- 字体和字号。
- 间距。
- 圆角。
- 阴影。
- 尺寸。
- 层级。
- 动效。
- 断点。

这些候选不是自动确认的 Token。它们只是证据，需要结合 UI/RP 和用户确认后写入唯一真值。

## 用户覆盖如何记录

用户可以明确覆盖 UI 或既有 Token。例如“这个主按钮改成更深的绿色”。这种覆盖有效，但必须记录：

- 修改前值。
- 修改后值。
- 覆盖来源。
- Token 版本。
- 影响页面和组件。
- 覆盖原因。

这样后续视觉回归或设计复盘时，能分清是 UI 稿变化、项目约束变化，还是一次临时业务要求。

## 与 UI System Adapter 的关系

Design Token 是项目真值，UI System Adapter 是映射协议。

例如项目选择 TDesign UniApp，Adapter 可以说明 `brandPrimary` 如何映射到组件库变量或组件语义，但它不能替项目决定 `brandPrimary` 应该是什么值。

这条边界避免了 UI runtime 反过来绑架项目视觉系统。

## 验收边界

未建立视觉基线时，不得宣称“视觉还原已验证”。此时可以说：

- Token 已提炼。
- 页面已按 Token 实现。
- runtime 或 feature 验证已通过。
- visual baseline 尚未配置。

只有建立 baseline 并完成视觉回归后，才能把截图差异作为视觉验收证据。

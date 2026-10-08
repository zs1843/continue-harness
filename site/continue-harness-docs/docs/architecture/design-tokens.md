# Design Token

Design Token 是 UI 任务中可选的、唯一机器可读视觉真值，不绑定特定产品、平台或框架。本页说明真值文件、来源优先级、定义步骤、语义命名、既有项目发现和验收边界。

## 真值文件

```text
docs/design/tokens.json     机器可读数值
docs/design/TOKENS.md       来源、命名、使用方式和维护规则
```

`TOKENS.md` 只解释来源和维护规则，不复制第二套数值。

## 来源优先级

| 优先级 | 来源 |
| --- | --- |
| 1 | 高保真 UI |
| 2 | RP |
| 3 | 用户临时视觉要求 |
| 4 | 项目既有 Token |
| 5 | `docs/DESIGN.md` 原则 |
| 6 | Harness 默认值 |
| 7 | Agent 推断 |

越接近真实视觉交付和用户明确表达的来源，权重越高。用户覆盖既有输入时必须记录覆盖原因；Agent 推断只能临时标记为 `inferred`。

## 默认值状态

Harness 默认值只让空项目有稳定结构，不代表品牌、产品气质或 UI 稿。新项目的 Token 状态保持 `pending_extraction`，等真实 UI、RP 或项目样式进入后再提炼。把默认值当成真实 Token，会让页面看似有设计系统但没有视觉证据，并推高后续替换成本。

## 定义步骤

1. 用 `continue-harness-design-tokens` Skill 运行 `design tokens inspect`（CLI 可选：`continue-harness design tokens inspect --json`），确认唯一真值文件和当前状态。
2. 查看本任务是否有高保真 UI、RP、用户临时要求或既有项目样式。
3. 按来源优先级确定每个 Token 的 authority。
4. 在 `docs/design/tokens.json` 中写入语义 Token，而不是页面局部样式。
5. 在 `TOKENS.md` 中解释命名、来源和使用规则。
6. 用 `continue-harness-design-tokens` Skill 运行 `design tokens diff`（CLI 可选：`continue-harness design tokens diff --json`）；该命令只读，仅当项目提供前后版本时给出差异，不写入文件。

## 语义 Token

语义 Token 描述用途，不描述颜色长相。推荐：

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

`brandPrimary` 可以映射到按钮、导航和强调态；`green1` 只能描述颜色本身，无法说明业务含义。

## 既有项目发现

接入已有项目时先用只读 discovery，不直接用空模板覆盖既有样式。

**Skill**：`continue-harness-design-tokens`

**CLI（可选）**：

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```

发现范围包括 `src/` 下的 Vue、CSS、SCSS 和 Less，输出 CSS Variables、高频颜色、字体字号、间距、圆角、阴影、尺寸、层级、动效和断点候选。候选不是自动确认的 Token，需要结合 UI/RP 和用户确认后写入唯一真值。

## 用户覆盖

用户可以明确覆盖 UI 或既有 Token，例如把主按钮改成更深的绿色。这种覆盖有效，但必须记录修改前值、修改后值、覆盖来源、Token 版本、影响页面和组件以及覆盖原因，以便后续视觉回归或设计复盘时分清 UI 稿变化、项目约束变化和临时业务要求。

## 与 UI System Adapter 的关系

Design Token 是项目真值，UI System Adapter 是映射协议。Adapter 可以说明 `brandPrimary` 如何映射到组件库变量或组件语义，但不能替项目决定 `brandPrimary` 的值，因此 UI runtime 不反向决定项目视觉系统。映射协议见 [UI System](./ui-system.md)。

## 验收边界

未建立视觉基线时，不得宣称视觉还原已验证。此时可以声明 Token 已提炼、页面已按 Token 实现、runtime 或 feature 验证已通过、visual baseline 尚未配置。只有建立 baseline 并完成视觉回归后，截图差异才能作为视觉验收证据。

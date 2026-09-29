# 接入已有项目

已有项目接入时，首要原则是安全：不能覆盖项目已经维护的文件。

## 推荐命令

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

## 预检状态

初始化计划会把文件分成几类：

| 状态 | 含义 |
| --- | --- |
| `create` | 目标文件不存在，可以创建 |
| `unchanged` | 文件已存在且内容一致 |
| `managed_unchanged` | 脚手架管理文件未修改 |
| `project_owned_modified` | 项目已维护，不能直接覆盖 |
| `conflict` | 真实冲突，必须人工处理 |

只要有冲突，`init` 就不会写入任何文件。

## 为什么要保守

已有项目的目录结构、脚本、样式和 Agent 规则可能已经承载真实业务经验。Harness 的职责是补充工程协议，而不是替换项目所有权。

保守接入可以让团队逐步采用：

- 先补 `.continue-harness/project.yaml`。
- 再补输入目录和项目文档。
- 再启用 Doctor 和 verify。
- 最后按任务需要启用 Design Token、OpenAPI 或 UI System。

## 接入后的第一件事

接入已有项目后，应运行存量视觉发现：

```bash
continue-harness design tokens discover --json
continue-harness design tokens inspect --json
```

发现命令只读扫描 `src/` 下 Vue/CSS/SCSS/Less，输出 CSS Variables、高频颜色、字体、间距、圆角、阴影、尺寸、层级、动效和断点候选。确认后再更新唯一 Token 真值。

Token 定义必须遵循固定来源优先级：高保真 UI、RP、用户临时视觉要求、项目既有 Token、DESIGN 原则、Harness 默认值、Agent 推断。详见 [Design Token](../architecture/design-tokens.md)。

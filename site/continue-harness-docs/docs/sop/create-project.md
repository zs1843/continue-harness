# 创建新项目

## 命令

```bash
continue-harness plan create my-project --preset consumer-h5 --json
continue-harness create my-project --preset consumer-h5
```

离线创建：

```bash
continue-harness create my-project --preset consumer-h5 --skip-install
```

## 会生成什么

以上命令显式选择 Consumer H5 preset，会生成：

- uni-app + Vue 3 + Vite 基础项目。
- Playwright runtime/visual 验证配置。
- `.continue-harness/project.yaml`。
- `.continue-harness/inputs/` 标准输入目录。
- `AGENTS.md`、`CLAUDE.md`、Cursor rule。
- 该 preset 使用的聚合 Skill：`consumer-h5-harness`。
- docs 下的 PRODUCT、DESIGN、CURRENT_STATUS、PROJECT_MAP、history 和 coverage 文件。
- src 下的 components、services、repositories、stores、utils 等边界目录。

## 为什么不在创建前要求 PRD/UI/API

创建项目的目标是生成容器和规则，不是立刻完成业务。真实项目经常会出现输入暂时不完整的情况。如果在创建阶段强行要求所有材料齐备，会让脚手架变成流程阻塞。

正确做法是：

1. 先创建项目和输入目录。
2. 把已有材料放入 `.continue-harness/inputs/`。
3. 再登记、分析和创建首个任务。

## 默认只安装聚合 Skill

Consumer H5 preset 默认安装 `consumer-h5-harness`。通用项目默认安装 `generic-harness`；命令级 Skills 仍可按需安装：

```bash
continue-harness skills install --project --name continue-harness-api
```

这样做是为了减少默认上下文。普通业务任务不需要一开始就加载 OpenAPI、Design Token、UI System、视觉基线等深层规则。

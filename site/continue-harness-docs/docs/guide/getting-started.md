# 创建或接入项目

## 从零创建

先预览，再创建：

```bash
continue-harness plan create my-h5 --json
continue-harness create my-h5
cd my-h5
continue-harness inspect --json
```

`create` 当前使用 `consumer-h5` preset，生成 uni-app + Vue 3 + Vite 的最小项目、Playwright 验证配置、`.continue-harness/` 状态目录、项目约束文件、历史和覆盖矩阵。默认会安装依赖；离线时使用 `--skip-install`。

创建阶段只建立容器，不要求 PRD、UI 或 API 已经齐全。材料准备好后，再登记输入和创建第一个任务。

## 接入已有项目

```bash
continue-harness init --dry-run
continue-harness plan init --json
continue-harness init
continue-harness doctor
```

`init` 的安全规则是：只创建缺失文件，不覆盖项目已经维护的文件。只要预检发现真实冲突，就不会写入任何文件。

| 计划状态 | 含义 |
| --- | --- |
| `create` | 目标文件不存在，将创建 |
| `managed_unchanged` | Harness 管理文件仍是模板内容 |
| `project_owned_modified` | 项目已经维护，保留项目内容 |
| `conflict` | 需要人工处理的真实冲突 |

## 接入后的最小检查

```bash
continue-harness inspect --json
continue-harness doctor --json
continue-harness inputs inspect --json
```

如果是已有前端项目，再按需运行 `continue-harness design tokens discover --json`，先发现存量样式事实，再确认唯一 Token 真值。发现过程不会直接改写业务样式。

## 从旧目录迁移

旧版本项目可能使用 `.fe-harness/`。迁移前先预览：

```bash
continue-harness migrate --dry-run --json
continue-harness migrate
```

迁移只在 `.continue-harness/` 不存在时整体移动目录；目标目录已存在时会停止并报告冲突。未迁移的旧项目仍可被读取和操作。

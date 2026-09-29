# 配置与文件

## 项目配置

入口文件：

```text
.continue-harness/project.yaml
```

它声明：

- Harness 包和版本。
- 项目名称和产品类型。
- platform 选择。
- stack adapter。
- facts 文件路径。
- 命令映射。
- verify modes。
- 可选 sources、ui、api 配置。

## 关键事实文件

| 文件 | 作用 |
| --- | --- |
| `AGENTS.md` | 项目唯一约束本体 |
| `docs/PROJECT_MAP.md` | 模块地图 |
| `docs/CURRENT_STATUS.md` | 当前状态和限制 |
| `docs/PRODUCT.md` | 产品事实 |
| `docs/DESIGN.md` | 设计事实 |
| `docs/DECISIONS.md` | 长期决策 |
| `docs/IMPLEMENTATION_COVERAGE.md` | 需求覆盖 |

## 生成报告

```text
tmp/continue-harness/
```

该目录被 Git 忽略。报告可以作为本地调试和 CI artifact。

## 生成接口文件

```text
src/types/api.generated.ts
src/services/api.generated.ts
.continue-harness/api/generated.json
```

这些文件受 managed metadata 保护。

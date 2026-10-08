# 新建项目后的项目结构

运行通用项目创建命令：

```bash
continue-harness create my-project
```

默认会得到一个业务中立、与技术栈无关的项目。它提供 Harness 事实目录、Agent 入口和验收记录骨架，不生成业务页面。只有显式使用 `--preset consumer-h5` 时，才会生成对应的 uni-app 项目结构；下方目录树仅适用于该专项 preset。

## 标记说明

| 标记 | 含义 |
| --- | --- |
| 必需 | 默认工作流依赖，除非明确迁移，否则不要删除 |
| 可选 | 只有对应任务或团队需要时才启用 |
| 按需 | 默认生成目录或 README，但实际文件在任务发生时产生 |
| 项目维护 | 由项目团队维护，Harness 不应擅自覆盖 |
| Harness 管理 | 由 Harness 模板或 CLI 管理，更新前要看计划 |

## 完整目录树

```text
my-h5/
├── .continue-harness/                         # Harness 项目事实和任务数据
│   ├── api/
│   │   └── selection.yaml                # 按任务选择 operationId
│   ├── inputs/
│   │   ├── api/README.md                 # API 输入放置说明
│   │   ├── assets/README.md              # 资产输入放置说明
│   │   ├── prd/README.md                 # PRD 输入放置说明
│   │   ├── rp/README.md                  # RP 输入放置说明
│   │   ├── ui/README.md                  # UI 输入放置说明
│   │   └── manifest.yaml                 # 输入登记清单
│   ├── models/
│   │   ├── layout-specs.yaml             # 页面布局规格
│   │   └── page-flow.yaml                # 页面流和交互模型
│   ├── snapshots/README.md                # API 或任务快照说明
│   ├── ui/
│   │   └── adjustments.yaml               # 视觉调整记录
│   └── project.yaml                       # 项目唯一 Harness 配置入口
├── .cursor/
│   └── rules/continue-harness.mdc               # Cursor 薄适配规则
├── docs/
│   ├── design/
│   │   ├── COMPONENTS.md                 # 组件语义和使用边界
│   │   ├── TOKENS.md                     # Token 解释，不复制数值
│   │   └── tokens.json                   # 唯一机器可读 Design Token 真值
│   ├── history/
│   │   ├── CHANGE_HISTORY.md             # 实现变更历史
│   │   └── PRD_HISTORY.md                # PRD 输入和需求历史
│   ├── CHANGELOG.md                      # 面向项目的变更日志
│   ├── CURRENT_STATUS.md                 # 当前状态、限制和下一步
│   ├── DECISIONS.md                      # 长期架构和重要决策
│   ├── DESIGN.md                         # 项目设计事实和视觉原则
│   ├── IMPLEMENTATION_COVERAGE.md        # PRD/RP 需求覆盖矩阵
│   ├── PRODUCT.md                        # 项目产品事实
│   └── PROJECT_MAP.md                    # 项目模块地图
├── src/
│   ├── components/
│   │   ├── BaseButton.vue                # 最小基础组件示例
│   │   └── README.md                     # 组件边界说明
│   ├── composables/README.md             # 可复用 Vue composables 说明
│   ├── fixtures/README.md                # 测试和开发 fixture 说明
│   ├── pages/
│   │   ├── index/
│   │   │   └── index.vue                 # 默认占位首页
│   │   └── pages.json                    # uni-app 页面注册
│   ├── repositories/README.md            # 业务数据映射层说明
│   ├── services/
│   │   ├── http.ts                       # 通用 HTTP 请求封装
│   │   └── README.md                     # 服务层边界说明
│   ├── stores/README.md                  # 跨页面状态说明
│   ├── styles/
│   │   ├── reset.scss                    # 全局样式重置
│   │   └── tokens.scss                   # 编译期样式 Token 映射
│   ├── types/README.md                   # 类型定义边界说明
│   ├── utils/
│   │   ├── format.ts                     # 通用格式化函数示例
│   │   └── README.md                     # 纯函数和工具边界说明
│   ├── App.vue                           # uni-app 根组件
│   ├── main.ts                           # 应用入口
│   ├── manifest.json                     # uni-app 应用元信息
│   └── pages.json                        # 项目页面注册
├── tests/
│   ├── e2e/
│   │   ├── dev-ready.mjs                # 开发服务就绪检查
│   │   ├── runtime.spec.mjs              # 浏览器运行时检查
│   │   └── visual.spec.mjs               # 截图视觉检查
│   ├── unit/README.md                    # 单元测试约定
│   ├── visual/
│   │   ├── baselines/README.md           # 视觉基线目录
│   │   ├── diffs/README.md               # 视觉差异目录
│   │   └── README.md                     # 视觉测试说明
│   ├── coverage-closure.mjs              # 需求闭环检查
│   └── structure.test.mjs                # 项目结构检查
├── .editorconfig                         # 编辑器基础格式
├── .env.example                          # 环境变量示例，不含真实凭据
├── .eslintrc.cjs                         # ESLint 配置
├── .gitignore                            # Git 忽略规则
├── .prettierignore                       # Prettier 忽略规则
├── .prettierrc                           # Prettier 配置
├── AGENTS.md                             # 唯一项目约束本体
├── CLAUDE.md                             # Claude Code 薄适配
├── env.d.ts                              # TypeScript 环境声明
├── index.html                            # Vite HTML 入口
├── package.json                          # 项目依赖和脚本
├── playwright.config.mjs                 # Playwright 配置
├── tsconfig.json                         # TypeScript 配置
└── vite.config.mjs                       # Vite / uni-app 构建配置
```

## `.continue-harness/`

这是 Harness 的项目事实区，不是业务源码区。

| 路径 | 状态 | 用途 |
| --- | --- | --- |
| `.continue-harness/project.yaml` | 必需 / 项目维护 | 选择 profile、platform、stack、命令和验证模式 |
| `.continue-harness/inputs/manifest.yaml` | 必需 | 记录 PRD/RP/UI/API/assets 的登记状态 |
| `.continue-harness/inputs/*/` | 必需目录 / 按需填充 | 保存原始输入，原始证据默认只读 |
| `.continue-harness/api/selection.yaml` | 必需文件 / API 按需使用 | 为任务选择 operationId |
| `.continue-harness/models/page-flow.yaml` | 按需 | 记录页面、状态、动作和转场 |
| `.continue-harness/models/layout-specs.yaml` | 按需 | 记录页面组合和布局规格 |
| `.continue-harness/ui/adjustments.yaml` | UI 按需使用 | 记录视觉调整、前后值和影响范围 |
| `.continue-harness/snapshots/` | 按需 | 保存快照说明和相关输入 |

为什么单独建立这一层：Harness 的配置、输入和任务记录需要和 `src/` 解耦。这样业务代码可以变化，但任务证据和工程协议仍然可追踪。

## `docs/`

这是项目的可读知识层。机器读取 `tokens.json`、`project.yaml` 和 YAML 模型，人和 Agent 读取 Markdown 解释。

| 路径 | 状态 | 用途 |
| --- | --- | --- |
| `docs/PROJECT_MAP.md` | 必需 | 说明项目模块和边界 |
| `docs/CURRENT_STATUS.md` | 必需 | 记录当前完成度、限制和下一步 |
| `docs/PRODUCT.md` | 业务任务必需 | 记录产品事实 |
| `docs/DESIGN.md` | UI 任务必需 | 记录视觉原则和权威来源 |
| `docs/design/tokens.json` | UI 项目必需 | 唯一机器可读 Token 真值 |
| `docs/design/TOKENS.md` | UI 项目必需 | 解释 Token，不复制第二套值 |
| `docs/IMPLEMENTATION_COVERAGE.md` | 功能任务必需 | 记录需求节点是否验证、延期或阻塞 |
| `docs/DECISIONS.md` | 架构决策可选 | 只记录长期约束和重要取舍 |
| `docs/history/` | 任务后使用 | 记录 PRD 和实现变化 |
| `docs/CHANGELOG.md` | 推荐 | 面向项目成员的变化摘要 |

## `src/`

这是业务实现区。Harness 只提供边界和少量中性示例，不替项目生成具体业务模块。

| 路径 | 状态 | 用途 |
| --- | --- | --- |
| `src/pages/` | 必需 | 页面级入口；不同页面默认拆成不同目录 |
| `src/components/` | 必需 | 可复用 UI 组件 |
| `src/services/` | 必需 | HTTP、请求 wrapper 和外部服务调用 |
| `src/repositories/` | 可选 | API 返回值到页面业务模型的映射 |
| `src/stores/` | 可选 | 跨页面共享状态 |
| `src/composables/` | 可选 | 可复用 Vue 组合逻辑 |
| `src/utils/` | 推荐 | 跨页面纯函数和轻量工具 |
| `src/types/` | 推荐 | 业务和公共类型 |
| `src/fixtures/` | 测试/开发可选 | 本地 fixture 和测试数据 |
| `src/styles/` | 必需 | reset 和样式 Token 映射 |
| `src/App.vue` | 必需 | uni-app 根组件 |
| `src/main.ts` | 必需 | 应用入口 |
| `src/manifest.json` | 必需 | uni-app 应用元信息 |
| `src/pages.json` | 必需 | uni-app 页面注册 |

`src/pages/`、`src/components/`、`src/services/` 和 `src/utils/` 的边界应该保持清晰。不要把多个独立页面塞进一个 Vue 文件，也不要把所有 API 业务映射直接写进页面。

## `tests/`

| 路径 | 状态 | 用途 |
| --- | --- | --- |
| `tests/structure.test.mjs` | 必需 | 验证目录、页面注册和基础结构 |
| `tests/coverage-closure.mjs` | Consumer H5 功能必需 | 验证需求覆盖矩阵是否收口 |
| `tests/e2e/dev-ready.mjs` | 推荐 | 检查开发服务是否就绪 |
| `tests/e2e/runtime.spec.mjs` | 推荐 | 检查页面响应、console error 和 uncaught error |
| `tests/e2e/visual.spec.mjs` | UI 任务可选 | 执行截图回归 |
| `tests/visual/baselines/` | 视觉任务可选 | 保存已确认的视觉基线 |
| `tests/visual/diffs/` | 视觉任务可选 | 保存截图差异 |
| `tests/unit/` | 业务需要时 | 放单元测试 |

视觉目录默认只提供 README，不代表已经配置视觉基线。没有 baseline 时只能报告 visual `not_configured`。

## 根目录工程文件

| 文件 | 状态 | 用途 |
| --- | --- | --- |
| `package.json` | 必需 | 依赖、脚本和项目名称 |
| `vite.config.mjs` | 必需 | Vite 和 uni-app 构建配置 |
| `playwright.config.mjs` | 推荐 | 浏览器测试和移动视口配置 |
| `tsconfig.json` | 推荐 | TypeScript 类型检查 |
| `.eslintrc.cjs` | 推荐 | ESLint 规则 |
| `.prettierrc` | 推荐 | 格式化规则 |
| `.editorconfig` | 推荐 | 编辑器换行、缩进和编码 |
| `.env.example` | 推荐 | 环境变量键名示例，不放秘密 |
| `.gitignore` | 必需 | 忽略依赖、报告、环境文件和本地产物 |
| `AGENTS.md` | 必需 | 所有 Agent 的唯一约束来源 |
| `CLAUDE.md` | Claude Code 可选 | 导入 `AGENTS.md` 的供应商适配 |
| `.cursor/rules/continue-harness.mdc` | Cursor 可选 | 指向 `AGENTS.md` 的供应商适配 |
| `index.html` | 必需 | Vite HTML 入口 |
| `env.d.ts` | TypeScript 可选 | 环境类型声明 |

## 哪些内容可以删除

可以在项目确认不需要后删除或调整：

- `src/components/BaseButton.vue`：只是最小基础组件示例。
- `src/utils/format.ts`：只是格式化函数示例。
- 各目录下的 `README.md`：如果团队已经在模块地图中维护等价边界说明，可以合并后删除。
- `tests/e2e/visual.spec.mjs` 和视觉目录：项目明确不做视觉回归时可以关闭，但必须同步 project config 和文档。
- `src/repositories/`、`src/stores/`、`src/composables/`、`src/fixtures/`：项目不需要对应边界时可以保留空目录说明，也可以在团队确认后移除。

不建议直接删除：

- `AGENTS.md`。
- `.continue-harness/project.yaml`。
- `docs/PROJECT_MAP.md` 和 `docs/CURRENT_STATUS.md`。
- `src/pages.json`、`src/main.ts`、`src/App.vue`。
- `tests/coverage-closure.mjs`，除非产品明确不采用需求闭环门禁并同步修改验证配置。

# continue-harness VitePress 文档站

可部署的完整文档项目位于：

```text
site/continue-harness-docs/
```

源码入口：

```text
site/continue-harness-docs/docs/index.md
```

该文档站包含 continue-harness 的建设背景、使用 SOP、模块设计解释、验证策略、Agent 协作方式和静态部署说明。

本地开发：

```bash
cd site/continue-harness-docs
pnpm install
pnpm docs:dev
```

文档站位于主仓库目录下，但拥有独立的 lockfile。目录内的 `.npmrc` 会让 pnpm 自动按独立项目安装；
如果使用旧版 pnpm 或配置未生效，可以显式执行：

```bash
pnpm install --ignore-workspace
```

构建：

```bash
cd site/continue-harness-docs
pnpm docs:build
```

构建产物：

```text
site/continue-harness-docs/docs/.vitepress/dist/
```

打包命令：

```bash
tar -czf continue-harness-docs.tar.gz -C site/continue-harness-docs/docs/.vitepress/dist .
```

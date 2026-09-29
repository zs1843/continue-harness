# continue-harness VitePress 文档站

这是 continue-harness 的多页静态文档项目，使用 VitePress 生成可部署的 HTML 资源。

## 本地查看

```bash
cd site/continue-harness-docs
pnpm install
pnpm docs:dev
```

## 构建

```bash
cd site/continue-harness-docs
pnpm docs:build
```

构建产物输出到：

```text
site/continue-harness-docs/docs/.vitepress/dist/
```

## 打包

```bash
tar -czf continue-harness-docs.tar.gz -C site/continue-harness-docs/docs/.vitepress/dist .
```

生成的 `continue-harness-docs.tar.gz` 可解压到 Nginx、GitHub Pages、OSS/CDN、Vercel 静态目录或其他静态托管服务。

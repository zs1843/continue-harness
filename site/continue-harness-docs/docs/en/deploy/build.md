# Build and deploy

The documentation site uses VitePress, with sources in `site/continue-harness-docs/docs/`. Run the following commands from `site/continue-harness-docs`.

## Install dependencies

```bash
cd site/continue-harness-docs
pnpm install
```

## Local preview

```bash
pnpm docs:dev
```

## Build static assets

```bash
pnpm docs:build
```

Output directory:

```text
site/continue-harness-docs/docs/.vitepress/dist/
```

## Preview the build output

```bash
pnpm docs:preview
```

## Package

```bash
tar -czf continue-harness-docs.tar.gz -C site/continue-harness-docs/docs/.vitepress/dist .
```

## Deploy

Upload the contents of the `dist` directory to a static host, for example:

- Nginx static root
- GitHub Pages
- OSS/CDN
- Vercel
- Netlify
- an object-storage static website

When deploying under a sub-path, set the VitePress `base` option in `docs/.vitepress/config.mjs`.

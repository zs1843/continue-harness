# Build and deploy the docs

```bash
cd site/continue-harness-docs
npm install
npm run docs:build
```

The static output is written to:

```text
docs/.vitepress/dist/
```

Preview it locally with `npm run docs:preview`. Any static host that serves the generated directory can host the documentation site.

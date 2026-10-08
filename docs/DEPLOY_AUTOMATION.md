# 文档站自动化部署方案

> 状态：**方案分析，尚未启用**。本文件说明如何把 `site/continue-harness-docs` 的构建产物自动发布到
> 腾讯云 + 宝塔面板服务器。落地前请先确认文末「待确认信息」，并注意：新增部署工作流属于 release
> automation 变更，需要显式批准后才写入本仓库。

## 现状与约束

| 事项 | 事实 |
| --- | --- |
| 站点形态 | VitePress 静态站，源码 `site/continue-harness-docs/docs/` |
| 构建产物 | `site/continue-harness-docs/docs/.vitepress/dist/` |
| 产物归属 | `dist/` 已从 Git 取消追踪（见根 [`.gitignore`](../.gitignore)），必须由构建产生 |
| 路由模式 | `cleanUrls: true`，页面 URL 不带 `.html` |
| 现有 CI | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) 只做「构建验证」，不发布 |
| 目标服务器 | 腾讯云 + 宝塔面板 |
| 目标地址 | https://ai.zs1843.cn |
| 双语文档 | 中英文在同一个 `dist/`，一次构建即可 |

两个由此产生的硬性要求：

1. `cleanUrls` 要求 Web 服务器把 `/guide/overview` 回退到 `guide/overview.html`，否则直接访问或刷新会 404。
2. 既然产物不入库，服务器上不能依赖“仓库里已有的 dist”，必须“先构建、再发布”。

## 方案对比

| 方案 | 触发方式 | 构建位置 | 服务器依赖 | 凭据面 | 复杂度 | 结论 |
| --- | --- | --- | --- | --- | --- | --- |
| **A. Actions 构建 + rsync/SSH 到宝塔站点目录** | push main / 手动 | GitHub Actions | 仅 SSH + nginx | 1 个部署私钥 | 低 | **推荐** |
| B. Actions 构建 + 宝塔 WebHook 回调拉取制品 | push main | GitHub Actions | WebHook + 拉取脚本 | WebHook 密钥 + 制品访问凭据 | 中 | 备选（无法入站 SSH 时） |
| C. 服务器侧 `git pull` + 构建 | 宝塔计划任务 | 服务器 | Node 20 + pnpm + 访问 GitHub | 仓库只读凭据 | 中 | 不推荐（拉 GitHub 易受限、构建吃服务器资源） |
| D. 本地构建 + 手动上传 tar | 人工 | 本机 | 手动 | — | 最低 | 现状，非自动化 |
| E. 腾讯云 COS/CDN 对象存储发布 | push main | GitHub Actions | 无（纯对象存储） | COS 密钥 | 中 | 已上 CDN 时更优 |

推荐 **方案 A**：构建只在 Actions 完成，服务器只负责静态托管，凭据面最小，且天然支持原子发布与回滚。

## 方案 A 落地

### 1. 服务器与宝塔准备

1. 宝塔「网站」→ 添加站点：域名 `ai.zs1843.cn`，类型纯静态，PHP 版本选「纯静态」。
2. 自定义站点根目录为 `/www/wwwroot/ai.zs1843.cn/current`（见下一步的发布布局）。
3. 安全组放行 `80`、`443`；SSH 端口建议改非默认并限制来源 IP。
4. 宝塔「SSL」为该站点申请 Let's Encrypt 证书并开启「强制 HTTPS」。
5. 宝塔「文件」中确认站点目录属主，避免发布用户与面板用户互相踩权限。

### 2. 发布布局（releases + current 软链）

不要直接把 `dist/` 覆盖到站点根目录，否则发布中途会出现半新半旧。改用版本目录 + 软链切换：

```text
/www/wwwroot/ai.zs1843.cn/
├── releases/
│   ├── 20261008T155000Z/      # 每次发布一个时间戳目录
│   └── 20261007T101500Z/
└── current -> releases/20261008T155000Z   # 站点根目录指向这里
```

发布过程：rsync 到新的 `releases/<时间戳>/` → 原子切换 `current` 软链 → 清理旧版本。切换是原子的，回滚只需把软链指回旧目录。

### 3. nginx 关键配置

在宝塔站点配置文件（`/www/server/panel/vhost/nginx/ai.zs1843.cn.conf`）的 `server` 块内确认/补充：

```nginx
root /www/wwwroot/ai.zs1843.cn/current;
index index.html;

# cleanUrls：/guide/overview -> guide/overview.html
location / {
    try_files $uri $uri.html $uri/ =404;
}

# VitePress 带哈希的构建资源，可长缓存
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# 无哈希的静态资源，短缓存并允许校验
location ~* \.(?:svg|ico|png|jpe?g|webp|gif|woff2?)$ {
    expires 7d;
    add_header Cache-Control "public";
}

# HTML 不缓存，保证发版后立即生效
location ~* \.html$ {
    add_header Cache-Control "no-cache";
}

gzip on;
gzip_types text/css application/javascript application/json image/svg+xml text/plain;
gzip_min_length 1024;
```

> 注意：若站点部署在子路径，需同时在 VitePress `config.mjs` 设置 `base`，并相应调整 `try_files`。

### 4. 部署用户与 SSH

1. 服务器新建部署专用用户（示例 `deploy`），只授予站点目录写权限：

```bash
useradd -m -s /bin/bash deploy
mkdir -p /www/wwwroot/ai.zs1843.cn/releases
chown -R deploy:deploy /www/wwwroot/ai.zs1843.cn
```

2. 生成仅供 CI 使用的密钥对（不要复用个人密钥），把公钥写入部署用户：

```bash
# 在可信环境生成
ssh-keygen -t ed25519 -f ./deploy_key -C "gh-actions-docs-deploy" -N ""
# 公钥追加到服务器
cat deploy_key.pub >> /home/deploy/.ssh/authorized_keys
```

3. 收紧 `sshd_config`：`PasswordAuthentication no`、`PermitRootLogin no`，仅保留密钥登录。

### 5. GitHub Secrets

在仓库 `Settings → Secrets and variables → Actions` 添加：

| Secret | 说明 |
| --- | --- |
| `SSH_HOST` | 服务器 IP 或域名 |
| `SSH_PORT` | SSH 端口 |
| `SSH_USER` | 部署用户（如 `deploy`） |
| `SSH_PRIVATE_KEY` | 上一步生成的部署私钥全文 |
| `DEPLOY_ROOT` | `/www/wwwroot/ai.zs1843.cn` |

### 6. GitHub Actions 工作流（提案，未写入仓库）

```yaml
name: Deploy docs

on:
  push:
    branches: [main]
    paths:
      - 'site/continue-harness-docs/**'
      - '.github/workflows/deploy-docs.yml'
  workflow_dispatch:

concurrency:
  group: deploy-docs
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10.12.1

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install docs dependencies
        run: pnpm --dir site/continue-harness-docs install --ignore-workspace --frozen-lockfile --force

      - name: Build docs
        run: pnpm --dir site/continue-harness-docs docs:build

      - name: Configure SSH
        run: |
          mkdir -p ~/.ssh
          printf '%s\n' "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -p "${{ secrets.SSH_PORT }}" -H "${{ secrets.SSH_HOST }}" >> ~/.ssh/known_hosts

      - name: Upload release
        env:
          RELEASE: ${{ github.run_id }}-${{ github.sha }}
        run: |
          set -euo pipefail
          TARGET="${{ secrets.DEPLOY_ROOT }}/releases/${RELEASE}"
          ssh -p "${{ secrets.SSH_PORT }}" "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}" "mkdir -p '$TARGET'"
          rsync -az --delete -e "ssh -p ${{ secrets.SSH_PORT }}" \
            site/continue-harness-docs/docs/.vitepress/dist/ \
            "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:$TARGET/"

      - name: Activate and prune
        env:
          RELEASE: ${{ github.run_id }}-${{ github.sha }}
        run: |
          ssh -p "${{ secrets.SSH_PORT }}" "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}" bash -s <<EOF
          set -euo pipefail
          ROOT='${{ secrets.DEPLOY_ROOT }}'
          ln -sfn "\$ROOT/releases/${RELEASE}" "\$ROOT/current.tmp"
          mv -Tf "\$ROOT/current.tmp" "\$ROOT/current"
          ls -1dt "\$ROOT"/releases/* | tail -n +6 | xargs -r rm -rf
          EOF
```

### 7. 回滚

```bash
# 查看可用版本
ls -1dt /www/wwwroot/ai.zs1843.cn/releases/*
# 切回上一个版本
ln -sfn /www/wwwroot/ai.zs1843.cn/releases/<旧时间戳> /www/wwwroot/ai.zs1843.cn/current.tmp
mv -Tf /www/wwwroot/ai.zs1843.cn/current.tmp /www/wwwroot/ai.zs1843.cn/current
```

保留最近 5 个版本（工作流里 `tail -n +6` 已实现），便于快速回滚。

## 备选方案

### B. 宝塔 WebHook 回调（无法从 Actions 入站 SSH 时）

在宝塔安装 WebHook 插件，Actions 构建完成后把 `dist` 打成压缩包上传到可从服务器访问的位置
（GitHub Release 资产或腾讯云 COS），再用 WebHook 触发服务器脚本下载解压并切换 `current`。比方案 A
多一套制品访问凭据，但不需要服务器开放公网 SSH。

### C. 服务器侧构建（不推荐）

宝塔「计划任务」定时 `git pull && pnpm install && pnpm build`。缺点：服务器需长期安装 Node 20 + pnpm，
构建消耗服务器资源，且服务器直连 GitHub 常不稳定，容易静默失败。

### D. 腾讯云 COS/CDN

若已为 `ai.zs1843.cn` 接入腾讯云 CDN，直接把 `dist/` 同步到 COS 存储桶、由 CDN 回源即可，服务器可完全
下线。需要 COS 密钥与 CDN 缓存刷新策略。适合有 CDN 或未来要抗量的场景。

## 与现有流程的衔接

- CI 仍然只做构建验证；部署是独立工作流，避免日常 PR 触发发布。
- `dist/` 不再入库，发布产物只存在于服务器 `releases/`（可选：同时上传为 Actions artifact 留档）。
- 工作流限定了 `paths`，只有文档相关改动才发布，避免纯代码提交触发无意义部署。
- 中英文站点由同一次 `dist` 覆盖，无需分别发布。

## 风险与注意

| 风险 | 应对 |
| --- | --- |
| `cleanUrls` 未回退导致 404 | 确认 `try_files $uri $uri.html $uri/ =404` |
| 覆盖式发布出现半新半旧 | 使用 `releases/` + `current` 软链原子切换 |
| 部署私钥泄露 | 专用密钥、只授权站点目录、禁用密码登录、可随时在服务器移除公钥 |
| 缓存导致发版不生效 | HTML `no-cache`，带哈希资源长缓存 |
| 认证失败静默 | Actions 步骤 `set -euo pipefail`，失败即红灯 |
| 服务器磁盘被历史版本占满 | 只保留最近 5 个版本 |

## 待确认信息

落地前需要你提供/确认：

1. 域名是否为 `ai.zs1843.cn`，以及宝塔中该站点的实际根目录路径。
2. 服务器 SSH 主机、端口、部署用户名（是否允许新建 `deploy` 用户）。
3. 是否已接入腾讯云 CDN/COS（决定选方案 A 还是 D）。
4. 该 GitHub 仓库是否可正常运行 Actions（私有库需注意额度）。
5. 是否同意新增 `.github/workflows/deploy-docs.yml`（属于 release automation 变更，需显式批准）。

## 验证方式

1. 先在服务器手动执行一次“rsync 到 releases + 切换软链”，确认 nginx 与权限正确。
2. 本地/服务器 `curl -I https://ai.zs1843.cn/guide/overview` 确认 200 且无需 `.html`。
3. `curl -I https://ai.zs1843.cn/favicon.svg` 确认图标可访问。
4. 触发一次 `workflow_dispatch` 手动发布，检查 Actions 全绿并在浏览器强刷确认内容更新。
5. 回滚演练：切到上一版本并确认恢复。

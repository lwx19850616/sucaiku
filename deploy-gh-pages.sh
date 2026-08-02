#!/usr/bin/env bash
# ============================================================
#  一键部署到 GitHub Pages（gh-pages 分支）
#
#  为什么不用 `git subtree push --prefix dist`：
#  仓库 .gitignore 忽略了 dist/，git subtree 只能拿到"已跟踪"的
#  dist 文件（早期只提交过 favicon.svg 和 index.html），
#  导致 gh-pages 缺 assets/ 和 slides/，线上直接 404 变残站。
#
#  本脚本在 /tmp 临时仓库里完整复制 dist 内容，force 推送到
#  gh-pages，不碰主仓库工作树，也不受 .gitignore 干扰。
# ============================================================
set -euo pipefail
# 先锁定仓库绝对路径（后续会 cd 进 /tmp 临时仓库，不能再依赖相对 $0）
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

[ -d dist ] || { echo "dist 不存在，请先运行 npm run build"; exit 1; }

TMP="$(mktemp -d)"/ghpages
mkdir -p "$TMP"
cp -r dist/. "$TMP/"

cd "$TMP"
git init -q
git config user.name "lwx19850616"
git config user.email "1530711713@qq.com"
git add -A
git commit -q -m "deploy: gh-pages $(date +%F)"

# 复用主仓库 remote URL（内含鉴权，无需重复填写）
REPO_URL=$(git -C "$REPO_DIR" remote get-url origin)
git push --force "$REPO_URL" HEAD:gh-pages

echo "部署完成：https://lwx19850616.github.io/sucaiku/"

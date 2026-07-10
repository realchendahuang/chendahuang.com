# 开源项目栏目设计

## 目标

在不改变现有主页视觉骨架的前提下，为独立开源项目建立长期可维护的展示入口，并补充 Codex Playbook。

## 信息架构

- 新增 `/projects` 页面和顶部导航「项目」。
- 首批收录 God-Museum、AI Chronicle、FlareMo、sub-store-cloudflare。
- 项目数据存放在 `content/projects/*.yml`，页面只负责统一渲染。
- 首页保留 `Selected work`，仅展示独立项目的精简摘要，并提供进入完整项目页的入口。
- Playbook 和 Agent Skill 维持独立分类；`codex-playbook` 加入 `/playbooks`，`dahuang-x-post` 加入 `/skills`。

## 展示规则

每个项目包含名称、简介、类型、标签、日期、状态、GitHub 地址和可选在线地址。项目页沿用 Playbook/Skill 页的编辑式列表语言，避免引入新的视觉体系。在线项目提供「在线体验」，所有项目提供 GitHub 入口。

## SEO 与发布

- `/projects` 设置独立标题、描述、Canonical 与 OG 信息。
- 将 `/projects` 加入预渲染和 Sitemap。
- 完成 lint、typecheck、build，并检查桌面端和移动端后再部署 Cloudflare Pages。

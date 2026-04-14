# CHANGELOG (Lite)

> Status: Active
> Audience: GitHub visitor / contributor / maintainer
> Last updated: 2026-04-13
> Related docs: `README.md`, `docs/README.md`, `docs/SESSION_COMPACT.md`


## 2026-04-13

- 文档主轴已收口为两份唯一基线：`Curator-AI-v3-产品规划.md` 与 `Curator-AI-v3-开发执行手册.md`
- 重写根 README、docs 索引、贡献说明与脚本说明，统一 GitHub 发布口径
- 明确 `SESSION_COMPACT.md` 为内部连续性档案，不再承担 GitHub 首页说明
- 对外文档统一当前简历主链路：`PDF -> MarkItDown -> 个人简历.md -> JSON/生成`
- 版本口径统一为 `3.1.0`，新增 `public` 分支公开发布脚本与仓库泄露扫描门禁

## 2026-04-12

- PDF 导入主链路切换为 MarkItDown：`PDF -> 个人简历.md -> 主简历 JSON / 岗位生成 / 准备包 / 复盘`
- `/api/chat` 与 `ai-engine` 收口回纯文本消息协议
- 清除旧 PDF 直读分支与多模态消息协议残留
- 修复 Windows 下 MarkItDown helper 的 UTF-8 输出问题，真实 PDF 样本已验证可转出有效 Markdown

## 2026-04-10

- 脚本结构收敛为“根目录入口 + scripts 逻辑实现”
- 发布 / 打包口径固定为 Windows，macOS / Linux 仅启动
- 微信分享包改为用户向轻量内容，不包含发布脚本
- 文档统一归档到 `docs/`，README 增加文档导航与体积说明
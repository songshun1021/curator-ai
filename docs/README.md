# Docs 索引

本目录存放 Curator AI 的产品、开发、发布与协作基线文档。

## 阅读顺序

### 1. 基线文档

| 文档 | 用途 | 目标读者 | 当前状态 | 何时阅读 |
| --- | --- | --- | --- | --- |
| `Curator-AI-v3-产品规划.md` | 唯一产品规划基线，定义产品边界、交互形态与目标能力 | 维护者、协作者、Agent | Canonical | 理解项目做什么、哪些能力该做/不该做时 |
| `Curator-AI-v3-开发执行手册.md` | 唯一开发执行基线，定义阶段目标、开发顺序与验收方式 | 维护者、协作者、Agent | Canonical | 进入开发实现、拆任务、回归验收前 |
| `SESSION_COMPACT.md` | 全量连续性档案，记录阶段状态、完成项、验证结果、待办与交接建议 | 维护者、协作者、Agent | Internal | 开始新一轮开发、交接或排查历史决策时 |

### 2. 治理与规划文档

| 文档 | 用途 | 目标读者 | 当前状态 | 何时阅读 |
| --- | --- | --- | --- | --- |
| `BASELINE_ALIGNMENT_MATRIX.md` | 校验基线文档与代码现状的阶段性偏离 | 维护者、Agent | Active | 发现“文档说法”和实现不一致时 |
| `ROADMAP_4W_MULTI_AGENT.md` | 多 Agent 推进节奏与里程碑规划 | 维护者 | Active | 组织并行推进或阶段排期时 |
| `QA_REGRESSION_MATRIX.md` | 回归矩阵与风险等级 | 维护者、测试者 | Active | 回归前、发布前 |

### 3. 发布与开源文档

| 文档 | 用途 | 目标读者 | 当前状态 | 何时阅读 |
| --- | --- | --- | --- | --- |
| `RELEASE_SECURITY_CHECKLIST.md` | 发布前安全与签收检查 | 维护者 | Active | GitHub 发布或对外分享前 |
| `CHANGELOG-lite.md` | 对外可见的精简变更摘要 | GitHub 访客、贡献者 | Active | 发布说明、版本摘要时 |

### 4. 历史问题复盘

| 文档 | 用途 | 目标读者 | 当前状态 | 何时阅读 |
| --- | --- | --- | --- | --- |
| `PDF_RESUME_IMPORT_ROOT_CAUSE.md` | 历史 PDF 导入问题的排障记录与根因分析 | 维护者、Agent | Historical | 需要追溯旧问题、理解为什么切到 MarkItDown 方案时 |

## 当前主链路口径

- PDF 是导入源，不是下游生成的直接证据源
- 当前稳定主链路是：`PDF -> MarkItDown -> 个人简历.md -> 主简历 JSON / 岗位生成 / 准备包 / 复盘`
- `/api/chat` 当前为纯文本消息协议
- PDF 导入链路的唯一主方案是 MarkItDown

## 协作说明

- 每轮任务结束后，主控协作者需要同步更新 `SESSION_COMPACT.md`
- 若基线文档与代码不一致，优先结合 `BASELINE_ALIGNMENT_MATRIX.md` 与 `SESSION_COMPACT.md` 判断当前阶段性偏离
- GitHub 发布前，至少同步检查：`README.md`、`docs/README.md`、`CHANGELOG-lite.md`、`SESSION_COMPACT.md`

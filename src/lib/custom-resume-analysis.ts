import { normalizeResumeData } from "@/lib/resume-import";
import { ResumeData } from "@/types";

function normalizeText(value: string | undefined) {
  return String(value ?? "")
    .trim()
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function parseResumeDataContent(content: string | undefined) {
  if (!content?.trim()) return null;
  try {
    return normalizeResumeData(JSON.parse(content));
  } catch {
    return null;
  }
}

function collectDescriptionEntries(resume: ResumeData) {
  return [
    ...(resume.internships ?? []).map((entry) => ({
      section: "internships" as const,
      descriptions: entry.descriptions ?? [],
    })),
    ...((resume.projects ?? []).map((entry) => ({
      section: "projects" as const,
      descriptions: entry.descriptions ?? [],
    })) ?? []),
    ...(resume.campusExperience ?? []).map((entry) => ({
      section: "campusExperience" as const,
      descriptions: entry.descriptions ?? [],
    })),
  ];
}

function flattenNormalizedDescriptions(resume: ResumeData) {
  return collectDescriptionEntries(resume)
    .flatMap((entry) => entry.descriptions)
    .map((line) => normalizeText(line))
    .filter(Boolean);
}

function countChangedDescriptionRatio(source: ResumeData | null | undefined, target: ResumeData) {
  if (!source) return 1;
  const sourceLines = flattenNormalizedDescriptions(source);
  const targetLines = flattenNormalizedDescriptions(target);
  if (targetLines.length === 0) return 0;
  let unchanged = 0;
  for (const line of targetLines) {
    if (sourceLines.includes(line)) unchanged += 1;
  }
  return (targetLines.length - unchanged) / targetLines.length;
}

function countMeaningfulExperienceEntries(resume: ResumeData) {
  let count = 0;
  for (const entry of resume.internships ?? []) {
    const base = [entry.company, entry.position, entry.startDate, entry.endDate].filter((value) => value?.trim()).length;
    const descriptions = (entry.descriptions ?? []).filter((item) => item.trim()).length;
    if (base >= 2 || descriptions >= 2) count += 1;
  }
  for (const entry of resume.projects ?? []) {
    const base = [entry.name, entry.role].filter((value) => value?.trim()).length;
    const descriptions = (entry.descriptions ?? []).filter((item) => item.trim()).length;
    if (base >= 1 && descriptions >= 1) count += 1;
  }
  for (const entry of resume.campusExperience ?? []) {
    const base = [entry.organization, entry.role].filter((value) => value?.trim()).length;
    const descriptions = (entry.descriptions ?? []).filter((item) => item.trim()).length;
    if (base >= 2 || descriptions >= 1) count += 1;
  }
  return count;
}

function getJdSignals(jdContent: string) {
  const jd = normalizeText(jdContent);
  return {
    metrics: /(增长|转化|留存|gmv|roi|sql|数据分析|指标|分析)/.test(jd),
    project: /(项目|推进|落地|协同|跨部门|执行|跟进)/.test(jd),
    business: /(用户|业务|商家|客户|场景|市场|运营)/.test(jd),
    product: /(需求|原型|prd|竞品|用户研究|访谈|产品)/.test(jd),
  };
}

function getTargetSignalCoverage(target: ResumeData) {
  const descriptions = flattenNormalizedDescriptions(target);
  const text = descriptions.join(" ");
  return {
    hasMetrics: /\d|%|提升|增长|转化|留存|用户|gmv|roi/.test(text),
    hasProjectScope: /负责|推进|协调|落地|对接|跟进|统筹/.test(text),
    hasBusinessContext: /用户|业务|场景|客户|商家|市场|运营/.test(text),
    hasProductEvidence: /需求|原型|竞品|访谈|产品|分析/.test(text),
  };
}

export function analyzeCustomResumeFit(args: {
  sourceResume?: ResumeData | null;
  targetResume: ResumeData;
  jdContent?: string;
}) {
  const fitWarnings: string[] = [];
  const supplementSuggestions: string[] = [];
  const rewriteRatio = countChangedDescriptionRatio(args.sourceResume, args.targetResume);
  const meaningfulEntries = countMeaningfulExperienceEntries(args.targetResume);
  const jdSignals = getJdSignals(args.jdContent ?? "");
  const targetCoverage = getTargetSignalCoverage(args.targetResume);

  if (rewriteRatio < 0.35) {
    fitWarnings.push("贴岗改写仍偏弱");
  }

  if (meaningfulEntries < 2) {
    fitWarnings.push("高相关经历展开不足");
    supplementSuggestions.push("若你还有更相关经历，可补 1 段再生成");
  }

  if (jdSignals.metrics && !targetCoverage.hasMetrics) {
    fitWarnings.push("量化结果偏少");
    supplementSuggestions.push("补量化结果（如转化率/用户数）");
  }

  if (jdSignals.project && !targetCoverage.hasProjectScope) {
    fitWarnings.push("项目负责范围不够清楚");
    supplementSuggestions.push("补项目中的负责范围");
  }

  if (jdSignals.business && !targetCoverage.hasBusinessContext) {
    fitWarnings.push("业务场景证据偏弱");
    supplementSuggestions.push("补业务场景 / 用户对象");
  }

  if (jdSignals.product && !targetCoverage.hasProductEvidence) {
    fitWarnings.push("岗位相关动作偏弱");
    supplementSuggestions.push("补需求分析 / 用户研究 / 原型等动作");
  }

  return {
    fitWarnings: Array.from(new Set(fitWarnings)),
    supplementSuggestions: Array.from(new Set(supplementSuggestions)).slice(0, 3),
  };
}

export function parseResumeDataForAnalysis(content: string | undefined) {
  return parseResumeDataContent(content);
}

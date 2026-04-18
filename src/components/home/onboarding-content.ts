export type OnboardingScreenshot = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  eyebrow: string;
};

export const ONBOARDING_SCREENSHOTS: OnboardingScreenshot[] = [
  {
    id: "tailored-resume",
    title: "定制简历",
    description: "按岗位重点重排你的经历。",
    imageSrc: "/onboarding/tailored-resume.png",
    eyebrow: "Resume",
  },
  {
    id: "prep-pack",
    title: "面试准备",
    description: "拿到题单、重点和行动清单。",
    imageSrc: "/onboarding/prep-pack.png",
    eyebrow: "Prep",
  },
  {
    id: "review-report",
    title: "面试复盘",
    description: "沉淀问题和下一轮改进点。",
    imageSrc: "/onboarding/review-report.png",
    eyebrow: "Review",
  },
];

export const ONBOARDING_COPY = {
  step1Eyebrow: `FOR 应届毕业生 · ${new Date().getFullYear()} 校招`,
  step1Title: "一次求职，三件事 AI 帮你做完",
  step1Subtitle: "投递前定制，面试前准备，面后复盘。",
  step2Eyebrow: "STEP 2 OF 4",
  step2Title: "先把材料给我",
  step2Subtitle: "上传简历，再补岗位 JD。",
  step3Eyebrow: "STEP 3 OF 4",
  step3Title: "围绕岗位，把准备做全",
  step3Subtitle: "准备包、匹配分析、BOSS 文书都能生成。",
  step4Eyebrow: "STEP 4 OF 4",
  step4Title: "面后还能继续复盘",
  step4Subtitle: "复盘报告会沉淀问题和下一轮改进点。",
};

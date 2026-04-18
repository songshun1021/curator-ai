export const DEFAULT_RESUME_PROMPT = `任务：让简历更容易拿到面试机会。
输入：主简历 JSON、目标 JD。
总规则：
1. 只允许重组、强化、取舍已有真实经历，不得编造内容。
2. 优先保留与 JD 最相关、最能证明能力的经历证据。
3. 定制简历时必须先提炼 JD 核心能力，再回到已有事实里找证据，最后按相关性重排并重写表述。
4. 润色时使用 STAR 思路，尽量补足动作、结果与量化表达，但不得新增原简历中不存在的职责、结果、项目、技能或业务场景。
5. 若某段经历与 JD 关联较弱，可以缩短或后置，但不能编造更贴岗的新版本。
6. 教育经历只做轻微排序和目标岗位对齐；实习、项目、校园经历优先做中高强度贴岗改写。
7. 生成定制简历时只能输出合法 JSON，不写解释。
8. 定制简历 JSON 的顶层字段名必须与 ResumeData 完全一致：id、profile、education、internships、campusExperience、projects、skills；禁止替换成同义 key。
9. profile 必须是对象；education、internships、campusExperience、projects 必须是数组；skills 必须是对象。
10. 如果需要生成文本说明，默认使用简洁 Markdown，但聊天仍保持纯文本展示。`;

export const DEFAULT_RESUME_SKILL = `定制简历要求：
1. 严格复用主简历既有字段结构与真实经历。
2. 允许删减不相关信息，但不要新增无来源内容。
3. 经历描述优先突出岗位关键词、业务场景、动作与结果；不是只做同义替换，要体现明显贴岗改写。
4. 不得改动时间、公司名、岗位名、项目名、学校名、学历、GPA。
5. 低相关经历保留但降权，高相关经历前置并展开。
6. JSON 输出前自检字段完整性，确保 profile / education / internships / campusExperience / projects / skills 顶层 key 与嵌套结构可解析。
7. 禁止把 internships、campusExperience、projects、skills 换成同义字段名。
8. 若无法确定内容，宁可留空也不要臆造。`;

export const roleEntrances = [
  {
    to: "/student",
    title: "学生学习空间",
    description: "课程问答、章节练习、考试训练和错题复盘",
    accent: "green",
  },
  {
    to: "/teacher",
    title: "教师教学运营",
    description: "资料解析、练习生成、班级学情和智能批改",
    accent: "blue",
  },
  {
    to: "/admin",
    title: "机构管理中枢",
    description: "租户、模型供应商、Bisheng 工作流和审计日志",
    accent: "amber",
  },
];

export const platformHighlights = [
  { label: "课程智能体", value: "18", trend: "+4 本周" },
  { label: "运行中工作流", value: "42", trend: "Bisheng 队列" },
  { label: "今日学习会话", value: "1,286", trend: "+18.7%" },
];

export const studentStats = [
  { label: "已加入课程", value: "6", tone: "green" },
  { label: "待完成任务", value: "9", tone: "amber" },
  { label: "本周 AI 问答", value: "34", tone: "blue" },
  { label: "错题待复习", value: "17", tone: "red" },
];

export const studentCourses = [
  {
    name: "高一数学函数专题",
    teacher: "林老师",
    progress: 72,
    nextAction: "完成指数函数章节练习",
    mastery: "稳定提升",
  },
  {
    name: "英语阅读理解强化",
    teacher: "周老师",
    progress: 58,
    nextAction: "进入 AI 精读问答",
    mastery: "词义推断偏弱",
  },
  {
    name: "物理力学错题复盘",
    teacher: "陈老师",
    progress: 41,
    nextAction: "复习受力分析错题",
    mastery: "需要巩固",
  },
];

export const studentTasks = [
  { title: "函数单调性 15 题", type: "章节练习", due: "今天 20:00", status: "进行中" },
  { title: "英语阅读 Week 7", type: "AI 问答", due: "明天 09:30", status: "未开始" },
  { title: "力学错题 6 道", type: "错题本", due: "周五前", status: "待复习" },
];

export const masteryPoints = [
  { label: "函数图像", value: 84 },
  { label: "阅读主旨", value: 76 },
  { label: "受力分析", value: 52 },
  { label: "实验推理", value: 68 },
  { label: "几何证明", value: 61 },
];

export const teacherStats = [
  { label: "活跃课程", value: "12", hint: "覆盖 8 个班级", tone: "green" },
  { label: "资料解析", value: "28", hint: "5 个等待确认", tone: "blue" },
  { label: "待批改主观题", value: "143", hint: "Bisheng 辅助中", tone: "amber" },
  { label: "学情预警", value: "16", hint: "较昨日 -3", tone: "red" },
];

export const courseOperations = [
  {
    course: "高一数学函数专题",
    className: "高一 3 班",
    students: 46,
    completion: 82,
    alert: "7 人指数函数掌握度低",
  },
  {
    course: "英语阅读理解强化",
    className: "高二 1 班",
    students: 39,
    completion: 74,
    alert: "主旨题错因集中",
  },
  {
    course: "物理力学综合训练",
    className: "高一 6 班",
    students: 42,
    completion: 67,
    alert: "受力分析需补课",
  },
];

export const workflowRuns = [
  { name: "资料解析入库", target: "函数专题讲义.pdf", status: "运行中", progress: 68 },
  { name: "练习自动组卷", target: "英语阅读 Week 7", status: "待审核", progress: 100 },
  { name: "主观题批改讲解", target: "物理综合测验", status: "排队中", progress: 24 },
];

export const resourceJobs = [
  { name: "函数专题讲义.pdf", type: "PDF", state: "切片与向量化", time: "12 分钟前" },
  { name: "英语阅读题库.csv", type: "CSV", state: "结构校验完成", time: "35 分钟前" },
  { name: "力学错题汇总.docx", type: "DOCX", state: "等待知识点映射", time: "1 小时前" },
];

export const insightCards = [
  { label: "薄弱知识点", value: "受力分析", note: "高一 6 班错题率 48%" },
  { label: "推荐动作", value: "生成 20 题分层练习", note: "覆盖基础、提升、压轴" },
  { label: "报告状态", value: "3 份可发布", note: "含班级与个人报告" },
];

export const adminStats = [
  { label: "机构租户", value: "4", hint: "1 个试点校区" },
  { label: "平台用户", value: "2,438", hint: "教师 126 / 学生 2,312" },
  { label: "模型供应商", value: "3", hint: "2 个启用" },
  { label: "工作流绑定", value: "11", hint: "Bisheng 运行稳定" },
];

export const providerStatus = [
  { name: "Bisheng Workflow", status: "在线", latency: "218 ms", usage: 78 },
  { name: "国产大模型网关", status: "在线", latency: "342 ms", usage: 64 },
  { name: "对象存储 MinIO", status: "本地", latency: "32 ms", usage: 41 },
];

export const systemModules = [
  { name: "租户与学校", owner: "平台管理员", state: "已接入骨架" },
  { name: "用户与角色", owner: "机构管理员", state: "待接入鉴权" },
  { name: "模型供应商", owner: "技术管理员", state: "配置设计完成" },
  { name: "Bisheng 绑定", owner: "工作流管理员", state: "适配器已占位" },
];

export const auditTrail = [
  { actor: "系统", action: "完成健康检查", time: "刚刚" },
  { actor: "林老师", action: "创建函数专题练习", time: "14 分钟前" },
  { actor: "管理员", action: "更新 Bisheng 工作流映射", time: "48 分钟前" },
  { actor: "周老师", action: "导入英语阅读题库", time: "1 小时前" },
];

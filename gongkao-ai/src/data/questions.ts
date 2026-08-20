import type { Question } from '@/types';

// 示例题库（MVP 启动数据，后续可导入更多）
export const questions: Question[] = [
  // ===== 言语理解 =====
  {
    id: 'q-001',
    module: '言语理解',
    subject: '主旨概括',
    difficulty: 2,
    content: '随着人工智能技术的快速发展，越来越多的行业开始应用 AI 技术。从医疗诊断到自动驾驶，从教育辅导到金融风控，AI 正在改变人们的工作和生活方式。与此同时，AI 带来的伦理问题和就业问题也引发了社会广泛关注。这段文字主要说明：',
    options: {
      A: 'AI 技术正在各行各业得到应用',
      B: 'AI 技术发展带来了新的挑战',
      C: 'AI 技术正在深刻改变社会',
      D: 'AI 技术引发了社会广泛关注',
    },
    correctAnswer: 'C',
    explanation: '文段首先指出 AI 技术在各行各业的应用，然后提到 AI 带来的问题。主旨应概括全文，C 项"AI 技术正在深刻改变社会"最为全面。A 项只涉及应用层面，B、D 项只涉及问题层面，均不全面。',
    knowledgePoint: '主旨概括题-全面概括',
    createdAt: '2026-01-01',
  },
  {
    id: 'q-002',
    module: '言语理解',
    subject: '逻辑填空',
    difficulty: 3,
    content: '在数字经济时代，数据已成为重要的生产要素，其价值日益_____。然而，数据安全和隐私保护问题也随之_____。依次填入划横线部分最恰当的一项是：',
    options: {
      A: '突出 暴露',
      B: '凸显 凸显',
      C: '凸显 凸现',
      D: '凸显 凸显',
    },
    correctAnswer: 'B',
    explanation: '"凸显"指清楚地显现出，强调事物的明显突出。"凸显"与"价值"搭配恰当。第二空"凸显"与"问题"搭配也合适。注意区分"凸显"和"突出"的用法。',
    knowledgePoint: '逻辑填空-实词辨析',
    createdAt: '2026-01-01',
  },
  {
    id: 'q-003',
    module: '言语理解',
    subject: '语句排序',
    difficulty: 3,
    content: '将以下句子重新排序：①因此，我们需要建立完善的数据治理体系。②随着数字经济的快速发展，数据已成为核心生产要素。③但是，数据安全和隐私保护问题日益突出。④这一体系应涵盖数据采集、存储、使用和共享等各个环节。正确的顺序是：',
    options: {
      A: '②③①④',
      B: '②①③④',
      C: '③②①④',
      D: '①②③④',
    },
    correctAnswer: 'A',
    explanation: '②句是背景引入，应放在最前。③句用"但是"转折，指出问题。①句用"因此"引出对策。④句是对①句对策的具体展开。逻辑顺序为：背景→问题→对策→展开。',
    knowledgePoint: '语句排序-逻辑关系',
    createdAt: '2026-01-01',
  },

  // ===== 数量关系 =====
  {
    id: 'q-004',
    module: '数量关系',
    subject: '工程问题',
    difficulty: 2,
    content: '一项工程，甲单独完成需要 12 天，乙单独完成需要 15 天。两人合作 4 天后，甲因事离开，剩余工程由乙单独完成，还需要多少天？',
    options: {
      A: '4 天',
      B: '5 天',
      C: '6 天',
      D: '7 天',
    },
    correctAnswer: 'C',
    explanation: '设工程总量为 60（12 和 15 的最小公倍数）。甲效率=60÷12=5/天，乙效率=60÷15=4/天。合作 4 天完成：(5+4)×4=36。剩余=60-36=24。乙单独完成需要 24÷4=6 天。',
    knowledgePoint: '工程问题-赋值法',
    createdAt: '2026-01-01',
  },
  {
    id: 'q-005',
    module: '数量关系',
    subject: '行程问题',
    difficulty: 3,
    content: '甲、乙两人从 A 地同时出发前往 B 地，甲的速度是乙的 1.5 倍。甲到达 B 地后立即返回，在距离 B 地 6 公里处与乙相遇。A、B 两地相距多少公里？',
    options: {
      A: '18 公里',
      B: '20 公里',
      C: '24 公里',
      D: '30 公里',
    },
    correctAnswer: 'D',
    explanation: '设乙速为 v，甲速为 1.5v。相遇时甲走了 AB+6，乙走了 AB-6。时间相同：(AB+6)/1.5v = (AB-6)/v。解得 AB=30 公里。',
    knowledgePoint: '行程问题-相遇追及',
    createdAt: '2026-01-01',
  },

  // ===== 判断推理 =====
  {
    id: 'q-006',
    module: '判断推理',
    subject: '逻辑判断',
    difficulty: 3,
    content: '所有参加培训的员工都通过了考核，小李没有参加培训。由此可以推出：',
    options: {
      A: '小李没有通过考核',
      B: '小李通过了考核',
      C: '小李可能没有通过考核',
      D: '小李可能通过了考核',
    },
    correctAnswer: 'D',
    explanation: '"参加培训→通过考核"是否命题推理。小李没有参加培训，是否定前件，不能必然否定后件（通过考核）。但也不能必然肯定后件。因此只能用"可能"表述，D 项正确。',
    knowledgePoint: '逻辑判断-翻译推理',
    createdAt: '2026-01-01',
  },
  {
    id: 'q-007',
    module: '判断推理',
    subject: '类比推理',
    difficulty: 2,
    content: '医生：医院 对应于（  ）',
    options: {
      A: '教师：学校',
      B: '学生：课本',
      C: '工人：工厂',
      D: '演员：舞台',
    },
    correctAnswer: 'A',
    explanation: '医生在医院工作，是职业与工作场所的关系。教师在学校工作，也是职业与工作场所的关系，对应最恰当。',
    knowledgePoint: '类比推理-职业与场所',
    createdAt: '2026-01-01',
  },

  // ===== 资料分析 =====
  {
    id: 'q-008',
    module: '资料分析',
    subject: '增长率计算',
    difficulty: 2,
    content: '2024 年我国数字经济规模为 53.9 万亿元，2023 年为 50.2 万亿元。2024 年比 2023 年增长了约百分之几？',
    options: {
      A: '5.4%',
      B: '7.4%',
      C: '7.9%',
      D: '8.4%',
    },
    correctAnswer: 'B',
    explanation: '增长率=(现期量-基期量)/基期量×100%=(53.9-50.2)/50.2×100%=3.7/50.2×100%≈7.37%≈7.4%。',
    knowledgePoint: '资料分析-增长率',
    createdAt: '2026-01-01',
  },

  // ===== 常识判断 =====
  {
    id: 'q-009',
    module: '常识判断',
    subject: '法律常识',
    difficulty: 2,
    content: '下列关于我国宪法的说法，正确的是：',
    options: {
      A: '宪法是国家根本法，具有最高法律效力',
      B: '宪法的修改需要全国人大以全体代表的过半数通过',
      C: '宪法的修改需要全国人大常委会提议',
      D: '宪法由全国人大常委会解释',
    },
    correctAnswer: 'A',
    explanation: '宪法是国家根本法，具有最高法律效力，A 项正确。宪法的修改需全国人大以全体代表的 2/3 以上多数通过，B 项错误。全国人大常委会或 1/5 以上全国人大代表可提议修改宪法，C 项不全面。宪法的解释权属于全国人大常委会，D 项正确但不是最核心的特征。',
    knowledgePoint: '常识判断-宪法',
    createdAt: '6-01-01',
  },
  {
    id: 'q-010',
    module: '常识判断',
    subject: '政治常识',
    difficulty: 2,
    content: '新发展理念不包括以下哪一项？',
    options: {
      A: '创新',
      B: '协调',
      C: '高速',
      D: '共享',
    },
    correctAnswer: 'C',
    explanation: '新发展理念包括：创新、协调、绿色、开放、共享，共五大理念。"高速"不属于新发展理念，我国经济已由高速增长阶段转向高质量发展阶段。',
    knowledgePoint: '常识判断-新发展理念',
    createdAt: '2026-01-01',
  },
];

// 获取题目（按模块筛选）
export function getQuestionsByModule(module: string): Question[] {
  return questions.filter((q) => q.module === module);
}

// 获取题目详情
export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

// 获取所有模块
export const modules = ['言语理解', '数量关系', '判断推理', '资料分析', '常识判断'];

// 题目类型
export interface Question {
  id: string;
  module: QuestionModule;
  subject: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  content: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
  knowledgePoint?: string;
  createdAt: string;
}

// 行测模块
export type QuestionModule =
  | '言语理解'
  | '数量关系'
  | '判断推理'
  | '资料分析'
  | '常识判断';

// 用户答题记录
export interface UserAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  createdAt: string;
}

// 错题记录
export interface WrongQuestion {
  questionId: string;
  wrongCount: number;
  lastWrongAt: string;
  mastered: boolean;
}

// 申论材料
export interface ShenlunMaterial {
  id: string;
  title: string;
  materialType: ShenlunType;
  content: string;
  question: string;
  wordLimit: number;
  referenceAnswer: string;
  scoringCriteria: string[];
  createdAt: string;
}

export type ShenlunType =
  | '归纳概括'
  | '提出对策'
  | '综合分析'
  | '贯彻执行'
  | '大作文';

// 用户申论答案
export interface UserShenlunAnswer {
  materialId: string;
  content: string;
  createdAt: string;
}

// 学习统计
export interface StudyStats {
  date: string;
  questionsCount: number;
  correctCount: number;
  studyTime: number;
}

// 能力评估
export interface AbilityAssessment {
  module: QuestionModule;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
}

// 考试倒计时
export interface ExamCountdown {
  name: string;
  date: string;
  daysLeft: number;
}

// 知识点
export interface KnowledgePoint {
  id: string;
  module: QuestionModule | '申论';
  subject: string;
  title: string;
  content: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  orderIndex: number;
  parentId?: string;
  relatedQuestions?: string[];
}

// 热点素材
export interface HotTopic {
  id: string;
  title: string;
  category: '政治' | '经济' | '社会' | '文化' | '生态';
  summary: string;
  keywords: string[];
  content: string;
  createdAt: string;
}

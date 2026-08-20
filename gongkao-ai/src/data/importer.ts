import type { Question } from '@/types';
import { storage, generateId } from '@/lib/utils';

/**
 * 题库导入工具
 * 支持从 JSON 文件导入题目
 *
 * JSON 格式示例：
 * [
 *   {
 *     "module": "言语理解",
 *     "subject": "主旨概括",
 *     "difficulty": 2,
 *     "content": "题目内容...",
 *     "options": { "A": "选项A", "B": "选项B", "C": "选项C", "D": "选项D" },
 *     "correctAnswer": "C",
 *     "explanation": "解析...",
 *     "knowledgePoint": "知识点"
 *   }
 * ]
 */

const STORAGE_KEY = 'custom_questions';

// 获取所有自定义题目
export function getCustomQuestions(): Question[] {
  return storage.get<Question[]>(STORAGE_KEY, []);
}

// 导入题目（JSON 格式）
export function importQuestionsFromJSON(jsonContent: string): {
  success: number;
  failed: number;
  errors: string[];
} {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  let data: any[];
  try {
    data = JSON.parse(jsonContent);
  } catch (e) {
    return { success: 0, failed: 0, errors: ['JSON 格式错误，请检查文件内容'] };
  }

  if (!Array.isArray(data)) {
    return { success: 0, failed: 0, errors: ['JSON 内容必须是数组格式'] };
  }

  const validModules = ['言语理解', '数量关系', '判断推理', '资料分析', '常识判断'];
  const newQuestions: Question[] = [];

  data.forEach((item, index) => {
    // 校验必填字段
    if (!item.content || !item.options || !item.correctAnswer) {
      failed++;
      errors.push(`第 ${index + 1} 题：缺少必填字段（content/options/correctAnswer）`);
      return;
    }

    if (!validModules.includes(item.module)) {
      failed++;
      errors.push(`第 ${index + 1} 题：模块 "${item.module}" 无效，应为 ${validModules.join('/')}`);
      return;
    }

    const question: Question = {
      id: item.id || generateId(),
      module: item.module,
      subject: item.subject || '未分类',
      difficulty: item.difficulty || 3,
      content: item.content,
      options: item.options,
      correctAnswer: item.correctAnswer,
      explanation: item.explanation || '暂无解析',
      knowledgePoint: item.knowledgePoint,
      createdAt: new Date().toISOString(),
    };

    newQuestions.push(question);
    success++;
  });

  // 合并到已有题库
  const existing = getCustomQuestions();
  const merged = [...existing, ...newQuestions];
  storage.set(STORAGE_KEY, merged);

  return { success, failed, errors };
}

// 导入题目（CSV 格式）
export function importQuestionsFromCSV(csvContent: string): {
  success: number;
  failed: number;
  errors: string[];
} {
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  const lines = csvContent.split('\n').filter((line) => line.trim());
  if (lines.length < 2) {
    return { success: 0, failed: 0, errors: ['CSV 文件至少需要表头和一行数据'] };
  }

  const headers = parseCSVLine(lines[0]);

  const newQuestions: Question[] = [];
  const validModules = ['言语理解', '数量关系', '判断推理', '资料分析', '常识判断'];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    if (!row.content || !row.correctAnswer) {
      failed++;
      errors.push(`第 ${i} 行：缺少必填字段`);
      continue;
    }

    // 解析选项（假设格式为 "A:选项A;B:选项B"）
    const options: Record<string, string> = {};
    if (row.options) {
      row.options.split(';').forEach((pair) => {
        const [key, val] = pair.split(':');
        if (key && val) options[key.trim()] = val.trim();
      });
    }

    if (!validModules.includes(row.module)) {
      failed++;
      errors.push(`第 ${i} 行：模块 "${row.module}" 无效`);
      continue;
    }

    newQuestions.push({
      id: generateId(),
      module: row.module as Question['module'],
      subject: row.subject || '未分类',
      difficulty: (parseInt(row.difficulty) || 3) as Question['difficulty'],
      content: row.content,
      options,
      correctAnswer: row.correctAnswer,
      explanation: row.explanation || '暂无解析',
      knowledgePoint: row.knowledgePoint,
      createdAt: new Date().toISOString(),
    });
    success++;
  }

  const existing = getCustomQuestions();
  storage.set(STORAGE_KEY, [...existing, ...newQuestions]);

  return { success, failed, errors };
}

// 解析 CSV 行（处理引号包裹的字段）
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// 清空自定义题库
export function clearCustomQuestions(): void {
  storage.remove(STORAGE_KEY);
}

// 获取所有题目（内置 + 自定义）
export function getAllQuestions(builtin: Question[]): Question[] {
  return [...builtin, ...getCustomQuestions()];
}

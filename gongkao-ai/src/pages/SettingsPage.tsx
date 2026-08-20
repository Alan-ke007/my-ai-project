import { useState } from 'react';
import { Calendar, Upload, Download, Trash2, Info, CheckCircle2, XCircle } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { importQuestionsFromJSON, importQuestionsFromCSV, clearCustomQuestions } from '@/data/importer';

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export function SettingsPage() {
  const { targetExam, setTargetExam } = useUserStore();
  const [examDate, setExamDate] = useState('');
  const [examName, setExamName] = useState(targetExam);
  const [importText, setImportText] = useState('');
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [importFormat, setImportFormat] = useState<'json' | 'csv'>('json');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSaveExam = () => {
    setTargetExam(examName || '目标考试', examDate || '2026-11-28');
    setSavedMessage('✅ 考试设置已保存');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setImportResult({ success: 0, failed: 1, errors: ['请先粘贴题目数据'] });
      return;
    }
    const result =
      importFormat === 'json'
        ? importQuestionsFromJSON(importText)
        : importQuestionsFromCSV(importText);
    setImportResult(result);
    if (result.success > 0) setImportText('');
  };

  const handleClearCustom = () => {
    if (confirm('确定要清空所有自定义导入的题目吗？此操作不可恢复！')) {
      clearCustomQuestions();
      alert('自定义题目已清空');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold">设置</h1>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            考试倒计时
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                考试名称
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="例如：2026 国考"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                考试日期
              </label>
              <input
                type="date"
                value={examDate || '2026-11-28'}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSaveExam}>保存设置</Button>
              {savedMessage && (
                <span className="text-sm text-green-600">{savedMessage}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Upload size={20} />
            题库导入
          </h3>

          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              variant={importFormat === 'json' ? 'default' : 'outline'}
              onClick={() => setImportFormat('json')}
            >
              JSON 格式
            </Button>
            <Button
              size="sm"
              variant={importFormat === 'csv' ? 'default' : 'outline'}
              onClick={() => setImportFormat('csv')}
            >
              CSV 格式
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-700 mb-2">
              {importFormat === 'json'
                ? 'JSON 格式：每个字段对应一道题，必填 module/content/options/correctAnswer'
                : 'CSV 格式：第一行为表头，选项用分号分隔（A:选项A;B:选项B）'}
            </p>
            <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
              {importFormat === 'json'
                ? `[
  {
    "module": "言语理解",
    "subject": "主旨概括",
    "difficulty": 2,
    "content": "题目内容...",
    "options": {"A": "选项A", "B": "选项B"},
    "correctAnswer": "A",
    "explanation": "解析..."
  }
]`
                : `module,subject,difficulty,content,options,correctAnswer,explanation
言语理解,主旨概括,2,题目内容...,A:选项A;B:选项B,A,解析...`}
            </pre>
          </div>

          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="在此粘贴要导入的题目数据..."
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          />

          <div className="flex gap-2">
            <Button onClick={handleImport}>导入题目</Button>
            <Button variant="outline" onClick={handleClearCustom}>
              清空自定义题目
            </Button>
          </div>

          {importResult && (
            <div className="mt-4">
              {importResult.failed > 0 ? (
                <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
                  <XCircle size={18} />
                  {importResult.errors.join('；')}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                  <CheckCircle2 size={18} />
                  导入成功
                </div>
              )}
              <p className="text-sm text-gray-600">
                成功 {importResult.success} 道，失败 {importResult.failed} 道
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">数据管理</h3>
          <div className="space-y-2">
            <Button variant="outline" onClick={exportData}>
              <Download size={18} className="mr-2" />导出学习记录
            </Button>
            <Button variant="destructive" onClick={clearAllData}>
              <Trash2 size={18} className="mr-2" />清空所有数据
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <Info size={16} className="mx-auto mb-2" />公考 AI 助手 v1.0.0
      </div>
    </div>
  );
}

function exportData() {
  const data = {
    user_answers: localStorage.getItem('user_answers'),
    wrong_questions: localStorage.getItem('wrong_questions'),
    study_stats: localStorage.getItem('study_stats'),
    exam_countdown: localStorage.getItem('exam_countdown'),
    custom_questions: localStorage.getItem('custom_questions'),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gongkao-data-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}

function clearAllData() {
  if (confirm('确定要清空所有学习数据吗？此操作不可恢复！')) {
    localStorage.clear();
    window.location.reload();
  }
}
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';
import { useQuestionStore } from '@/stores/questionStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { questions } from '@/data/questions';

const moduleIcons: Record<string, string> = {
  言语理解: '📖',
  数量关系: '🔢',
  判断推理: '🧠',
  资料分析: '📊',
  常识判断: '🌐',
};

export function WrongQuestionsPage() {
  const { wrongQuestions, markMastered, answers } = useQuestionStore();

  // Get wrong questions with details
  const wrongList = useMemo(() => {
    return Object.values(wrongQuestions)
      .filter((w) => !w.mastered)
      .map((w) => {
        const question = questions.find((q) => q.id === w.questionId);
        if (!question) return null;
        return { ...w, question };
      })
      .filter(Boolean);
  }, []);

  const totalCount = Object.values(wrongQuestions).filter((w) => !w.mastered).length;

  if (totalCount === 0) {
    return (
      <div className="text-center py-20">
        <CheckCircle2 className="mx-auto text-green-500 mb-4" size={64} />
        <h2 className="text-xl font-semibold mb-2">暂无错题</h2>
        <p className="text-gray-500 mb-6">太棒了！你还没有错题记录，继续保持！</p>
        <Link to="/questions">
          <Button>开始刷题</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          返回
        </button>
        <span className="text-sm text-gray-500">共 {totalCount} 道错题</span>
      </div>

      {/* 错题列表 */}
      <div className="space-y-3">
        {(wrongList as any[]).map((item) => {
          const userAnswer = answers[item.questionId];
          return (
            <Card key={item.questionId}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-xl">
                    {moduleIcons[item.question.module] || '❓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        {item.question.module}
                      </span>
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                        {item.question.subject}
                      </span>
                      <span className="text-yellow-500 text-xs">{'⭐'.repeat(item.question.difficulty)}</span>
                      <span className="text-xs text-gray-400">错{item.wrongCount}次</span>
                    </div>
                    <p className="text-sm text-gray-900 line-clamp-2">{item.question.content}</p>
                    {userAnswer && (
                      <p className="text-xs text-red-500 mt-1">
                        你的答案：{userAnswer.userAnswer}
                        {' '}| 正确答案：{item.question.correctAnswer}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markMastered(item.questionId)}
                    >
                      <CheckCircle2 size={16} className="mr-1" />
                      已掌握
                    </Button>
                    <Link to={`/questions/${item.question.module}`}>
                      <Button variant="ghost" size="sm">重练</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 清空错题 */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (confirm('确定要清空所有错题吗？')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          <Trash2 size={16} className="mr-1" />
          清空所有错题
        </Button>
      </div>
    </div>
  );
}
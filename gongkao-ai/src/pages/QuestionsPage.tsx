import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { questions, modules } from '@/data/questions';
import { useQuestionStore } from '@/stores/questionStore';
import { Card, CardContent } from '@/components/ui/Card';

const moduleIcons: Record<string, string> = {
  言语理解: '📖',
  数量关系: '🔢',
  判断推理: '🧠',
  资料分析: '📊',
  常识判断: '🌐',
};

export function QuestionsPage() {
  const { answers } = useQuestionStore();

  const moduleStats = modules.map((m) => {
    const moduleQuestions = questions.filter((q) => q.module === m);
    const answered = moduleQuestions.filter((q) => answers[q.id]);
    const correct = answered.filter((q) => answers[q.id].isCorrect);
    const accuracy = answered.length > 0 ? Math.round((correct.length / answered.length) * 100) : 0;
    return { module: m, total: moduleQuestions.length, answered: answered.length, accuracy };
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div>
        <h1 className="text-2xl font-bold">行测刷题</h1>
        <p className="text-gray-500 mt-1">选择模块开始练习</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {moduleStats.map((stat) => (
          <Link key={stat.module} to={`/questions/${stat.module}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{moduleIcons[stat.module]}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{stat.module}</h3>
                      <p className="text-sm text-gray-500">
                        共 {stat.total} 题 · 已做 {stat.answered} 题
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-400" />
                </div>
                {stat.answered > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>正确率</span>
                      <span>{stat.accuracy}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${stat.accuracy}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Clock, Target, TrendingUp, BookOpen, ChevronRight } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';
import { useQuestionStore } from '@/stores/questionStore';
import { questions, modules } from '@/data/questions';
import { Card, CardContent } from '@/components/ui/Card';

export function Dashboard() {
  const { targetExam, daysLeft } = useUserStore();
  const { answers, wrongQuestions } = useQuestionStore();

  const todayStats = useQuestionStore((s) => s.getTodayStats());

  // 计算各模块正确率
  const moduleStats = modules.map((m) => {
    const moduleQuestions = questions.filter((q) => q.module === m);
    const answered = moduleQuestions.filter((q) => answers[q.id]);
    const correct = answered.filter((q) => answers[q.id].isCorrect);
    return {
      module: m,
      total: moduleQuestions.length,
      answered: answered.length,
      correct: correct.length,
      accuracy: answered.length > 0 ? Math.round((correct.length / answered.length) * 100) : 0,
    };
  });

  const wrongCount = Object.values(wrongQuestions).filter((w) => !w.mastered).length;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* 倒计时卡片 */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">距离 {targetExam} 还有</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">{daysLeft}</span>
                <span className="text-xl">天</span>
              </div>
              <p className="text-blue-100 text-sm mt-2">坚持每日学习，量变引起质变</p>
            </div>
            <Clock size={80} className="text-blue-300" />
          </div>
        </CardContent>
      </Card>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="mx-auto text-orange-500 mb-2" size={24} />
            <p className="text-2xl font-bold">{todayStats.questionsCount}</p>
            <p className="text-xs text-gray-500 mt-1">今日做题</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="mx-auto text-blue-500 mb-2" size={24} />
            <p className="text-2xl font-bold">{Object.keys(answers).length}</p>
            <p className="text-xs text-gray-500 mt-1">累计做题</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto text-red-500 mb-2" size={24} />
            <p className="text-2xl font-bold">{wrongCount}</p>
            <p className="text-xs text-gray-500 mt-1">错题数</p>
          </CardContent>
        </Card>
      </div>

      {/* 能力评估 */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            能力评估
          </h2>
          <div className="space-y-3">
            {moduleStats.map((stat) => (
              <div key={stat.module} className="flex items-center gap-4">
                <span className="w-20 text-sm text-gray-600">{stat.module}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${stat.accuracy}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-right text-gray-500">
                  {stat.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快捷入口 */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/questions">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">行测刷题</h3>
                <p className="text-sm text-gray-500 mt-1">五大模块智能练习</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/shenlun">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">申论练习</h3>
                <p className="text-sm text-gray-500 mt-1">真题模拟练习</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

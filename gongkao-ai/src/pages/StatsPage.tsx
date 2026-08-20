import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useQuestionStore } from '@/stores/questionStore';
import { Card, CardContent } from '@/components/ui/Card';
import { TrendingUp, Target, Clock } from 'lucide-react';

export function StatsPage() {
  const { answers, wrongQuestions, studyStats } = useQuestionStore();

  // 准备雷达图数据
  const radarData = [
    { module: '言语理解', fullMark: 100 },
    { module: '数量关系', fullMark: 100 },
    { module: '判断推理', fullMark: 100 },
    { module: '资料分析', fullMark: 100 },
    { module: '常识判断', fullMark: 100 },
  ];

  // 准备柱状图数据
  const barData = studyStats.slice(-7).map((stat) => ({
    date: stat.date.slice(5),
    做题数: stat.questionsCount,
    正确数: stat.correctCount,
  }));

  const totalQuestions = Object.keys(answers).length;
  const totalCorrect = Object.values(answers).filter((a) => a.isCorrect).length;
  const totalWrong = Object.values(wrongQuestions).filter((w) => !w.mastered).length;
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold">学习统计</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto text-primary mb-2" size={24} />
            <p className="text-2xl font-bold">{accuracy}%</p>
            <p className="text-xs text-gray-500 mt-1">总正确率</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="mx-auto text-orange-500 mb-2" size={24} />
            <p className="text-2xl font-bold">{totalQuestions}</p>
            <p className="text-xs text-gray-500 mt-1">累计做题</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="mx-auto text-red-500 mb-2" size={24} />
            <p className="text-2xl font-bold">{totalWrong}</p>
            <p className="text-xs text-gray-500 mt-1">错题数</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">能力评估</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="module" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="能力值" dataKey="fullMark" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">最近 7 天学习情况</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData.length > 0 ? barData : [{ date: '暂无数据', 做题数: 0, 正确数: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="做题数" fill="#2563eb" />
                <Bar dataKey="正确数" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

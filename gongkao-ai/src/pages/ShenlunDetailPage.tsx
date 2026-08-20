import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// 申论材料数据
const materials = [
  {
    id: 'm-001',
    title: '数字经济与数据安全',
    type: '归纳概括' as const,
    content: '材料一：\n近年来，我国数字经济蓬勃发展，数据已成为重要的生产要素。2023 年我国数字经济规模超过 50 万亿元，占 GDP 比重超过 40%。\n\n材料二：\n在数字经济快速发展的同时，数据安全、个人信息保护、平台垄断等问题也日益突出。2021 年《数据安全法》《个人信息保护法》相继施行，标志着我国数据治理进入新阶段。',
    question: '请根据以上材料，概括我国数字经济发展中存在的主要问题。（15 分，200 字以内）',
    wordLimit: 200,
    referenceAnswer: '我国数字经济发展中存在的主要问题包括：一是数据安全风险突出，数据泄露、滥用等问题时有发生；二是个人信息保护不足，用户隐私面临威胁；三是平台垄断问题显现，影响市场公平竞争；四是数据治理体系有待完善，相关法律法规需要进一步落实。',
    scoringCriteria: ['要点一：数据安全问题（4 分）', '要点二：个人信息保护不足（4 分）', '要点三：平台垄断问题（4 分）', '要点四：治理体系有待完善（3 分）'],
  },
  {
    id: 'm-002',
    title: '乡村振兴与绿色发展',
    type: '提出对策' as const,
    content: '材料一：\n乡村振兴战略实施以来，全国农村面貌发生了显著变化。但是，部分地区的产业发展仍然滞后，人才流失问题较为严重。\n\n材料二：\n一些地方在推进农业现代化过程中，过度使用化肥农药，造成土壤退化和水体污染。绿色发展理念尚未完全落实。',
    question: '针对上述问题，提出改进建议。（20 分，300 字以内）',
    wordLimit: 300,
    referenceAnswer: '针对乡村产业发展滞后和绿色发展不足的问题，应多措并举：一是发展特色产业，依托本地资源禀赋培育特色种植、乡村旅游等产业，增强造血功能；二是加强人才引进，完善激励机制，吸引返乡创业人才；三是推广绿色生产，推进化肥农药减量增效，发展生态农业；四是完善基础设施，补齐乡村道路、物流等短板；五是强化政策支持，加大财政投入和金融扶持力度。',
    scoringCriteria: ['对策一：发展特色产业（4 分）', '对策二：人才引进（4 分）', '对策三：绿色生产（4 分）', '对策四：基础设施（4 分）', '对策五：政策支持（4 分）'],
  },
];

export function ShenlunDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [charCount, setCharCount] = useState(0);

  const material = materials.find((m) => m.id === id);

  useEffect(() => {
    setAnswer('');
    setSubmitted(false);
    setShowAnswer(false);
  }, [id]);

  if (!material) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">未找到该练习材料</p>
        <Link to="/shenlun" className="text-primary mt-4 inline-block">
          返回申论练习
        </Link>
      </div>
    );
  }

  const handleChange = (value: string) => {
    setAnswer(value);
    setCharCount(value.length);
  };

  const handleSubmit = () => {
    if (answer.length < 10) {
      setSaveMessage('答案太短了，请至少填写 10 个字');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }
    setSubmitted(true);
    setShowAnswer(true);
    setSaveMessage('✅ 已保存，可对照参考答案自查');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    setAnswer('');
    setSubmitted(false);
    setShowAnswer(false);
  };

  return (
    <div className="pb-20 md:pb-8">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/shenlun')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          返回申论练习
        </button>
        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
          {material.type}
        </span>
      </div>

      {/* 题目要求 */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <h2 className="font-semibold text-lg mb-3">{material.title}</h2>
          <p className="text-gray-900 font-medium">{material.question}</p>
        </CardContent>
      </Card>

      {/* 材料内容 */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 text-gray-700">给定材料</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'serif' }}>
            {material.content}
          </p>
        </CardContent>
      </Card>

      {/* 答案区域 */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">您的答案</h3>
            <span className={cn('text-sm', charCount > material.wordLimit ? 'text-red-500' : 'text-gray-500')}>
              {charCount} / {material.wordLimit} 字
            </span>
          </div>
          <textarea
            value={answer}
            onChange={(e) => handleChange(e.target.value)}
            disabled={submitted}
            placeholder="在此作答（提交后不可修改）..."
            className={cn(
              'w-full h-64 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed',
              submitted ? 'bg-gray-50 text-gray-600' : 'bg-white border-gray-300'
            )}
          />

          {saveMessage && (
            <div className="flex items-center gap-2 text-sm text-green-600 mt-3">
              <CheckCircle2 size={16} />
              {saveMessage}
            </div>
          )}
          {saveMessage && saveMessage.includes('答案太短') && (
            <div className="flex items-center gap-2 text-sm text-red-500 mt-3">
              <AlertCircle size={16} />
              {saveMessage}
            </div>
          )}

          <div className="flex gap-3 mt-4">
            {!submitted ? (
              <Button onClick={handleSubmit} className="flex-1" size="lg">
                <Send className="mr-2" size={18} />
                提交答案
              </Button>
            ) : (
              <Button onClick={handleReset} variant="outline" className="flex-1" size="lg">
                重新作答
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 参考答案 */}
      {showAnswer && (
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="text-green-600" size={20} />
              评分标准
            </h3>
            <ul className="space-y-1 mb-4">
              {material.scoringCriteria.map((criterion, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-200 text-green-700 text-[10px] flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  {criterion}
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-3">参考答案</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {material.referenceAnswer}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
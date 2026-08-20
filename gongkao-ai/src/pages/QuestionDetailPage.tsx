import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Star, ChevronRight } from 'lucide-react';
import { questions } from '@/data/questions';
import { useQuestionStore } from '@/stores/questionStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function QuestionDetailPage() {
  const { module } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());

  const { setAnswer, addWrongQuestion, addStudyStat } = useQuestionStore();

  const moduleQuestions = questions.filter((q) => q.module === module);
  const currentQuestion = moduleQuestions[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [module]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">该模块暂无题目</p>
        <Link to="/questions" className="text-primary mt-4 inline-block">
          返回模块选择
        </Link>
      </div>
    );
  }

  const handleSelect = (option: string) => {
    if (showExplanation) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    setAnswer(currentQuestion.id, {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      isCorrect,
      timeSpent,
      createdAt: new Date().toISOString(),
    });

    if (!isCorrect) {
      addWrongQuestion(currentQuestion.id);
    }

    // 更新今日统计
    const today = new Date().toISOString().split('T')[0];
    addStudyStat({
      date: today,
      questionsCount: 1,
      correctCount: isCorrect ? 1 : 0,
      studyTime: Math.round(timeSpent / 60),
    });

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < moduleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      navigate(`/questions/${module}/report`);
    }
  };

  const options = Object.entries(currentQuestion.options);

  return (
    <div className="pb-20 md:pb-8">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/questions" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
          返回
        </Link>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {moduleQuestions.length}
        </span>
      </div>

      {/* 题目信息 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
          {currentQuestion.subject}
        </span>
        <span className="text-yellow-500 text-sm">
          {'⭐'.repeat(currentQuestion.difficulty)}
        </span>
      </div>

      {/* 题目内容 */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
            {currentQuestion.content}
          </p>
        </CardContent>
      </Card>

      {/* 选项 */}
      <div className="space-y-3 mb-6">
        {options.map(([key, value]) => {
          const isSelected = selectedAnswer === key;
          const isCorrect = key === currentQuestion.correctAnswer;
          const showResult = showExplanation && (isSelected || isCorrect);

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              disabled={showExplanation}
              className={cn(
                'w-full p-4 rounded-lg border-2 text-left flex items-center gap-3 transition-all',
                showResult && isCorrect && 'border-green-500 bg-green-50',
                showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50',
                !showResult && isSelected && 'border-primary bg-blue-50',
                !showResult && !isSelected && 'border-gray-200 hover:border-gray-300',
                showExplanation && !isSelected && !isCorrect && 'border-gray-200 opacity-50'
              )}
            >
              <span
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border',
                  isSelected && !showExplanation && 'border-primary text-primary',
                  showResult && isCorrect && 'border-green-500 bg-green-500 text-white',
                  showResult && isSelected && !isCorrect && 'border-red-500 bg-red-500 text-white',
                  !isSelected && !showResult && 'border-gray-300'
                )}
              >
                {key}
              </span>
              <span className="flex-1 text-gray-900">{value}</span>
              {showResult && isCorrect && <Check className="text-green-500" />}
              {showResult && isSelected && !isCorrect && <X className="text-red-500" />}
            </button>
          );
        })}
      </div>

      {/* 解析 */}
      {showExplanation && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500" size={18} />
              <h3 className="font-semibold">解析</h3>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {currentQuestion.explanation}
            </p>
            {currentQuestion.knowledgePoint && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">知识点：</span>
                  {currentQuestion.knowledgePoint}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-3">
        {!showExplanation ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="flex-1"
            size="lg"
          >
            提交答案
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex-1" size="lg">
            {currentIndex < moduleQuestions.length - 1 ? '下一题' : '查看报告'}
            <ChevronRight className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

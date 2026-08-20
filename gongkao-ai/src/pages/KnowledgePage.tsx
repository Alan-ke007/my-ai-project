import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, ChevronDown, PlayCircle } from 'lucide-react';
import { getAllKnowledge, knowledgeModules, getKnowledgeByModule } from '@/data/knowledge';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { questions } from '@/data/questions';
import { cn } from '@/lib/utils';

const moduleColors: Record<string, string> = {
  政治理论: 'bg-red-100 text-red-700',
  常识判断: 'bg-yellow-100 text-yellow-700',
  言语理解: 'bg-blue-100 text-blue-700',
  数量关系: 'bg-green-100 text-green-700',
  判断推理: 'bg-purple-100 text-purple-700',
  资料分析: 'bg-cyan-100 text-cyan-700',
  申论: 'bg-orange-100 text-orange-700',
};

export function KnowledgePage() {
  const [activeModule, setActiveModule] = useState<string>('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const allKnowledge = getAllKnowledge();

  const handleModuleClick = (module: string) => {
    if (activeModule === module) {
      setActiveModule('');
    } else {
      setActiveModule(module);
      setExpanded(new Set());
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const displayKnowledge = activeModule
    ? getKnowledgeByModule(activeModule)
    : allKnowledge;

  // 按 subject 分组
  const grouped = displayKnowledge.reduce(
    (acc, kp) => {
      if (!acc[kp.subject]) acc[kp.subject] = [];
      acc[kp.subject].push(kp);
      return acc;
    },
    {} as Record<string, typeof allKnowledge>
  );

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div>
        <h1 className="text-2xl font-bold">知识点体系</h1>
        <p className="text-gray-500 mt-1">
          共 {allKnowledge.length} 个知识点，点击模块筛选
        </p>
      </div>

      {/* 模块筛选 */}
      <div className="flex flex-wrap gap-2">
        {knowledgeModules.map((module) => (
          <button
            key={module}
            onClick={() => handleModuleClick(module)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              activeModule === module
                ? moduleColors[module] || 'bg-primary text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            {module}
          </button>
        ))}
      </div>

      {/* 知识点列表 */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([subject, kps]) => (
          <div key={subject}>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              {subject}
              <span className="text-sm text-gray-400">({kps.length} 个)</span>
            </h2>
            <div className="space-y-2">
              {kps.map((kp) => (
                <Card key={kp.id}>
                  <CardContent className="p-4">
                    <button
                      onClick={() => toggleExpand(kp.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded text-xs',
                            moduleColors[kp.module]
                          )}
                        >
                          {kp.module}
                        </span>
                        <h3 className="font-medium flex-1">{kp.title}</h3>
                        <span className="text-yellow-500 text-xs">
                          {'⭐'.repeat(kp.difficulty)}
                        </span>
                      </div>
                      {expanded.has(kp.id) ? (
                        <ChevronDown className="text-gray-400" />
                      ) : (
                        <ChevronRight className="text-gray-400" />
                      )}
                    </button>
                    {expanded.has(kp.id) && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                          {kp.content}
                        </p>
                        {kp.relatedQuestions && kp.relatedQuestions.length > 0 ? (
                          <div>
                            <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                              <PlayCircle size={14} />
                              推荐练习 →
                            </p>
                            {kp.relatedQuestions.map((qid, idx) => {
                              const q = questions.find((q) => q.id === qid);
                              if (!q) return null;
                              return (
                                <Link
                                  key={idx}
                                  to={`/questions/${q.module}`}
                                  onClick={() => {
                                    // Navigate to the specific question would require additional routing logic
                                    navigate(`/questions/${q.module}`);
                                  }}
                                >
                                  <Button variant="outline" size="sm">
                                    📝 练一道【{q.subject}】题
                                  </Button>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">
                            💡 掌握此知识点后，去刷题巩固！
                            {' '}
                            <Link to="/questions" className="text-primary underline hover:no-underline">
                              去刷题
                            </Link>
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

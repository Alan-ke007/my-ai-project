import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, PenLine, FileText, ChevronRight } from 'lucide-react';

const materials = [
  {
    id: 'm-001',
    title: '数字经济与数据安全',
    type: '归纳概括' as const,
    content: '材料一：\n近年来，我国数字经济蓬勃发展，数据已成为重要的生产要素。2023 年我国数字经济规模超过 50 万亿元，占 GDP 比重超过 40%。\n\n材料二：\n在数字经济快速发展的同时，数据安全、个人信息保护、平台垄断等问题也日益突出。2021 年《数据安全法》《个人信息保护法》相继施行，标志着我国数据治理进入新阶段。',
    question: '请根据以上材料，概括我国数字经济发展中存在的主要问题。（15 分，200 字以内）',
    wordLimit: 200,
  },
  {
    id: 'm-002',
    title: '乡村振兴与绿色发展',
    type: '提出对策' as const,
    content: '材料一：\n乡村振兴战略实施以来，全国农村面貌发生了显著变化。但是，部分地区的产业发展仍然滞后，人才流失问题较为严重。\n\n材料二：\n一些地方在推进农业现代化过程中，过度使用化肥农药，造成土壤退化和水体污染。绿色发展理念尚未完全落实。',
    question: '针对上述问题，提出改进建议。（20 分，300 字以内）',
    wordLimit: 300,
  },
];

export function ShenlunPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold">申论练习</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="mx-auto text-blue-500 mb-2" size={24} />
            <p className="text-sm text-gray-600">题型分类</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PenLine className="mx-auto text-green-500 mb-2" size={24} />
            <p className="text-sm text-gray-600">真题练习</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="mx-auto text-purple-500 mb-2" size={24} />
            <p className="text-sm text-gray-600">参考答案</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {materials.map((material) => (
          <Card
            key={material.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/shenlun/${material.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                    {material.type}
                  </span>
                  <h3 className="font-semibold mt-2">{material.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{material.question}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/shenlun/${material.id}`);
                  }}
                >
                  开始练习
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

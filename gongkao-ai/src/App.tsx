import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

// 路由级代码分割：每个页面按需加载，缩小首屏主包体积
const Dashboard = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const QuestionsPage = lazy(() => import('@/pages/QuestionsPage').then((m) => ({ default: m.QuestionsPage })));
const QuestionDetailPage = lazy(() => import('@/pages/QuestionDetailPage').then((m) => ({ default: m.QuestionDetailPage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const ShenlunPage = lazy(() => import('@/pages/ShenlunPage').then((m) => ({ default: m.ShenlunPage })));
const ShenlunDetailPage = lazy(() => import('@/pages/ShenlunDetailPage').then((m) => ({ default: m.ShenlunDetailPage })));
const StatsPage = lazy(() => import('@/pages/StatsPage').then((m) => ({ default: m.StatsPage })));
const KnowledgePage = lazy(() => import('@/pages/KnowledgePage').then((m) => ({ default: m.KnowledgePage })));
const WrongQuestionsPage = lazy(() => import('@/pages/WrongQuestionsPage').then((m) => ({ default: m.WrongQuestionsPage })));

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="py-20 text-center text-gray-400">加载中…</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/questions/:module" element={<QuestionDetailPage />} />
            <Route path="/questions/:module/report" element={<WrongQuestionsPage />} />
            <Route path="/shenlun" element={<ShenlunPage />} />
            <Route path="/shenlun/:id" element={<ShenlunDetailPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { QuestionsPage } from '@/pages/QuestionsPage';
import { QuestionDetailPage } from '@/pages/QuestionDetailPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ShenlunPage } from '@/pages/ShenlunPage';
import { ShenlunDetailPage } from '@/pages/ShenlunDetailPage';
import { StatsPage } from '@/pages/StatsPage';
import { KnowledgePage } from '@/pages/KnowledgePage';
import { WrongQuestionsPage } from '@/pages/WrongQuestionsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
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
      </Layout>
    </BrowserRouter>
  );
}

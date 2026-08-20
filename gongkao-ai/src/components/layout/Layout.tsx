import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenLine, BarChart3, Settings, Lightbulb, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/questions', label: '行测', icon: BookOpen },
  { path: '/shenlun', label: '申论', icon: PenLine },
  { path: '/knowledge', label: '知识点', icon: Lightbulb },
  { path: '/questions/wrong', label: '错题本', icon: AlertCircle },
  { path: '/stats', label: '统计', icon: BarChart3 },
  { path: '/settings', label: '设置', icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 桌面端侧边栏 */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center bg-white border-r border-gray-200 py-6">
        <div className="text-2xl mb-8">📚</div>
        <nav className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs transition-colors',
                  isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className="md:ml-20 min-h-screen">
        <div className="max-w-5xl mx-auto p-4 md:p-8">{children}</div>
      </main>

      {/* 移动端底部导航 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 text-xs',
                isActive ? 'text-primary' : 'text-gray-500'
              )}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

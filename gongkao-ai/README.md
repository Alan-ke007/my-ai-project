# 公考 AI 学习助手（gongkao-ai）

一个面向公务员考试（国考 / 省考）的本地化 AI 辅助学习 Web 应用。覆盖行测五大模块与申论，支持刷题、错题本、学习统计与知识点体系。所有学习数据保存在浏览器本地（localStorage），**无需后端即可运行**。

## 功能特性

- **行测刷题**：言语理解、数量关系、判断推理、资料分析、常识判断五大模块题库
- **申论练习**：归纳概括、提出对策、综合分析、贯彻执行、大作文等题型材料与参考解析
- **错题本**：自动收录答错题目，可标记「已掌握」，支持一键重练 / 清空
- **学习统计**：总正确率、累计做题、错题数，能力雷达图 + 近 7 天刷题柱状图（Recharts）
- **知识点体系**：按模块组织的考点精讲，部分知识点关联推荐练习题
- **题库导入**：支持从 JSON / CSV 批量导入自定义题目（localStorage 持久化）
- **考试倒计时**：距离目标考试的剩余天数

## 技术栈

- React 19 + TypeScript
- Vite 8（构建 / 开发服务器）
- Tailwind CSS v4（样式）
- React Router v6（路由）
- Zustand（状态管理）
- @tanstack/react-query（异步数据）
- Recharts（图表）
- lucide-react（图标）
- Oxlint（代码检查）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建（含 TypeScript 类型检查）
npm run build

# 预览构建产物
npm run preview

# 代码检查
npm run lint
```

## 目录结构

```
src/
├── components/      # 通用组件（layout / ui）
├── data/           # 内置题库、知识点、JSON/CSV 导入工具
├── lib/            # 工具函数（cn、日期计算、storage 封装）
├── pages/          # 各路由页面
├── stores/         # Zustand 状态
├── types/          # TypeScript 类型定义
└── main.tsx        # 应用入口
```

## 数据存储

应用所有学习数据（答题记录、错题、自定义题库、学习统计）均保存在浏览器 `localStorage`，刷新不丢失，但不跨设备同步。清空浏览器站点数据即可重置。

## 说明

本项目为学习 / 演示用途，内置题目与知识点为示例内容，正式备考请以官方考试大纲与权威教材为准。

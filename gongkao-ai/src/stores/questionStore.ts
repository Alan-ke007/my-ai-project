import { create } from 'zustand';
import { storage } from '@/lib/utils';
import type { UserAnswer, WrongQuestion, StudyStats } from '@/types';

interface QuestionState {
  answers: Record<string, UserAnswer>;
  wrongQuestions: Record<string, WrongQuestion>;
  studyStats: StudyStats[];
  setAnswer: (questionId: string, answer: UserAnswer) => void;
  addWrongQuestion: (questionId: string) => void;
  markMastered: (questionId: string) => void;
  addStudyStat: (stat: StudyStats) => void;
  getTodayStats: () => StudyStats;
}

export const useQuestionStore = create<QuestionState>((set, get) => {
  const savedAnswers = storage.get<Record<string, UserAnswer>>('user_answers', {});
  const savedWrong = storage.get<Record<string, WrongQuestion>>('wrong_questions', {});
  const savedStats = storage.get<StudyStats[]>('study_stats', []);

  return {
    answers: savedAnswers,
    wrongQuestions: savedWrong,
    studyStats: savedStats,

    setAnswer: (questionId, answer) => {
      const newAnswers = { ...get().answers, [questionId]: answer };
      storage.set('user_answers', newAnswers);
      set({ answers: newAnswers });
    },

    addWrongQuestion: (questionId) => {
      const wrong = get().wrongQuestions[questionId];
      const updated = {
        ...get().wrongQuestions,
        [questionId]: {
          questionId,
          wrongCount: wrong ? wrong.wrongCount + 1 : 1,
          lastWrongAt: new Date().toISOString(),
          mastered: false,
        },
      };
      storage.set('wrong_questions', updated);
      set({ wrongQuestions: updated });
    },

    markMastered: (questionId) => {
      const wrong = get().wrongQuestions[questionId];
      if (wrong) {
        const updated = {
          ...get().wrongQuestions,
          [questionId]: { ...wrong, mastered: true },
        };
        storage.set('wrong_questions', updated);
        set({ wrongQuestions: updated });
      }
    },

    addStudyStat: (stat) => {
      const existing = get().studyStats;
      const todayIdx = existing.findIndex((s) => s.date === stat.date);
      if (todayIdx >= 0) {
        const updated = existing.map((s, i) =>
          i === todayIdx
            ? {
                ...s,
                questionsCount: s.questionsCount + stat.questionsCount,
                correctCount: s.correctCount + stat.correctCount,
                studyTime: s.studyTime + stat.studyTime,
              }
            : s
        );
        storage.set('study_stats', updated);
        set({ studyStats: updated });
      } else {
        const newStats = [...existing, stat];
        storage.set('study_stats', newStats);
        set({ studyStats: newStats });
      }
    },

    getTodayStats: () => {
      const today = new Date().toISOString().split('T')[0];
      const todayStat = get().studyStats.find((s) => s.date === today);
      return todayStat || {
        date: today,
        questionsCount: 0,
        correctCount: 0,
        studyTime: 0,
      };
    },
  };
});

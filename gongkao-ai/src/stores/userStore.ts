import { create } from 'zustand';
import { storage, calculateDaysLeft } from '@/lib/utils';

interface UserState {
  targetExam: string;
  examDate: string;
  daysLeft: number;
  setTargetExam: (name: string, date: string) => void;
  updateDaysLeft: () => void;
}

export const useUserStore = create<UserState>((set) => {
  const savedExam = storage.get('exam_countdown', {
    name: '2026 国考',
    date: '2026-11-28',
  });

  return {
    targetExam: savedExam.name,
    examDate: savedExam.date,
    daysLeft: calculateDaysLeft(savedExam.date),
    setTargetExam: (name, date) => {
      storage.set('exam_countdown', { name, date });
      set({
        targetExam: name,
        examDate: date,
        daysLeft: calculateDaysLeft(date),
      });
    },
    updateDaysLeft: () =>
      set((state) => ({
        daysLeft: calculateDaysLeft(state.examDate),
      })),
  };
});

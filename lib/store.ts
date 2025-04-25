"use client";

import { create } from 'zustand';
import type { Exam, ExamResult } from './types';

interface ExamState {
  exams: Exam[];
  results: { [examId: string]: ExamResult };
  addExam: (exam: Exam) => void;
  addResult: (examId: string, result: ExamResult) => void;
  getExamsByTerm: (term: string) => Exam[];
  deleteExam: (examId: string) => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  exams: [],
  results: {},
  addExam: (exam) => set((state) => ({ exams: [...state.exams, exam] })),
  addResult: (examId, result) => 
    set((state) => ({ 
      results: { ...state.results, [examId]: result } 
    })),
  getExamsByTerm: (term) => 
    get().exams.filter(exam => exam.term === term),
  deleteExam: (examId) => 
    set((state) => ({ 
      exams: state.exams.filter(exam => exam.id !== examId),
      results: Object.fromEntries(
        Object.entries(state.results).filter(([id]) => id !== examId)
      )
    })),
}));
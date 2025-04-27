"use client";

import type { ExamResult, ExamRow } from "@/lib/types";
import { generateExamId } from "@/lib/utils";

export function calculateExamResult(
    correctAnswers: number,
    totalQuestions: number,
    timeSpent: number
): ExamResult {
  return {
    examId: generateExamId(),
    correctAnswers,
    totalQuestions,
    timeSpent,
    percentage: Math.round((correctAnswers / totalQuestions) * 100),
    submittedAt: new Date().toISOString()
  };
}

export function getSubmittedAnswersCount(examData: ExamRow[]): number {
  return document.querySelectorAll('[data-submitted="true"][data-correct="true"]').length;
}
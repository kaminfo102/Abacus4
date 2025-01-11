"use client";

import type { ExamResult, ExamRow } from "@/lib/types";

export function calculateExamResult(
    correctAnswers: number,
    totalQuestions: number,
    timeSpent: number
): ExamResult {
  return {
    correctAnswers,
    totalQuestions,
    timeSpent,
    percentage: Math.round((correctAnswers / totalQuestions) * 100)
  };
}

export function getSubmittedAnswersCount(examData: ExamRow[]): number {
  return document.querySelectorAll('[data-submitted="true"][data-correct="true"]').length;
}
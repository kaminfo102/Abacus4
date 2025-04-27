"use client";

import { useExamStore } from "@/lib/store";
import { ExamPage } from "@/components/exam/ExamPage";

export function ExamPageClient({ id }: { id: string }) {
  const exam = useExamStore(state => 
    state.exams.find(e => e.id === id)
  );

  if (!exam) {
    return <div>آزمون یافت نشد</div>;
  }

  return <ExamPage exam={exam} />;
} 
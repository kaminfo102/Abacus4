"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { ExamPage } from "@/components/exam/ExamPage";
import { useExamStore } from "@/lib/store";

export default function ExamPageRoute() {
  const { id } = useParams();
  const exam = useExamStore(state => 
    state.exams.find(e => e.id === id)
  );

  if (!exam) {
    return <div>آزمون یافت نشد</div>;
  }

  return <ExamPage exam={exam} />;
}
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalculationsTable } from "@/components/CalculationsTable";
import { generateExamData } from "@/lib/utils";
import type { ExamSettings } from "@/lib/types";

interface ExamContentProps {
  settings: ExamSettings;
  isStarted: boolean;
  isFinished: boolean;
  onStart: () => void;
  onFinish: (correctAnswers: number) => void;
}

export function ExamContent({
  settings,
  isStarted,
  isFinished,
  onStart,
  onFinish
}: ExamContentProps) {
  const [examData, setExamData] = useState(() => generateExamData(settings));

  if (!isStarted) {
    return (
      <div className="text-center">
        <h2 className="text-xl mb-4">آماده شروع آزمون هستید؟</h2>
        <Button onClick={onStart}>شروع آزمون</Button>
      </div>
    );
  }

  return (
    <CalculationsTable
      examData={examData}
      onFinish={onFinish}
      isDisabled={isFinished}
      onAnswersUpdate={() => {}}
    />
  );
}
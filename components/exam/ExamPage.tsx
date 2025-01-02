"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ExamTimer } from "@/components/exam/ExamTimer";
import { ExamContent } from "@/components/exam/ExamContent";
import { ExamResult } from "@/components/exam/ExamResult";
import { TimeoutAlert } from "@/components/exam/TimeoutAlert";
import { useExamStore } from "@/lib/store";
import type { Exam } from "@/lib/types";

interface ExamPageProps {
  exam: Exam;
}

export function ExamPage({ exam }: ExamPageProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
  const addResult = useExamStore(state => state.addResult);
  const router = useRouter();

  const handleTimeEnd = useCallback(() => {
    setIsFinished(true);
    setShowTimeoutAlert(true);
  }, []);

  const handleFinish = useCallback((correctAnswers: number) => {
    const result = {
      correctAnswers,
      totalQuestions: exam.settings.rowCount,
      timeSpent,
      percentage: Math.round((correctAnswers / exam.settings.rowCount) * 100)
    };

    addResult(exam.id, result);
    setIsFinished(true);
    
    // بعد از 3 ثانیه به داشبورد برمی‌گردیم
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, [exam, timeSpent, addResult, router]);

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-2">{exam.title}</h1>
          <ExamTimer
            isRunning={isStarted && !isFinished}
            onTimeUpdate={setTimeSpent}
            timeLimit={exam.settings.timeLimit}
            onTimeEnd={handleTimeEnd}
          />
        </div>

        <ExamContent
          settings={exam.settings}
          isStarted={isStarted}
          isFinished={isFinished}
          onStart={() => setIsStarted(true)}
          onFinish={handleFinish}
        />

        {showTimeoutAlert && (
          <TimeoutAlert onClose={() => setShowTimeoutAlert(false)} />
        )}

        {isFinished && (
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-2">
              در حال بازگشت به داشبورد...
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
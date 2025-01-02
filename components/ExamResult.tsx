"use client";

import { Card } from "@/components/ui/card";
import type { ExamResult } from "@/lib/types";

interface ExamResultProps {
  result: ExamResult;
}

export function ExamResult({ result }: ExamResultProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} دقیقه و ${remainingSeconds} ثانیه`;
  };

  return (
    <Card className="p-6 mt-8">
      <h2 className="text-xl font-bold text-primary mb-4 text-center">نتیجه آزمون</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">تعداد پاسخ‌های صحیح</p>
          <p className="text-2xl font-bold text-primary">{result.correctAnswers} از {result.totalQuestions}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">درصد موفقیت</p>
          <p className="text-2xl font-bold text-primary">{result.percentage}%</p>
        </div>
        <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">زمان صرف شده</p>
          <p className="text-2xl font-bold text-primary">{formatTime(result.timeSpent)}</p>
        </div>
      </div>
    </Card>
  );
}
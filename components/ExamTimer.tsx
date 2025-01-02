"use client";

import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import { useExamTimer } from "@/hooks/useExamTimer";

type ExamTimerProps = {
  isRunning: boolean;
  onTimeUpdate: (time: number) => void;
  timeLimit?: number;
  onTimeEnd?: () => void;
};

export function ExamTimer({ isRunning, onTimeUpdate, timeLimit, onTimeEnd }: ExamTimerProps) {
  const { seconds, formattedTime } = useExamTimer({
    isRunning,
    onTimeUpdate,
    timeLimit,
    onTimeEnd
  });

  const remainingTime = timeLimit ? timeLimit - seconds : seconds;

  return (
    <div className="flex items-center justify-center gap-2 text-xl font-bold text-primary">
      <Clock className="w-6 h-6" />
      <span dir="ltr">{formattedTime(remainingTime)}</span>
    </div>
  );
}
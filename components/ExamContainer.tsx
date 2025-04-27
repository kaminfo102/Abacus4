"use client";

import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ExamTimer } from "./ExamTimer";
import { ExamSettings } from "./ExamSettings";
import { ExamResult } from "./ExamResult";
import { TimeoutAlert } from "./exam/TimeoutAlert";
import { CalculationsTable, type Answer } from "@/components/CalculationsTable";
import type { ExamSettings as ExamSettingsType, ExamResult as ExamResultType } from "@/lib/types";
import { generateExamData, generateExamId } from "@/lib/utils";

export function ExamContainer() {
  const [isStarted, setIsStarted] = useState(false);
  const [examTime, setExamTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [settings, setSettings] = useState<ExamSettingsType | null>(null);
  const [result, setResult] = useState<ExamResultType | null>(null);
  const [examData, setExamData] = useState<ReturnType<typeof generateExamData>>([]);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: number]: Answer }>({});
  const [shouldEndExam, setShouldEndExam] = useState(false);

  const handleStart = (examSettings: ExamSettingsType) => {
    setSettings(examSettings);
    setExamData(generateExamData(examSettings));
    setIsStarted(true);
  };

  const calculateResult = useCallback((answers: { [key: number]: Answer }) => {
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / settings!.rowCount) * 100);
    
    return {
      examId: generateExamId(),
      correctAnswers,
      totalQuestions: settings!.rowCount,
      timeSpent: examTime,
      percentage,
      submittedAt: new Date().toISOString()
    };
  }, [settings, examTime]);

  const handleTimeEnd = useCallback(() => {
    setShouldEndExam(true);
  }, []);

  // Effect for handling exam end (both timeout and manual finish)
  useEffect(() => {
    if (shouldEndExam && settings) {
      const examResult = calculateResult(currentAnswers);
      
      setIsFinished(true);
      setShowTimeoutAlert(true);
      setResult(examResult);
    }
  }, [shouldEndExam, settings, calculateResult, currentAnswers]);

  const handleFinishExam = useCallback((correctAnswers: number) => {
    if (!settings) return;
    setShouldEndExam(true);
  }, [settings]);

  const handleTimeUpdate = useCallback((time: number) => {
    setExamTime(time);
  }, []);

  const handleAnswersUpdate = useCallback((answers: { [key: number]: Answer }) => {
    setCurrentAnswers(answers);
  }, []);

  if (!isStarted) {
    return <ExamSettings onStart={handleStart} />;
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <ExamTimer
          isRunning={isStarted && !isFinished}
          onTimeUpdate={handleTimeUpdate}
          timeLimit={settings?.timeLimit}
          onTimeEnd={handleTimeEnd}
        />
      </div>
      <CalculationsTable
        examData={examData}
        onFinish={handleFinishExam}
        isDisabled={isFinished}
        onAnswersUpdate={handleAnswersUpdate}
      />
      {showTimeoutAlert && <TimeoutAlert onClose={() => setShowTimeoutAlert(false)} />}
      {result && <ExamResult result={result} />}
    </Card>
  );
}

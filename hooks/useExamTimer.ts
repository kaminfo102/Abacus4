"use client";

import { useState, useEffect, useCallback } from "react";

interface UseExamTimerProps {
  isRunning: boolean;
  onTimeUpdate: (time: number) => void;
  timeLimit?: number;
  onTimeEnd?: () => void;
}

export function useExamTimer({ isRunning, onTimeUpdate, timeLimit, onTimeEnd }: UseExamTimerProps) {
  const [seconds, setSeconds] = useState(0);

  // Handle time updates separately from the counter
  useEffect(() => {
    if (seconds > 0) {
      onTimeUpdate(seconds);
    }
  }, [seconds, onTimeUpdate]);

  // Handle the timer increment
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newTime = prev + 1;
          if (timeLimit && newTime >= timeLimit) {
            onTimeEnd?.();
            return timeLimit;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLimit, onTimeEnd]);

  const formattedTime = useCallback((totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    seconds,
    formattedTime
  };
}


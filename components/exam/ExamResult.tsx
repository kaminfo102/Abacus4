import React from 'react';

interface ExamResultProps {
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  percentage: number;
}

export const ExamResult: React.FC<ExamResultProps> = ({ correctAnswers, totalQuestions, timeSpent, percentage }) => {
  return (
    <div>
      <h2>Exam Result</h2>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Total Questions: {totalQuestions}</p>
      <p>Time Spent: {timeSpent} seconds</p>
      <p>Percentage: {percentage}%</p>
    </div>
  );
}; 
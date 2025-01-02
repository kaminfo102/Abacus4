export interface ExamResult {
  examId: string;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  percentage: number;
  submittedAt: string;
}

export interface ExamError {
  code: string;
  message: string;
}
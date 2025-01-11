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

export type Operator = '+' | '-' | '*' | '/';

export interface ExamSettings {
  digitCount: number;
  rowCount: number;
  timeLimit: number; // in seconds
  operators: Operator[];
  itemsPerRow: number;
}

/*export interface ExamResult {
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  percentage: number;
}*/

export interface NumberItem {
  value: number;
  operator: Operator;
}

export interface ExamRow {
  items: NumberItem[];
}

export type UserRole = 'admin' | 'student';

export interface User {
  username: string;
  password: string;
  role: UserRole;
}
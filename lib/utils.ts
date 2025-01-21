import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Operator, NumberItem, ExamRow,ExamSettings } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertPersianToEnglish(str: string): number {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(persianNumbers[i], "g"), i.toString());
  }
  return parseInt(result, 10);
}

export function generateRandomNumber(digitCount: number): number {
  const min = Math.pow(10, digitCount - 1);
  const max = Math.pow(10, digitCount) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomOperator(operators: Operator[]): Operator {
  return operators[Math.floor(Math.random() * operators.length)];
}

// export function calculateRowResult(items: NumberItem[]): number {
//   return items.reduce((result, item, index) => {
//     if (index === 0) return item.value;
//
//     switch (item.operator) {
//       case '+':
//         return result + item.value;
//       case '-':
//         return result - item.value;
//       case '*':
//         return result * item.value;
//       case '/':
//         return Math.round(result / item.value);
//       default:
//         return result;
//     }
//   }, 0);
// }
export function calculateRowResult(items: NumberItem[]): number {
  return Math.abs(items.reduce((result, item, index) => {
    if (index === 0) return item.value;

    switch (item.operator) {
      case '+':
        return result + item.value;
      case '-':
        return result - item.value;
      case '*':
        return result * item.value;
      case '/':
        return Math.round(result / item.value);
      default:
        return result;
    }
  }, 0));
}

export function generateExamData(settings: ExamSettings): ExamRow[] {
  return Array(settings.rowCount).fill(0).map(() => ({
    items: Array(settings.itemsPerRow).fill(0).map((_, index) => ({
      value: generateRandomNumber(settings.digitCount),
      operator: index === 0 ? '+' : getRandomOperator(settings.operators)
    }))
  }));
}

export const OPERATOR_LABELS: Record<Operator, string> = {
  '+': 'جمع',
  '-': 'تفریق',
  '*': 'ضرب',
  '/': 'تقسیم'
};
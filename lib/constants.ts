import type { Operator } from "./types";

export const OPERATOR_LABELS: Record<Operator, string> = {
  '+': 'جمع',
  '-': 'تفریق',
  '*': 'ضرب',
  '/': 'تقسیم'
};

export const EXAM_DATA = {
  numbers: [
    { row1: 2, row2: -3 },
    { row1: 8, row2: 3 },
    { row1: 1, row2: -2 },
    { row1: 2, row2: -7 },
    { row1: 6, row2: 2 },
    { row1: 1, row2: 5 },
    { row1: 6, row2: -5 },
    { row1: 7, row2: 3 },
    { row1: 9, row2: -2 },
    { row1: 8, row2: 2 },
  ].reverse()
};
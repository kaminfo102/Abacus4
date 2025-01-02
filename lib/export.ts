"use client";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import type { Exam, ExamResult } from './types';

export function exportToExcel(exams: Exam[], results: { [key: string]: ExamResult }) {
  const data = exams.map(exam => {
    const examResults = Object.values(results).filter(r => r.examId === exam.id);
    const avgScore = examResults.length
      ? examResults.reduce((sum, r) => sum + r.percentage, 0) / examResults.length
      : 0;

    return {
      'عنوان آزمون': exam.title,
      'ترم': exam.term,
      'تاریخ ایجاد': new Date(exam.createdAt).toLocaleDateString('fa-IR'),
      'تعداد شرکت‌کنندگان': examResults.length,
      'میانگین نمرات': `${Math.round(avgScore)}%`,
    };
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'گزارش آزمون‌ها');
  
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  saveAs(dataBlob, `exam-report-${new Date().toISOString()}.xlsx`);
}
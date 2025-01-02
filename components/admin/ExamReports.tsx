"use client";

import { Card } from "@/components/ui/card";
import { useExamStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ExamReports() {
  const { exams, results } = useExamStore();

  const examStats = exams.map(exam => {
    const examResults = Object.values(results).filter(r => r.examId === exam.id);
    const avgScore = examResults.length 
      ? examResults.reduce((sum, r) => sum + r.percentage, 0) / examResults.length 
      : 0;
    
    return {
      ...exam,
      participantsCount: examResults.length,
      averageScore: Math.round(avgScore),
    };
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">گزارش آزمون‌ها</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان آزمون</TableHead>
            <TableHead>ترم</TableHead>
            <TableHead>تاریخ ایجاد</TableHead>
            <TableHead>تعداد شرکت‌کنندگان</TableHead>
            <TableHead>میانگین نمرات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {examStats.map(exam => (
            <TableRow key={exam.id}>
              <TableCell>{exam.title}</TableCell>
              <TableCell>ترم {exam.term}</TableCell>
              <TableCell>{formatDate(exam.createdAt)}</TableCell>
              <TableCell>{exam.participantsCount}</TableCell>
              <TableCell>{exam.averageScore}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
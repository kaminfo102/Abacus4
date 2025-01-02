"use client";

import { Card } from "@/components/ui/card";
import { useExamStore } from "@/lib/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export function ExamCharts() {
  const { exams, results } = useExamStore();

  const termStats = exams.reduce((acc, exam) => {
    const examResults = Object.values(results).filter(r => r.examId === exam.id);
    if (!acc[exam.term]) {
      acc[exam.term] = { term: exam.term, count: 0, avgScore: 0 };
    }
    acc[exam.term].count += examResults.length;
    acc[exam.term].avgScore += examResults.reduce((sum, r) => sum + r.percentage, 0);
    return acc;
  }, {} as Record<string, { term: string; count: number; avgScore: number }>);

  const chartData = Object.values(termStats).map(stat => ({
    term: `ترم ${stat.term}`,
    count: stat.count,
    avgScore: stat.count > 0 ? Math.round(stat.avgScore / stat.count) : 0,
  }));

  const scoreRanges = Object.values(results).reduce((acc, result) => {
    const range = Math.floor(result.percentage / 25);
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const pieData = [
    { name: "0-25%", value: scoreRanges[0] || 0 },
    { name: "26-50%", value: scoreRanges[1] || 0 },
    { name: "51-75%", value: scoreRanges[2] || 0 },
    { name: "76-100%", value: scoreRanges[3] || 0 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">میانگین نمرات به تفکیک ترم</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#3b82f6" name="میانگین نمره" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">توزیع نمرات</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
"use client";

import { useState } from 'react';
import { useExamStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExamActions } from './ExamActions';
import { ExamCharts } from './ExamCharts';
import { exportToExcel } from '@/lib/export';
import { formatDate } from '@/lib/utils';
import { Search, Download } from 'lucide-react';

export function ExamList() {
  const { exams, results } = useExamStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [editingExamId, setEditingExamId] = useState<string | null>(null);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTerm = selectedTerm ? exam.term === selectedTerm : true;
    return matchesSearch && matchesTerm;
  });

  const handleExport = () => {
    exportToExcel(exams, results);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="جستجو در آزمون‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedTerm} onValueChange={setSelectedTerm}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="فیلتر بر اساس ترم" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">همه ترم‌ها</SelectItem>
            {Array.from({ length: 8 }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                ترم {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleExport}>
          <Download className="ml-2 h-4 w-4" />
          خروجی Excel
        </Button>
      </div>

      <ExamCharts />

      <div className="grid gap-4">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{exam.title}</h3>
                <p className="text-sm text-gray-600">ترم {exam.term}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(exam.createdAt)}
                </p>
              </div>
              <ExamActions
                exam={exam}
                onEdit={() => setEditingExamId(exam.id)}
              />
            </div>
          </Card>
        ))}

        {filteredExams.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            هیچ آزمونی یافت نشد
          </div>
        )}
      </div>
    </div>
  );
}
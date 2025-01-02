"use client";

import { useExamStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';

interface UserExamsProps {
  term: string;
}

export function UserExams({ term }: UserExamsProps) {
  const exams = useExamStore((state) => state.getExamsByTerm(term));
  const results = useExamStore((state) => state.results);
  const router = useRouter();

  return (
    <div className="grid gap-4">
      {exams.map((exam) => {
        const result = results[exam.id];
        
        return (
          <Card key={exam.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{exam.title}</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(exam.createdAt)}
                </p>
              </div>
              <div>
                {result ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">نتیجه</p>
                    <p className="font-bold text-primary">
                      {result.percentage}%
                    </p>
                  </div>
                ) : (
                  <Button
                    onClick={() => router.push(`/exam/${exam.id}`)}
                  >
                    شروع آزمون
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
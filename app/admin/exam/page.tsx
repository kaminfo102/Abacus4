'use client';
import { ExamContainer } from "@/components/ExamContainer";
import AuthGuard from '@/components/guards/AuthGuard';

export default function Home() {
  return (
      <AuthGuard allowedRoles={['admin', 'student']}>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-[95%] md:max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
          ارزیابی پایان ترم محاسبات ذهنی با چرتکه
        </h1>
        <ExamContainer />
      </div>
    </div>
      </AuthGuard>
  );
}
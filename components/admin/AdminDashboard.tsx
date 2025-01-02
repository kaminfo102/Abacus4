"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExamForm } from "./ExamForm";
import { ExamList } from "./ExamList";
import { ExamReports } from "./ExamReports";

export function AdminDashboard() {
  const [showExamForm, setShowExamForm] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">داشبورد مدیریت</h1>
      
      <div className="mb-6">
        <Button onClick={() => setShowExamForm(true)}>
          ایجاد آزمون جدید
        </Button>
      </div>

      {showExamForm ? (
        <Card className="p-6 mb-6">
          <ExamForm onSubmit={() => setShowExamForm(false)} />
        </Card>
      ) : (
        <Tabs defaultValue="exams">
          <TabsList className="mb-6">
            <TabsTrigger value="exams">آزمون‌ها</TabsTrigger>
            <TabsTrigger value="reports">گزارش‌ها</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exams">
            <ExamList />
          </TabsContent>
          
          <TabsContent value="reports">
            <ExamReports />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
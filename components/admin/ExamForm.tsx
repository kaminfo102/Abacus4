"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useExamStore } from "@/lib/store";
import { generateExamId } from "@/lib/utils";
import type { ExamSettings, Operator } from "@/lib/types";

interface ExamFormProps {
  onSubmit: () => void;
}

const TERMS = [
  { value: "1", label: "ترم 1" },
  { value: "2", label: "ترم 2" },
  { value: "3", label: "ترم 3" },
  { value: "4", label: "ترم 4" },
  { value: "5", label: "ترم 5" },
  { value: "6", label: "ترم 6" },
  { value: "7", label: "ترم 7" },
  { value: "8", label: "ترم 8" },
];

const OPERATORS: { value: Operator; label: string }[] = [
  { value: "+", label: "جمع" },
  { value: "-", label: "تفریق" },
  { value: "*", label: "ضرب" },
  { value: "/", label: "تقسیم" },
];

export function ExamForm({ onSubmit }: ExamFormProps) {
  const addExam = useExamStore((state) => state.addExam);
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("1");
  const [settings, setSettings] = useState<ExamSettings>({
    digitCount: 1,
    rowCount: 10,
    timeLimit: 60,
    operators: ['+', '-'],
    itemsPerRow: 2
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const exam = {
      id: generateExamId(),
      title,
      term,
      settings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addExam(exam);
    onSubmit();
  };

  const toggleOperator = (operator: Operator) => {
    setSettings(prev => ({
      ...prev,
      operators: prev.operators.includes(operator)
        ? prev.operators.filter(op => op !== operator)
        : [...prev.operators, operator]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">عنوان آزمون</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="مثال: آزمون پایان ترم محاسبات ذهنی"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="term">ترم</Label>
        <Select
          value={term}
          onValueChange={setTerm}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب ترم" />
          </SelectTrigger>
          <SelectContent>
            {TERMS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="digitCount">تعداد ارقام اعداد</Label>
        <Input
          id="digitCount"
          type="number"
          min={1}
          max={5}
          value={settings.digitCount}
          onChange={(e) => setSettings(prev => ({ ...prev, digitCount: parseInt(e.target.value) }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rowCount">تعداد سطرها</Label>
        <Input
          id="rowCount"
          type="number"
          min={5}
          max={20}
          value={settings.rowCount}
          onChange={(e) => setSettings(prev => ({ ...prev, rowCount: parseInt(e.target.value) }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeLimit">مدت زمان آزمون (دقیقه)</Label>
        <Input
          id="timeLimit"
          type="number"
          min={1}
          max={60}
          value={settings.timeLimit / 60}
          onChange={(e) => setSettings(prev => ({ ...prev, timeLimit: parseInt(e.target.value) * 60 }))}
          required
        />
      </div>

      <div className="space-y-3">
        <Label>عملگرهای مجاز</Label>
        <div className="grid grid-cols-2 gap-4">
          {OPERATORS.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={`op-${value}`}
                checked={settings.operators.includes(value)}
                onCheckedChange={() => toggleOperator(value)}
              />
              <Label htmlFor={`op-${value}`} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full">
        ثبت آزمون
      </Button>
    </form>
  );
}
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { ExamSettings, Operator } from "@/lib/types";
import { OPERATOR_LABELS } from "@/lib/constants";

interface ExamSettingsProps {
  onStart: (settings: ExamSettings) => void;
}

const DEFAULT_SETTINGS: ExamSettings = {
  digitCount: 1,
  rowCount: 10,
  timeLimit: 60,
  operators: ['+', '-'],
  itemsPerRow: 2
};

const LIMITS = {
  digitCount: { min: 1, max: 5 },
  rowCount: { min: 5, max: 20 },
  timeLimit: { min: 1, max: 60 },
  itemsPerRow: { min: 2, max: 10 }
};

export function ExamSettings({ onStart }: ExamSettingsProps) {
  const [settings, setSettings] = useState<ExamSettings>(DEFAULT_SETTINGS);
  const [error, setError] = useState<string | null>(null);

  const validateSettings = (): boolean => {
    if (settings.operators.length === 0) {
      setError('لطفاً حداقل یک عملگر را انتخاب کنید');
      return false;
    }

    if (settings.digitCount < LIMITS.digitCount.min || settings.digitCount > LIMITS.digitCount.max) {
      setError(`تعداد ارقام باید بین ${LIMITS.digitCount.min} تا ${LIMITS.digitCount.max} باشد`);
      return false;
    }

    if (settings.rowCount < LIMITS.rowCount.min || settings.rowCount > LIMITS.rowCount.max) {
      setError(`تعداد سطرها باید بین ${LIMITS.rowCount.min} تا ${LIMITS.rowCount.max} باشد`);
      return false;
    }

    if (settings.itemsPerRow < LIMITS.itemsPerRow.min || settings.itemsPerRow > LIMITS.itemsPerRow.max) {
      setError(`تعداد اعداد در هر سطر باید بین ${LIMITS.itemsPerRow.min} تا ${LIMITS.itemsPerRow.max} باشد`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSettings()) {
      onStart(settings);
    }
  };

  const toggleOperator = (operator: Operator) => {
    setSettings(prev => ({
      ...prev,
      operators: prev.operators.includes(operator)
        ? prev.operators.filter(op => op !== operator)
        : [...prev.operators, operator]
    }));
  };

  const updateSetting = <K extends keyof ExamSettings>(
    key: K,
    value: ExamSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-primary mb-6 text-center">تنظیمات آزمون</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="digitCount">تعداد ارقام اعداد</Label>
          <Input
            id="digitCount"
            type="number"
            min={LIMITS.digitCount.min}
            max={LIMITS.digitCount.max}
            value={settings.digitCount}
            onChange={(e) => updateSetting('digitCount', parseInt(e.target.value))}
            className="text-center"
          />
          <p className="text-sm text-muted-foreground">
            محدوده مجاز: {LIMITS.digitCount.min} تا {LIMITS.digitCount.max}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rowCount">تعداد سطرها</Label>
          <Input
            id="rowCount"
            type="number"
            min={LIMITS.rowCount.min}
            max={LIMITS.rowCount.max}
            value={settings.rowCount}
            onChange={(e) => updateSetting('rowCount', parseInt(e.target.value))}
            className="text-center"
          />
          <p className="text-sm text-muted-foreground">
            محدوده مجاز: {LIMITS.rowCount.min} تا {LIMITS.rowCount.max}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="itemsPerRow">تعداد اعداد در هر سطر</Label>
          <Input
            id="itemsPerRow"
            type="number"
            min={LIMITS.itemsPerRow.min}
            max={LIMITS.itemsPerRow.max}
            value={settings.itemsPerRow}
            onChange={(e) => updateSetting('itemsPerRow', parseInt(e.target.value))}
            className="text-center"
          />
          <p className="text-sm text-muted-foreground">
            محدوده مجاز: {LIMITS.itemsPerRow.min} تا {LIMITS.itemsPerRow.max}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeLimit">مدت زمان آزمون (دقیقه)</Label>
          <Input
            id="timeLimit"
            type="number"
            min={LIMITS.timeLimit.min}
            max={LIMITS.timeLimit.max}
            value={settings.timeLimit / 60}
            onChange={(e) => updateSetting('timeLimit', parseInt(e.target.value) * 60)}
            className="text-center"
          />
          <p className="text-sm text-muted-foreground">
            محدوده مجاز: {LIMITS.timeLimit.min} تا {LIMITS.timeLimit.max} دقیقه
          </p>
        </div>

        <div className="space-y-3">
          <Label>عملگرهای مجاز</Label>
          <div className="grid grid-cols-2 gap-4">
            {(['+', '-', '*', '/'] as Operator[]).map((op) => (
              <div key={op} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={`op-${op}`}
                  checked={settings.operators.includes(op)}
                  onCheckedChange={() => toggleOperator(op)}
                />
                <Label htmlFor={`op-${op}`} className="text-sm">
                  {OPERATOR_LABELS[op]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">شروع آزمون</Button>
      </form>
    </Card>
  );
}
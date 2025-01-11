// @ts-ignore
// @ts-ignore

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info, HelpCircle } from "lucide-react";
import type { ExamSettings, Operator } from "@/lib/types";
import { OPERATOR_LABELS } from "@/lib/constants";
import { NumberInput } from "@/components/ui/inputNum";
import { CheckboxM } from "@/components/ui/checkboxM";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExamSettingsProps {
    onStart: (settings: ExamSettings) => void;
}

const DEFAULT_SETTINGS: ExamSettings = {
    digitCount: 1,
    rowCount: 10,
    timeLimit: 60,
    operators: [`+`,`-`],
    itemsPerRow: 2
};

const LIMITS = {
    digitCount: { min: 1, max: 5 },
    rowCount: { min: 5, max: 20 },
    timeLimit: { min: 1, max: 60 },
    itemsPerRow: { min: 2, max: 10 }
};

// ... (کدهای قبلی مربوط به interface و constant ها)

export function ExamSettings({ onStart }: ExamSettingsProps) {
  // ... (کدهای قبلی مربوط به state و توابع)
    const [settings, setSettings] = useState<ExamSettings>(DEFAULT_SETTINGS);
    const [error, setError] = useState<string | null>(null);

    const validateSettings = (): boolean => {
        if (settings.operators.length === 0) {
            setError('لطفاً حداقل یک عملگر را انتخاب کنید' );
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
        setSettings(prev => ({...prev,
            operators: prev.operators.includes(operator)
            ? prev.operators.filter(op => op !== operator)
            : [...prev.operators, operator]
            }));
          };

    const updateSetting = <K extends keyof ExamSettings>(
        key: K,
        value: ExamSettings[K]
    ) => {
        setSettings(prev => ({...prev, [key]: value }));
    };

  const GuideItem = ({ text }: { text: string }) => (
      <li className="flex items-center gap-2 text-sm">
        <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
        <span>{text}</span>
      </li>
  );

  const FieldLabel = ({ htmlFor, children, tooltip }: { htmlFor: string, children: React.ReactNode, tooltip?: string }) => (
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium">
          <label htmlFor={htmlFor}>{children}</label>
        </div>
        {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        )}
      </div>
  );

  return (
      <Card className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">تنظیمات آزمون</h2>

        {/* راهنمای تکمیل فرم */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-blue-700 mb-3">راهنمای تکمیل فرم</h3>
          <ul className="space-y-2 text-blue-600">
            <GuideItem text="تعداد ارقام: تعیین کننده حداکثر رقم‌های اعداد در محاسبات" />
            <GuideItem text="تعداد سوال: مشخص کننده تعداد کل سوالات آزمون" />
            <GuideItem text="تعداد آیتم: تعداد اعداد در هر سطر برای محاسبه" />
            <GuideItem text="مدت زمان: زمان کل آزمون به دقیقه" />
          </ul>
        </div>

        {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* بخش ورودی‌های عددی */}
            <div className="bg-slate-50 p-4 sm:p-6 rounded-xl">
                <h3 className="font-semibold text-lg text-slate-700 mb-4 sm:mb-6">تنظیمات عددی</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-8">
                    {/* ورودی اول */}
                    <div className="space-y-2">
                        <FieldLabel
                            htmlFor="digitCount"
                            tooltip="تعیین حداکثر تعداد ارقام برای اعداد در محاسبات"
                        >
                            تعداد ارقام اعداد
                        </FieldLabel>
                        <div className="relative w-full">
                            <NumberInput
                                id="digitCount"
                                value={settings.digitCount}
                                onChange={(e) => updateSetting('digitCount', parseInt(e.toString()))}
                                min={LIMITS.digitCount.min}
                                max={LIMITS.digitCount.max}
                                step={1}
                                className="w-full min-w-[120px]"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <Info className="h-3 w-3 sm:h-4 sm:w-4"/>
                            محدوده مجاز: {LIMITS.digitCount.min} تا {LIMITS.digitCount.max}
                        </p>
                    </div>

                    {/* ورودی دوم */}
                    <div className="space-y-2">
                        <FieldLabel
                            htmlFor="rowCount"
                            tooltip="تعیین تعداد کل سوالات آزمون"
                        >
                            تعداد سوال
                        </FieldLabel>
                        <div className="relative w-full">
                            <NumberInput
                                id="rowCount"
                                value={settings.rowCount}
                                onChange={(e) => updateSetting('rowCount', parseInt(e.toString()))}
                                min={LIMITS.rowCount.min}
                                max={LIMITS.rowCount.max}
                                step={1}
                                className="w-full min-w-[120px]"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <Info className="h-3 w-3 sm:h-4 sm:w-4"/>
                            محدوده مجاز: {LIMITS.rowCount.min} تا {LIMITS.rowCount.max}
                        </p>
                    </div>

                    {/* ورودی سوم */}
                    <div className="space-y-2">
                        <FieldLabel
                            htmlFor="itemsPerRow"
                            tooltip="تعیین تعداد اعداد در هر سطر"
                        >
                            تعداد آیتم
                        </FieldLabel>
                        <div className="relative w-full">
                            <NumberInput
                                id="itemsPerRow"
                                value={settings.itemsPerRow}
                                onChange={(e) => updateSetting('itemsPerRow', parseInt(e.toString()))}
                                min={LIMITS.itemsPerRow.min}
                                max={LIMITS.itemsPerRow.max}
                                step={1}
                                className="w-full min-w-[120px]"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <Info className="h-3 w-3 sm:h-4 sm:w-4"/>
                            محدوده مجاز: {LIMITS.itemsPerRow.min} تا {LIMITS.itemsPerRow.max}
                        </p>
                    </div>

                    {/* ورودی چهارم */}
                    <div className="space-y-2">
                        <FieldLabel
                            htmlFor="timeLimit"
                            tooltip="تعیین مدت زمان کل آزمون به دقیقه"
                        >
                            مدت زمان آزمون
                        </FieldLabel>
                        <div className="relative w-full">
                            <NumberInput
                                id="timeLimit"
                                value={settings.timeLimit / 60}
                                onChange={(e) => updateSetting('timeLimit', parseInt(e.toString()) * 60)}
                                min={LIMITS.timeLimit.min}
                                max={LIMITS.timeLimit.max}
                                step={1}
                                className="w-full min-w-[120px]"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <Info className="h-3 w-3 sm:h-4 sm:w-4"/>
                            محدوده مجاز: {LIMITS.timeLimit.min} تا {LIMITS.timeLimit.max} دقیقه
                        </p>
                    </div>
                </div>
            </div>



            {/* بخش چک‌باکس‌ها */}
            <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg text-slate-700 mb-4">عملگرهای مجاز</h3>
                <div className="grid grid-cols-2 gap-6">
                    {(['+', '-', '*', '/'] as Operator[]).map((op) => (
                        <div key={op} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <CheckboxM
                                id={`op-${op}`}
                                checked={settings.operators.includes(op)}
                                onCheckedChange={() => toggleOperator(op)}
                            />
                            <Label
                                htmlFor={`op-${op}`}
                                className="text-sm font-medium cursor-pointer"
                            >
                                {OPERATOR_LABELS[op]}
                            </Label>
                        </div>
                    ))}
                </div>
          </div>

          <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold rounded-xl"
          >
            شروع آزمون
          </Button>
        </form>
      </Card>
  );
}

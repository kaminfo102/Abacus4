"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface TimeoutAlertProps {
  onClose: () => void;
}

export function TimeoutAlert({ onClose }: TimeoutAlertProps) {
  return (
    <Alert className="mt-4 bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-600">پایان زمان آزمون</AlertTitle>
      <AlertDescription className="text-yellow-700">
        زمان تعیین شده برای آزمون به پایان رسیده است. نتیجه آزمون بر اساس پاسخ‌های ثبت شده محاسبه می‌شود.
      </AlertDescription>
    </Alert>
  );
} 
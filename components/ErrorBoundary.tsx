"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-lg">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>خطای غیرمنتظره</AlertTitle>
            <AlertDescription>
              متأسفانه خطایی رخ داده است. لطفاً صفحه را مجدداً بارگذاری کنید.
            </AlertDescription>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              بارگذاری مجدد
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
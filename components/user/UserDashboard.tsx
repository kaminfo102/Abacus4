"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { UserProfile } from "./UserProfile";
import { UserExams } from "./UserExams";

export function UserDashboard() {
  const [user] = useState({
    name: "کاربر نمونه",
    term: "3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    email: "user@example.com"
  });

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfile user={user} />
        </div>
        <div className="md:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">آزمون‌های ترم {user.term}</h2>
            <UserExams term={user.term} />
          </Card>
        </div>
      </div>
    </div>
  );
}
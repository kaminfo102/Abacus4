"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserProfileProps {
  user: {
    name: string;
    term: string;
    avatar: string;
    email: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        
        <div className="mt-4 w-full">
          <div className="bg-primary/10 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">ترم تحصیلی</p>
            <p className="text-lg font-bold text-primary">ترم {user.term}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
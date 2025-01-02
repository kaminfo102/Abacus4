"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export function StudentInfo() {
  return (
    <div className="mb-8">
      <h2 className="text-right mb-4 font-semibold text-lg text-primary">مشخصات فراگیر:</h2>
      <div className="overflow-x-auto">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="bg-primary/10">
              <TableHead className="text-right font-bold">نام و نام خانوادگی</TableHead>
              <TableHead className="text-right font-bold">نام مربی</TableHead>
              <TableHead className="text-right font-bold">ترم</TableHead>
              <TableHead className="text-right font-bold">تاریخ</TableHead>
              <TableHead className="text-right font-bold">زمان</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><Input className="w-full" /></TableCell>
              <TableCell><Input className="w-full" /></TableCell>
              <TableCell><Input className="w-full" /></TableCell>
              <TableCell><Input className="w-full" /></TableCell>
              <TableCell><Input className="w-full" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
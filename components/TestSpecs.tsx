"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export function TestSpecs() {
  return (
    <div className="mb-8">
      <h2 className="text-right mb-4 font-semibold text-lg text-primary">مشخصات آزمون:</h2>
      <div className="overflow-x-auto">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="bg-primary/10">
              <TableHead className="text-center font-bold">Final</TableHead>
              <TableHead className="text-center font-bold">Listening</TableHead>
              <TableHead className="text-center font-bold">Mental</TableHead>
              <TableHead className="text-center font-bold">Abacuse</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">۱۰ دقیقه</TableCell>
              <TableCell className="text-center">۱۰ دقیقه</TableCell>
              <TableCell className="text-center">۴۰ دقیقه</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Input className="text-center w-full" /></TableCell>
              <TableCell><Input className="text-center w-full" /></TableCell>
              <TableCell><Input className="text-center w-full" /></TableCell>
              <TableCell><Input className="text-center w-full" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentEmployees = [
    {
        id: '1',
        name: 'علی محمدی',
        department: 'منابع انسانی',
        startDate: '۱۴۰۲/۱۲/۱۵',
        image: 'https://i.pravatar.cc/150?img=1',
    },
    {
        id: '2',
        name: 'مریم احمدی',
        department: 'فروش',
        startDate: '۱۴۰۲/۱۲/۱۰',
        image: 'https://i.pravatar.cc/150?img=2',
    },
    {
        id: '3',
        name: 'رضا کریمی',
        department: 'فنی',
        startDate: '۱۴۰۲/۱۲/۰۵',
        image: 'https://i.pravatar.cc/150?img=3',
    },
    {
        id: '4',
        name: 'سارا رضایی',
        department: 'مالی',
        startDate: '۱۴۰۲/۱۲/۰۱',
        image: 'https://i.pravatar.cc/150?img=4',
    },
];

export function RecentEmployees() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>دپارتمان</TableHead>
                    <TableHead>تاریخ شروع</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {recentEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={employee.image} alt={employee.name} />
                                    <AvatarFallback>
                                        {employee.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                {employee.name}
                            </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.startDate}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
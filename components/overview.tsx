'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
    {
        name: 'فروردین',
        total: 174,
    },
    {
        name: 'اردیبهشت',
        total: 169,
    },
    {
        name: 'خرداد',
        total: 171,
    },
    {
        name: 'تیر',
        total: 175,
    },
    {
        name: 'مرداد',
        total: 172,
    },
    {
        name: 'شهریور',
        total: 170,
    },
];

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{
                        background: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                    }}
                    cursor={{ fill: 'hsl(var(--accent))' }}
                />
                <Bar
                    dataKey="total"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
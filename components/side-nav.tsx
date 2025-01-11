'use client';

import { cn } from '@/lib/utils';
import {
    Users,
    Building2,
    GraduationCap,
    DollarSign,
    BarChart,
    Settings,
    HelpCircle,
    ChevronRight,
    Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const sidebarItems = [
    {
        title: 'داشبورد',
        href: '/',
        icon: BarChart,
    },
    {
        title: 'آموزش‌ها',
        href: '/admin/exam',
        icon: GraduationCap,
    },
    {
        title: 'کارمندان',
        href: '/employees',
        icon: Users,
    },
    {
        title: 'دپارتمان‌ها',
        href: '/departments',
        icon: Building2,
    },

    {
        title: 'حقوق و دستمزد',
        href: '/payroll',
        icon: DollarSign,
    },
    {
        title: 'تنظیمات',
        href: '/settings',
        icon: Settings,
    },
];

export function SideNav() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={cn(
            "relative pb-12 transition-all duration-300 ease-in-out border-l bg-gradient-to-b from-card to-card/95 backdrop-blur-sm",
            isCollapsed ? "w-20" : "w-72"
        )}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -left-3 top-6 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg hover:bg-primary/90 transition-colors"
            >
                <Menu className="h-4 w-4" />
            </button>

            <div className="space-y-4 py-4 h-full flex flex-col">
                <div className="px-3 py-2">
                    <div className={cn(
                        "mb-8 px-4 transition-all duration-300",
                        isCollapsed && "text-center"
                    )}>
                        <h2 className={cn(
                            "text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text transition-all duration-300",
                            isCollapsed && "text-sm"
                        )}>
                            {isCollapsed ? "HRM" : "سیستم منابع انسانی"}
                        </h2>
                    </div>

                    <div className="space-y-1">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 relative overflow-hidden',
                                    pathname === item.href
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:text-primary hover:bg-accent',
                                )}
                            >
                                <div className={cn(
                                    "flex items-center gap-3 relative z-10",
                                    isCollapsed && "justify-center w-full"
                                )}>
                                    <item.icon className={cn(
                                        "h-5 w-5 transition-transform duration-200",
                                        pathname === item.href && "rotate-6"
                                    )} />
                                    {!isCollapsed && (
                                        <>
                                            <span>{item.title}</span>
                                            {pathname === item.href && (
                                                <ChevronRight className="h-4 w-4 mr-auto animate-bounce-right" />
                                            )}
                                        </>
                                    )}
                                </div>
                                {pathname === item.href && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-shine" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-auto px-3 py-2">
                    {!isCollapsed && (
                        <div className="rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 p-4 backdrop-blur-sm border border-primary/10 shadow-inner">
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-primary" />
                                <h4 className="text-sm font-semibold text-primary">نیاز به کمک دارید؟</h4>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                                برای راهنمایی بیشتر با پشتیبانی تماس بگیرید
                            </p>
                            <button className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground hover:bg-primary/90 transition-colors hover:shadow-lg active:scale-95 transform duration-200">
                                تماس با پشتیبانی
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

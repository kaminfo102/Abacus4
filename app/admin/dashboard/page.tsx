// app/admin/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.push('/login');
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold">پنل مدیریت</h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                خروج
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold mb-4">خوش آمدید ادمین</h2>
                    {/* محتوای داشبورد ادمین */}
                </div>
            </main>
        </div>
    );
}

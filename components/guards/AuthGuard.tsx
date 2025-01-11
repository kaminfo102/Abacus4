// components/guards/AuthGuard.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardProps {
    children: ReactNode;
    allowedRoles?: ('admin' | 'student')[];
}

export default function AuthGuard({ children, allowedRoles = ['admin'] }: AuthGuardProps) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (!allowedRoles.includes(user.role)) {
            if (user.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/student/dashboard');
            }
        }
    }, [user, allowedRoles]);

    if (!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}

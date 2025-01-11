// lib/withAuth.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';

export function withAuth(
    WrappedComponent: ComponentType<any>,
    allowedRoles: ('admin' | 'student')[] = ['admin']
) {
    return function AuthenticatedComponent(props: any) {
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
        }, [user]);

        if (!user || !allowedRoles.includes(user.role)) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}

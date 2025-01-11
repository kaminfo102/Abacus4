// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push('/login');
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.role === 'admin') {
            router.push('/admin/dashboard');
        } else {
            router.push('/student/dashboard');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

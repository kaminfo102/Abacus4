// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
    title: 'ارزیابی پایان ترم محاسبات ذهنی',
    description: 'فرم ارزیابی پایان ترم محاسبات ذهنی با چرتکه',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl">
        <head>
            <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    );
}

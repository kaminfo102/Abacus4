// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const user = request.cookies.get('user')?.value;
    const path = request.nextUrl.pathname;

    if (!user && path !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (user) {
        const userData = JSON.parse(user);

        if (path.startsWith('/admin') && userData.role !== 'admin') {
            return NextResponse.redirect(new URL('/student/dashboard', request.url));
        }

        if (path.startsWith('/student') && userData.role !== 'student') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/student/:path*', '/login']
};

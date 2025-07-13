import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === '/' || path.startsWith('/api/auth') || path.startsWith('/api/sendotp') || path.startsWith('/api/verifyotp') || path.startsWith('/api/signin') || path.startsWith('/api/testotp');

    // Get token from cookies or headers
    const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');

    // If the path is public, allow access
    if (isPublicPath) {
        return NextResponse.next();
    }

    // If no token and trying to access protected route, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Add user info to request headers for use in API routes
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', decoded.userId);
        requestHeaders.set('x-user-email', decoded.email);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        // Invalid token, redirect to login
        console.error('Token verification failed:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: [
     
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}; 
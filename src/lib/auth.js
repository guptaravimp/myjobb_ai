import jwt from 'jsonwebtoken';

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        return { valid: true, payload: decoded };
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

export function getTokenFromRequest(request) {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    // Try to get token from cookies
    const cookies = request.headers.get('cookie');
    if (cookies) {
        const tokenMatch = cookies.match(/token=([^;]+)/);
        if (tokenMatch) {
            return tokenMatch[1];
        }
    }

    return null;
}

export function requireAuth(request) {
    const token = getTokenFromRequest(request);
    
    if (!token) {
        throw new Error('No token provided');
    }

    const { valid, payload, error } = verifyToken(token);
    
    if (!valid) {
        throw new Error(`Invalid token: ${error}`);
    }

    return payload;
} 
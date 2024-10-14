import { NextResponse } from 'next/server';

export function middleware(req) {
	const token = req.cookies.get('authToken');
	const url = req.nextUrl.pathname;

	// Excluir las rutas estáticas de _next y public
	if (url.startsWith('/_next') || url.startsWith('/static')) {
		return NextResponse.next();
	}

	// Permitir el acceso a '/' y '/register' sin autenticación
	if (url === '/' || url.startsWith('/register')) {
		return NextResponse.next();
	}

	// Si no hay un token de autenticación, redirigir al login
	if (!token) {
		return NextResponse.redirect(new URL('/?message=loginRequired', req.url));
	}

	// Continuar con la solicitud si el token está presente
	return NextResponse.next();
}

// Configuración del middleware para aplicarlo a todas las rutas
export const config = {
	matcher: ['/:path*'], // Aplica el middleware a todas las rutas
};

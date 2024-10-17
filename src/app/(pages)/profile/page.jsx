'use client';
import { usePathname } from 'next/navigation';

export default function Page() {
	const pathname = usePathname(); // Get the current route path

	return (
		<div>
			<h1>Página de perfil protegida</h1>
			<p>Bienvenido, usuario. Estás en la ruta: {pathname}</p>
		</div>
	);
}

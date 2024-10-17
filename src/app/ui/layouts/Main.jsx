'use client';

import { LoadingProvider } from '@/app/contexts/loadingContext';
import Footer from './Footer';
import NavBar from './NavBar';
import { AuthProvider } from '@/app/contexts/sessionContext';

export default function Main({ children }) {
	return (
		<LoadingProvider>
			<AuthProvider>
				<header className='sticky top-0 z-10'>
					<NavBar />
				</header>
				<main className='bg-white flex-1 flex justify-center items-start w-full h-full'>
					{children}
				</main>
				<Footer />
			</AuthProvider>
		</LoadingProvider>
	);
}

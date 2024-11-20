'use client';

import { LoadingProvider } from '@/app/contexts/loadingContext';
import Footer from './Footer';
import NavBar from './NavBar';
import { AuthProvider } from '@/app/contexts/sessionContext';
import { RolProvider } from '@/app/contexts/rolContext';
import { NotificationsProvider } from '../../contexts/notificationsContext';

export default function Main({ children }) {
	return (
		<LoadingProvider>
			<AuthProvider>
				<RolProvider>
					<NotificationsProvider>
						<header className='sticky top-0 z-10'>
							<NavBar />
						</header>
						<main className='bg-white flex-1 flex justify-center items-start w-full h-full max-w-[1200px] mx-auto'>
							{children}
						</main>
						<Footer />
					</NotificationsProvider>
				</RolProvider>
			</AuthProvider>
		</LoadingProvider>
	);
}

import localFont from 'next/font/local';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import Main from './ui/layouts/Main';
import { Suspense } from 'react';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata = {
	title: 'WheelUS',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className='min-h-screen flex flex-col justify-between'>
					<Main>
						<Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
					</Main>
				</div>
			</body>
		</html>
	);
}

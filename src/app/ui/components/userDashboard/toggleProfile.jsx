import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function toggleProfile() {
	const router = useRouter();
	const pathname = usePathname();
	const toggle = () => {
		if (pathname === '/dashboard') {
			router.push('/carRegister');
		} else if (pathname === '/driverDashboard') {
			router.push('/dashboard');
		}
	};
	return (
		<div className='bg-white flex rounded-full p-[2px] w-fit'>
			<button
				onClick={toggle}
				className='w-fit flex items-center justify-center p-2 bg-[#025C31] rounded-full gap-1 sm:gap-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='w-5 h-5 sm:w-10 sm:h-10'
					viewBox='0 0 24 24'
				>
					<path
						fill='white'
						d='M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 9h-4V7h-2v4H7v2h4v4h2v-4h4z'
					/>
				</svg>
				<p className='text-sm sm:text-lg'>Añadir vehiculo</p>
			</button>
		</div>
	);
}

'use client';
import { useState } from 'react';
import { useAuth } from '@/app/contexts/sessionContext';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/images/logo.png';
import ProfilePhoto from '../components/navbar/profilePhoto';
import ToggleProfile from '../components/userDashboard/toggleProfile';
import AsideMenu from '../components/navbar/AsideMenu';
import CarPhoto from '../components/navbar/CarProfile';

export default function NavBar() {
	const { user, signout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	let car = null;
	if (user?.vehicle_plate && user.vehicle_plate !== null) {
		car = user.vehicle_plate;
	}

	const toggleMenu = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	return (
		<div className='bg-[#028747] text-white p-4 flex justify-between items-center shadow-lime-950 shadow-md'>
			<AsideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			{(user &&
				(pathname === '/dashboard' ||
					pathname === '/profile' ||
					pathname === '/reservations') && (
					<Menu
						className='w-9 h-9 sm:w-12 sm:h-12 border-2 rounded-lg hover:bg-[#025C31] cursor-pointer'
						onClick={toggleMenu}
					/>
				)) || <div></div>}

			{(pathname === '/' ||
				pathname === '/register' ||
				pathname === '/carRegister' ||
				pathname === '/carProfile' ||
				pathname === '/routeRegister') && (
				<div className='flex w-full justify-center items-center gap-3 font-semibold text-xl sm:text-5xl'>
					<Image
						src={logo}
						alt='Logo Wheel US'
						className='w-[33px] h-[33px] sm:w-[64px] sm:h-[64px]'
					/>
					WHEEL US
				</div>
			)}
			{user &&
				(pathname === '/dashboard' ||
					pathname === '/reservations' ||
					pathname === '/driverDashboard' ||
					pathname === '/routesDriver') && <ToggleProfile vehicle={car} />}
			{(user && (pathname === '/dashboard' || pathname === '/reservations') && (
				<ProfilePhoto signout={signout} user={user} />
			)) ||
				(pathname === '/driverDashboard' && <CarPhoto />) || <div></div>}
		</div>
	);
}

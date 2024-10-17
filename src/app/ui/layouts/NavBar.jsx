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

export default function NavBar() {
	const { user, signout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const toggleMenu = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	return (
		<div className='bg-[#028747] text-white p-4 flex justify-between items-center shadow-lime-950 shadow-md'>
			<AsideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			{user && (
				<Menu
					className='w-9 h-9 sm:w-12 sm:h-12 border-2 rounded-lg hover:bg-[#025C31] cursor-pointer'
					onClick={toggleMenu}
				/>
			)}

			{!user && pathname === '/' && (
				<div className='flex w-full justify-center items-center gap-3 font-semibold text-xl sm:text-5xl'>
					<Image
						src={logo}
						alt='Logo Wheel US'
						className='w-[33px] h-[33px] sm:w-[64px] sm:h-[64px]'
					/>
					WHEEL US
				</div>
			)}
			{user && <ToggleProfile />}
			{user && <ProfilePhoto signout={signout} user={user} />}
		</div>
	);
}

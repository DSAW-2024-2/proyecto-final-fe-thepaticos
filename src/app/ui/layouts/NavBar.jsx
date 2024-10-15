import { useAuth } from '@/app/contexts/sessionContext';
import { Link, Menu } from 'lucide-react';
import Image from 'next/image';
import logo from '/public/images/logo.png';

import ProfilePhoto from '../components/navbar/profilePhoto';
import next from 'next';

export default function NavBar() {
	const { user, signout } = useAuth();
	return (
		<div className='bg-[#028747] text-white p-4 flex justify-center items-center shadow-lime-950 shadow-md'>
			{user && <Menu />}
			<div className='flex justify-center items-center gap-3 font-semibold text-4xl sm:text-6xl'>
				<Image
					src={logo}
					alt='Logo Wheel US'
					className='w-[33px] h-[33px] sm:w-[64px] sm:h-[64px]'
				/>
				WHEEL US
			</div>
			{user && <ProfilePhoto signout={signout} />}
		</div>
	);
}

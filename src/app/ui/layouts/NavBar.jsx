import { useAuth } from '@/app/contexts/sessionContext';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import logo from '/public/images/logo.png';

import ProfilePhoto from '../components/navbar/profilePhoto';

export default function NavBar() {
	const { user, signout } = useAuth();
	return (
		<div className='bg-[#028747] text-white p-4 flex justify-between items-center shadow-lime-950 shadow-md'>
			{user && (
				<Menu className='w-12 h-10 border-2 rounded-lg hover:bg-[#025C31]' />
			)}
			<div className='flex w-full justify-center items-center gap-3 font-semibold text-xl sm:text-5xl'>
				<Image
					src={logo}
					alt='Logo Wheel US'
					className='w-[33px] h-[33px] sm:w-[64px] sm:h-[64px]'
				/>
				WHEEL US
			</div>
			{user && <ProfilePhoto signout={signout} user={user} />}
		</div>
	);
}

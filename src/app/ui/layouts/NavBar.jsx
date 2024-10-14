import { useAuth } from '@/app/contexts/sessionContext';
import { Link, Menu } from 'lucide-react';
import Image from 'next/image';
import logo from '/public/images/logo.png';

import ProfilePhoto from '../components/navbar/profilePhoto';
import next from 'next';

export default function NavBar() {
	const { user, signout } = useAuth();
	return (
		<div className='bg-[#028747] text-white p-4 flex justify-center items-center'>
			{user && <Menu />}
			<div className='flex justify-center items-center gap-3 font-semibold text-4xl'>
				<Image 
					src = {logo}
					alt = 'Logo Wheel US'
					width = {33}
					height={33}
				/>
				WHEEL US
			</div>
			{user && <ProfilePhoto signout={signout} />}
		</div>
	);
}

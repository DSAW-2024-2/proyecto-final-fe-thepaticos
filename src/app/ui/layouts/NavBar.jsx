import { useAuth } from '@/app/contexts/sessionContext';
import { Menu } from 'lucide-react';

import ProfilePhoto from '../components/navbar/profilePhoto';

export default function NavBar() {
	const { user, signout } = useAuth();
	return (
		<div className='bg-green-600 text-white text-center p-4 text-2xl font-bold flex flex-row justify-between'>
			{user && <Menu />}
			<div>WHEEL US</div>
			{user && <ProfilePhoto signout={signout} />}
		</div>
	);
}

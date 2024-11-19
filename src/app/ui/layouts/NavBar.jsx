import { useAuth } from '@/app/contexts/sessionContext';
import { getVehicleByPlate } from '@/app/helpers/api/vehicles';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import AsideMenu from '../components/navbar/AsideMenu';
import CarPhoto from '../components/navbar/CarProfile';
import ProfilePhoto from '../components/navbar/profilePhoto';
import ToggleProfile from '../components/userDashboard/toggleProfile';
import logo from '/public/images/logo.png';

export default function NavBar() {
	const { user, signout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [car, setCar] = useState(null);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	useEffect(() => {
		const fetchCar = async () => {
			setLoading(true);
			if (user && 'vehicle_plate' in user) {
				const fetchedCar = await getVehicleByPlate(user.vehicle_plate);
				setCar(fetchedCar);
			} else {
				setCar(null);
			}
			setLoading(false);
		};
		fetchCar();
	}, [user]);

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
				)) || <div className='w-9 h-9 sm:w-12 sm:h-12'></div>}
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

			{loading ? (
				<BeatLoader />
			) : (
				user &&
				(pathname === '/dashboard' ||
					pathname === '/driverDashboard' ||
					pathname === '/routesDriver') && <ToggleProfile vehicle={car} />
			)}
			{user && (pathname === '/dashboard' || pathname === '/reservations') && (
				<ProfilePhoto signout={signout} user={user} />
			)}
			{pathname === '/driverDashboard' && (
				<CarPhoto signout={signout} vehicle={car} />
			)}
		</div>
	);
}

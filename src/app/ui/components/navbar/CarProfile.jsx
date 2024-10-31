import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/sessionContext';
import { getVehicleByPlate } from '@/app/helpers/api/vehicles';

export default function CarPhoto({ signout, vehicle }) {
	const [showMenu, setShowMenu] = useState(false);
	const dropdownRef = useRef(null);
	const router = useRouter();
	const { user } = useAuth();
	const [car, setCar] = useState(vehicle); // Change initial state to null
	const [loading, setLoading] = useState(true); // Add loading state

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};

		if (showMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showMenu]);

	const goToProfile = () => {
		router.push('/carProfile');
	};

	useEffect(() => {
		if (user?.vehicle_plate) {
			const fetchCar = async () => {
				setLoading(true);
				const fetchedCar = await getVehicleByPlate(user.vehicle_plate);
				setCar(fetchedCar);
				setLoading(false);
			};
			fetchCar();
		}
	}, [user]);

	return (
		<div
			className='relative inline-block'
			ref={dropdownRef}
			onClick={toggleMenu}
		>
			{
				<Image
					src={vehicle?.photo || '/images/anonym.png'}
					alt='Imagen perfil conductor'
					className='rounded-full object-cover max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] border-2 sm:min-w-[70px] sm:max-w-[70px] sm:min-h-[70px] sm:max-h-[70px] cursor-pointer sm:border-2'
					width={500}
					height={500}
					priority
				/>
			}
			<div
				className={`absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden shadow-black ${
					showMenu ? 'block' : 'hidden'
				}`}
			>
				<button
					className='py-2 w-full text-black flex justify-start px-4 font-semibold hover:bg-[#D9D9D9] transition duration-200 ease-in-out'
					onClick={signout}
				>
					Cerrar Sesión
				</button>
				<button
					className='py-2 w-full text-black flex justify-start px-4 font-semibold hover:bg-[#D9D9D9] transition duration-200 ease-in-out'
					onClick={goToProfile}
				>
					Mi Vehículo
				</button>
			</div>
		</div>
	);
}

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfilePhoto({ signout }) {
	const [showMenu, setShowMenu] = useState(false);
	const dropdownRef = useRef(null);
	const router = useRouter();

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

	return (
		<div className='relative inline-block' ref={dropdownRef}>
			<Image
				src={'/images/anonym.png'}
				alt='Picture of the author'
				width={500}
				height={500}
				className='rounded-full object-cover max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] border-2 sm:min-w-[70px] sm:max-w-[70px] sm:min-h-[70px] sm:max-h-[70px] cursor-pointer sm:border-2'
				onClick={toggleMenu}
			/>
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

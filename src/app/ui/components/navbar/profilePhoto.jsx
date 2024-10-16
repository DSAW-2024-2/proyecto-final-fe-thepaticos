import { useState } from 'react';
import Image from 'next/image';
export default function ProfilePhoto({ signout, user }) {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className='relative inline-block'>
			<Image
				src={user.photo || '/images/anonym.png'}
				alt='Picture of the author'
				width='64'
				height='64'
				className='rounded-full w-10 h-10 cursor-pointer border-2'
				onClick={toggleMenu}
			/>
			<div
				className={`absolute right-0 mt-2 w-52 bg-white shadow-md rounded-md ${
					showMenu ? 'block' : 'hidden'
				}`}
			>
				<button
					className='py-2 w-full text-black font-normal hover:bg-gray-100 transition duration-200 ease-in-out'
					onClick={signout}
				>
					Cerrar sesión
				</button>
				<button className='py-2 w-full text-black font-normal hover:bg-gray-100 transition duration-200 ease-in-out'>
					Modificar perfil
				</button>
				<button className='py-2 w-full text-black font-normal hover:bg-gray-100 transition duration-200 ease-in-out'>
					Mis viajes
				</button>
			</div>
		</div>
	);
}

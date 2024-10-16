import { useEffect, useRef } from 'react';
import Image from 'next/image';
import LogoAndName from '/public/images/logo&name.png';

export default function AsideMenu({ isMenuOpen, toggleMenu }) {
	const asideRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (asideRef.current && !asideRef.current.contains(event.target)) {
				toggleMenu();
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen, toggleMenu]);

	return (
		<aside
			ref={asideRef}
			className={`fixed top-0 left-0 w-64 h-full bg-[#025C31] text-white p-4 z-50 transform ${
				isMenuOpen
					? 'translate-x-0  shadow-black shadow-2xl'
					: '-translate-x-full'
			} transition-transform duration-300 ease-in-out`}
		>
			<section className='w-full flex justify-center items-center my-4'>
				<div className='w-fit h-fit border-2 border-white rounded-full'>
					<Image
						className='w-[80px] h-[80px] m-4'
						src={LogoAndName}
						alt='Logo Wheel US'
					/>
				</div>
			</section>
			<h2 className='text-3xl font-semibold flex justify-center uppercase h-fit'>
				Menu
			</h2>
			<div className='h-[2px] w-full bg-white rounded-full my-4'></div>
			<ul className='space-y-4'>
				<button className='bg-white text-black flex justify-center items-center font-semibold p-3 rounded-full w-full'>
					Mis Viajes
				</button>
			</ul>
			<button
				className='absolute top-4 right-4 text-white'
				onClick={toggleMenu}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='w-10 h-10 hover:opacity-50'
					viewBox='0 0 24 24'
				>
					<path
						fill='white'
						d='M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3m-3.29 10.29a1 1 0 0 1 0 1.42a1 1 0 0 1-1.42 0L12 13.41l-1.29 1.3a1 1 0 0 1-1.42 0a1 1 0 0 1 0-1.42l1.3-1.29l-1.3-1.29a1 1 0 0 1 1.42-1.42l1.29 1.3l1.29-1.3a1 1 0 0 1 1.42 1.42L13.41 12Z'
					/>
				</svg>
			</button>
		</aside>
	);
}

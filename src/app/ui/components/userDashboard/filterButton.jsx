import React, { useState, useEffect, useRef } from 'react';
import FilterSubMenu from './filterSubMenu';

export default function FilterButton() {
	const [isOriginMenuVisible, setOriginMenuVisible] = useState(false);
	const [isDestinationMenuVisible, setDestinationMenuVisible] = useState(false);
	const [isCapacityMenuVisible, setCapacityMenuVisible] = useState(false);
	const originButtonRef = useRef(null);
	const destinationButtonRef = useRef(null);
	const capacityButtonRef = useRef(null);

	const toggleOriginMenu = () => {
		setOriginMenuVisible(!isOriginMenuVisible);
		setDestinationMenuVisible(false);
		setCapacityMenuVisible(false);
	};

	const toggleDestinationMenu = () => {
		setDestinationMenuVisible(!isDestinationMenuVisible);
		setOriginMenuVisible(false);
		setCapacityMenuVisible(false);
	};

	const toggleCapacityMenu = () => {
		setCapacityMenuVisible(!isCapacityMenuVisible);
		setOriginMenuVisible(false);
		setDestinationMenuVisible(false);
	};

	const closeAllMenus = () => {
		setOriginMenuVisible(false);
		setDestinationMenuVisible(false);
		setCapacityMenuVisible(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				originButtonRef.current &&
				!originButtonRef.current.contains(event.target) &&
				destinationButtonRef.current &&
				!destinationButtonRef.current.contains(event.target) &&
				capacityButtonRef.current &&
				!capacityButtonRef.current.contains(event.target)
			) {
				closeAllMenus();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative w-fit py-5 flex justify-around items-center gap-2 sm:gap-5'>
			{/* Origin Button */}
			<button
				ref={originButtonRef}
				onClick={toggleOriginMenu}
				className='bg-[#028747] hover:bg-[#025C31] text-white text-xs sm:text-lg font-semibold rounded-full px-3 py-1 flex items-center justify-center gap-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-[20px] w-[20px] sm:h-[33px] sm:w-[33px]'
					viewBox='0 0 64 64'
				>
					<path
						fill='white'
						d='M62.3 43.9c0-5.5-4.3-9.8-9.8-9.8s-9.9 4.4-9.9 9.8c0 3.2 3.2 8.8 5.6 12.6H18.6c-1.4 0-2.8-.6-3.8-1.6c-1.3-1.3-1.8-3.1-1.4-5c.5-2.4 2.8-4.2 5.5-4.2h9.9c2.6 0 5.1-1 7-2.9c2.7-2.7 3.6-6.6 2.3-10.3c-1.3-3.9-5.1-6.6-9.5-6.6H15.8c2.4-3.9 5.7-9.8 5.7-13.1c0-5.5-4.3-9.8-9.8-9.8s-9.9 4.4-9.9 9.8c0 4.6 6.7 14.6 8 16.6l.3.3l.1.1c.1.1.2.1.3.2l.1.1c.1.1.2.1.3.1h.1c.2 0 .3.1.5.1h17c2.4 0 4.5 1.4 5.2 3.5s.2 4.2-1.3 5.7c-1 1-2.3 1.6-3.8 1.6h-9.9c-4.9 0-9 3.3-9.9 7.8c-.7 3.3.3 6.7 2.7 9c1.9 1.9 4.3 2.9 7 2.9h33.8c.2 0 .3 0 .5-.1h.1c.1 0 .2-.1.3-.1s.1-.1.2-.1c.1-.1.2-.1.3-.2l.1-.1c.1-.1.2-.2.2-.3c0 0 .1 0 .1-.1c1.5-1.6 8.2-11.2 8.2-15.9M11.7 7.5c3 0 5.3 2.3 5.3 5.3c0 1.9-2.7 7-5.3 11.2c-2.7-4.2-5.4-9.2-5.4-11.2c0-2.9 2.4-5.3 5.4-5.3m40.7 31.1c3 0 5.3 2.3 5.3 5.3c0 1.9-2.7 6.8-5.4 10.8c-2.6-4-5.4-8.9-5.4-10.8c.1-2.9 2.5-5.3 5.5-5.3'
					/>
					<path
						fill='white'
						d='M13.9 12.7c0-.6-.2-1.2-.6-1.6c-.8-.8-2.4-.8-3.2 0l-.3.3c-.1.1-.1.3-.2.4s-.1.3-.1.4v.8c0 .1.1.3.1.4s.1.3.2.4l.3.3c.4.4 1 .7 1.6.7s1.2-.2 1.6-.7c.3-.2.6-.8.6-1.4M54 45.9c.4-.4.7-1 .7-1.6s-.2-1.2-.7-1.6l-.3-.3c-.1-.1-.3-.1-.4-.2c-.1 0-.3-.1-.4-.1H52c-.1 0-.3.1-.4.1c-.1.1-.3.1-.4.2l-.3.3c-.4.4-.7 1-.7 1.6s.2 1.2.7 1.6l.3.3c.1.1.3.1.4.2c.1 0 .3.1.4.1h.4c.6 0 1.2-.2 1.6-.6'
					/>
				</svg>
				Origen
			</button>

			<FilterSubMenu
				optionsMenu={['U. Sabana', 'Av. 127']}
				Visible={isOriginMenuVisible}
				horizontalMove={'left-0'}
			/>

			{/* Destination Button */}
			<button
				ref={destinationButtonRef}
				onClick={toggleDestinationMenu}
				className='bg-[#028747] hover:bg-[#025C31] text-white text-xs sm:text-lg font-semibold rounded-full px-3 py-1 flex items-center justify-center gap-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-[20px] w-[20px] sm:h-[30px] sm:w-[30px] p-[2px]'
					viewBox='0 0 20 20'
				>
					<path
						fill='white'
						d='M10 0a7.65 7.65 0 0 0-8 8c0 2.52 2 5 3 6s5 6 5 6s4-5 5-6s3-3.48 3-6a7.65 7.65 0 0 0-8-8zm0 11a3 3 0 1 1 0-6a3 3 0 0 1 0 6z'
					/>
				</svg>
				Destino
			</button>

			<FilterSubMenu
				optionsMenu={['Bogotá', 'Cota', 'Chía', 'Funza']}
				Visible={isDestinationMenuVisible}
				horizontalMove={'left-[33%]'}
			/>

			{/* Capacity Button */}
			<button
				ref={capacityButtonRef}
				onClick={toggleCapacityMenu}
				className='bg-[#028747] hover:bg-[#025C31] text-white text-xs sm:text-lg font-semibold rounded-full px-3 py-1 flex items-center justify-center gap-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-[20px] w-[20px] sm:h-[33px] sm:w-[33px]'
					viewBox='0 0 24 24'
				>
					<path
						fill='white'
						d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4'
					/>
				</svg>
				Capacidad
			</button>

			<FilterSubMenu
				optionsMenu={['2', '3', '4']}
				Visible={isCapacityMenuVisible}
				horizontalMove={'left-[66%]'}
			/>
		</div>
	);
}

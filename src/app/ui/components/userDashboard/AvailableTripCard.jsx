'use client';
import { getVehicleByPlate } from '@/app/helpers/api/vehicles';
import RouteStop from './routeStop';
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function AvailableTripCard(ride) {
	const [vehicle, setvehicle] = useState({});

	useEffect(() => {
		const getVehicle = async () => {
			try {
				const vehicle = await getVehicleByPlate(ride.ride.vehicle_plate);
				setvehicle(vehicle);
			} catch (error) {
				console.error('Error fetching rides:', error);
			}
		};
		getVehicle();
	}, [ride.ride.vehicle_plate]);
	const dateString = ride.ride.departure;
	const date = new Date(dateString);
	const dateFormat = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};
	const formattedTime = date.toLocaleTimeString('en-US', dateFormat);

	return (
		<div className='flex sm:h-[190px] w-full'>
			<div className='bg-[#D9D9D9] p-[10px] rounded-l-lg gap-[3px] sm:gap-3 flex w-full items-center justify-start border-2 border-[#696C70] border-opacity-50 border-r-0'>
				<Image
					width={400}
					height={400}
					className='h-[60px] w-[60px] object-fill sm:w-[120px] sm:h-[120px] rounded-[5px] border-[2px] border-[#696C70]'
					src={
						vehicle?.photo ||
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfoGbdjDFT0TjduR_2NklrEg6URCrDFb-cQ&s'
					}
					alt='Imagen carro'
					priority
				/>
				<section className='flex flex-col gap-[2px] sm:gap-2 w-full justify-center'>
					<div className='flex gap-[3px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[14px] w-[14px] min-h-[14px] min-w-[14px] sm:w-[30px] sm:h-[30px] sm:min-w-[30px] sm:min-h-[30px]'
							viewBox='0 0 64 64'
						>
							<path
								fill='black'
								d='M62.3 43.9c0-5.5-4.3-9.8-9.8-9.8s-9.9 4.4-9.9 9.8c0 3.2 3.2 8.8 5.6 12.6H18.6c-1.4 0-2.8-.6-3.8-1.6c-1.3-1.3-1.8-3.1-1.4-5c.5-2.4 2.8-4.2 5.5-4.2h9.9c2.6 0 5.1-1 7-2.9c2.7-2.7 3.6-6.6 2.3-10.3c-1.3-3.9-5.1-6.6-9.5-6.6H15.8c2.4-3.9 5.7-9.8 5.7-13.1c0-5.5-4.3-9.8-9.8-9.8s-9.9 4.4-9.9 9.8c0 4.6 6.7 14.6 8 16.6l.3.3l.1.1c.1.1.2.1.3.2l.1.1c.1.1.2.1.3.1h.1c.2 0 .3.1.5.1h17c2.4 0 4.5 1.4 5.2 3.5s.2 4.2-1.3 5.7c-1 1-2.3 1.6-3.8 1.6h-9.9c-4.9 0-9 3.3-9.9 7.8c-.7 3.3.3 6.7 2.7 9c1.9 1.9 4.3 2.9 7 2.9h33.8c.2 0 .3 0 .5-.1h.1c.1 0 .2-.1.3-.1s.1-.1.2-.1c.1-.1.2-.1.3-.2l.1-.1c.1-.1.2-.2.2-.3c0 0 .1 0 .1-.1c1.5-1.6 8.2-11.2 8.2-15.9M11.7 7.5c3 0 5.3 2.3 5.3 5.3c0 1.9-2.7 7-5.3 11.2c-2.7-4.2-5.4-9.2-5.4-11.2c0-2.9 2.4-5.3 5.4-5.3m40.7 31.1c3 0 5.3 2.3 5.3 5.3c0 1.9-2.7 6.8-5.4 10.8c-2.6-4-5.4-8.9-5.4-10.8c.1-2.9 2.5-5.3 5.5-5.3'
							/>
							<path
								fill='black'
								d='M13.9 12.7c0-.6-.2-1.2-.6-1.6c-.8-.8-2.4-.8-3.2 0l-.3.3c-.1.1-.1.3-.2.4s-.1.3-.1.4v.8c0 .1.1.3.1.4s.1.3.2.4l.3.3c.4.4 1 .7 1.6.7s1.2-.2 1.6-.7c.3-.2.6-.8.6-1.4M54 45.9c.4-.4.7-1 .7-1.6s-.2-1.2-.7-1.6l-.3-.3c-.1-.1-.3-.1-.4-.2c-.1 0-.3-.1-.4-.1H52c-.1 0-.3.1-.4.1c-.1.1-.3.1-.4.2l-.3.3c-.4.4-.7 1-.7 1.6s.2 1.2.7 1.6l.3.3c.1.1.3.1.4.2c.1 0 .3.1.4.1h.4c.6 0 1.2-.2 1.6-.6'
							/>
						</svg>
						<RouteStop stops={ride.ride.route} />
					</div>
					<div className='flex gap-[3px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[14px] w-[14px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='black'
								d='M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z'
							/>
						</svg>
						<div className='text-[12px] sm:text-lg font-semibold'>
							{formattedTime}
						</div>
					</div>
					<div className='flex gap-[3px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[14px] w-[14px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 16 16'
						>
							<path
								fill='black'
								d='M10.561 8.073a6 6 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6 6 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0M10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0'
							/>
						</svg>
						<div className='text-[12px] sm:text-lg font-semibold'>
							{ride.ride.available_seats}
						</div>
					</div>
				</section>
			</div>
			<button className='bg-[#028747] rounded-r-lg border-2 border-l-0 border-[#025C31] hover:bg-[#025C31]'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] sm:m-1'
					viewBox='0 0 48 48'
				>
					<g fill='white'>
						<path d='M35 9.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0' />
						<path d='M31.5 11a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7M19 16a2 2 0 1 0 0 4h7v20a2 2 0 1 0 4 0v-9h3v9a2 2 0 1 0 4 0V27.917A6.002 6.002 0 0 0 36 16zm20 6a2 2 0 0 0-2-2v4a2 2 0 0 0 2-2' />
						<path d='M6 32a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm4 7v-6h2v6zm7-6v6h2v-6zm-6-5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2h-2v-2h-3v2h-2z' />
					</g>
				</svg>
			</button>
		</div>
	);
}

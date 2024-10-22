import RouteStop from '../userDashboard/routeStop';
export default function AvailableTripCard({ ride }) {
	const dateString = ride.departure;
	const date = new Date(dateString);
	const dateFormat = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};
	const formattedTime = date.toLocaleTimeString('en-US', dateFormat);
	return (
		<div className='flex h-fit'>
			<div className='bg-[#D9D9D9] p-[3px] rounded-l-lg gap-[3px] sm:gap-3 flex w-full h-fit items-center justify-start border-2 border-[#696C70] border-opacity-50 border-r-0'>
				<section className='flex flex-col gap-[2px] sm:gap-2 w-full justify-center p-2'>
					<div className='flex gap-[3px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[14px] w-[14px] sm:w-[30px] sm:h-[30px]'
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
						<RouteStop stops={ride.route} />
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
							viewBox='0 0 32 32'
						>
							<path
								fill='black'
								d='M16 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0m13.5-1a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M22 7.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m-17 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0M6.5 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m2.151 20.505A3 3 0 0 1 4 22v-6.5a.5.5 0 0 1 .5-.5h4.031a4 4 0 0 1 .846-2H4.5A2.5 2.5 0 0 0 2 15.5V22a5 5 0 0 0 7.327 4.427a7.5 7.5 0 0 1-.676-1.922m14.022 1.922A5 5 0 0 0 30 22v-6.5a2.5 2.5 0 0 0-2.5-2.5h-4.877a4 4 0 0 1 .846 2H27.5a.5.5 0 0 1 .5.5V22a3 3 0 0 1-4.651 2.505a7.5 7.5 0 0 1-.676 1.922M12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5zm-.5 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V23a4 4 0 0 1-8 0z'
							/>
						</svg>
						<div className='text-[12px] sm:text-lg font-semibold'>
							{ride.available_seats}
						</div>
					</div>
				</section>
			</div>
			<button className='bg-[#028747] rounded-r-lg border-2 border-l-0 border-[#025C31] hover:bg-[#025C31]'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-[25px] w-[25px] m-[5px] sm:h-[40px] sm:w-[40px] sm:m-2'
					viewBox='0 0 16 16'
				>
					<path
						fill='white'
						d='M7 4.75c0-.412.338-.75.75-.75h.5c.412 0 .75.338.75.75v.5c0 .412-.338.75-.75.75h-.5A.753.753 0 0 1 7 5.25zM10 12H6v-1h1V8H6V7h3v4h1z'
					/>
					<path
						fill='white'
						d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m0 14.5a6.5 6.5 0 1 1 0-13a6.5 6.5 0 0 1 0 13'
					/>
				</svg>
			</button>
		</div>
	);
}

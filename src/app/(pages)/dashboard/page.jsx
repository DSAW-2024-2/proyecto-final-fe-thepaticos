export default function page() {
	return (
		<main className=' w-full h-fit flex flex-col items-center'>
			<section className='w-fit py-5 flex justify-around items-center gap-2 sm:gap-5'>
				<button className='bg-[#028747] hover:bg-[#025C31] text-white text-xs sm:text-lg font-semibold rounded-full px-3 py-1 flex items-center justify-center gap-2'>
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
				<button className='bg-[#028747] hover:bg-[#025C31] text-white text-xs sm:text-lg font-semibold rounded-full px-3 py-1 flex items-center justify-center gap-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-[20px] w-[20px] sm:h-[30px] sm:w-[30px] p-[2px]'
						viewBox='0 0 20 20'
					>
						<path
							fill='white'
							d='M10 0a7.65 7.65 0 0 0-8 8c0 2.52 2 5 3 6s5 6 5 6s4-5 5-6s3-3.48 3-6a7.65 7.65 0 0 0-8-8m0 11.25A3.25 3.25 0 1 1 13.25 8A3.25 3.25 0 0 1 10 11.25'
						/>
					</svg>
					Destino
				</button>
				<button className='bg-[#028747] hover:bg-[#025C31] text-white text-xs sm:text-lg font-semibold rounded-full px-3 py-1 flex items-center justify-center gap-2'>
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
					Cupos
				</button>
			</section>

			<section className='w-full h-fit bg-white p-5 pt-0'>
				<div className='bg-[#D9D9D9] h-[350px] bg-opacity-50 w-full flex flex-col gap-3 p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 shadow-md rounded-lg'>
					<div className='flex'>
						<div className='bg-[#D9D9D9] p-[3px] rounded-l-lg gap-[3px] sm:gap-3 flex w-full items-center justify-start border-2 border-[#696C70] border-opacity-50 border-r-0'>
							<img
								className='h-[50px] w-[50px] object-fill sm:w-[120px] sm:h-[120px] rounded-[5px] border-[2px] border-[#696C70]'
								src='https://aacarsdna.com/images/vehicles/56/medium/c2ce1ca280186ac402421c274c64a0f1.jpg'
								alt='Imagen carro'
							/>
							<section className='flex flex-col gap-[2px] sm:gap-2 w-full'>
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
									<div className='flex flex-wrap gap-1'>
										<button className='bg-white rounded-full px-1 text-[8px] sm:text-lg font-semibold'>
											U. sabana
										</button>
										<button className='bg-white rounded-full px-1 text-[8px] sm:text-lg font-semibold'>
											Av. 127
										</button>
										<button className='bg-white rounded-full px-1 text-[8px] sm:text-lg font-semibold'>
											Av.170
										</button>
									</div>
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
									<div className='text-[10px] sm:text-lg font-semibold'>
										3:00 pm
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
									<div className='text-[10px] sm:text-lg font-semibold'>3</div>
								</div>
							</section>
						</div>
						<button className='bg-[#028747] rounded-r-lg border-2 border-l-0 border-[#025C31] hover:bg-[#025C31]'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-[30px] w-[30px] sm:h-[33px] sm:w-[33px]'
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
				</div>
			</section>
		</main>
	);
}

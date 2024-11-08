import { getUserById } from '@/app/helpers/api/user';
import { getVehicleByPlate } from '@/app/helpers/api/vehicles';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import RouteStop from '../userDashboard/routeStop';
import Swal from 'sweetalert2';
import formatTime from '@/app/helpers/timeformat';
import { deleteBooking } from '@/app/helpers/api/user';
import { useAuth } from '@/app/contexts/sessionContext';

export default function ReservationCard({ item, reloadReservations }) {
	const [vehicle, setVehicle] = useState(null);
	const [driver, setDriver] = useState(null);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const [ride, setRide] = useState(item);

	useEffect(() => {
		const getVehicle = async () => {
			setLoading(true);
			try {
				const resVehicle = await getVehicleByPlate(ride.vehicle_plate);
				const resDriver = await getUserById(resVehicle.id_driver);
				setVehicle(resVehicle);
				setDriver(resDriver);
			} catch (error) {
				console.error('Error fetching rides:', error);
			} finally {
				setLoading(false);
			}
		};

		if (ride.vehicle_plate) {
			getVehicle();
		}
	}, [ride.vehicle_plate]);

	const handleCancel = async () => {
		const result = await Swal.fire({
			title: '¿Deseas cancelar la reserva?',
			text: 'No podrás deshacer esta acción!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#9C0000',
			cancelButtonColor: '#028747',
			confirmButtonText: 'Sí, cancelar',
			cancelButtonText: 'Regresar',
		});

		if (result.isConfirmed) {
			Swal.fire('Cancelado!', 'Tu reserva ha sido cancelada.', 'success');
			await deleteBooking(user.id, ride.rideId, ride.destination);
			reloadReservations();
		}
	};

	const handlePaymentSelection = async () => {
		const { value: paymentMethod } = await Swal.fire({
			title: 'Selecciona un método de pago',
			text: 'Escoge si pagas en efectivo o por transferencia',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Efectivo',
			cancelButtonText: 'Transferencia',
			confirmButtonColor: '#028747',
			cancelButtonColor: '#43aaea',
			inputOptions: {
				cash: 'Cash',
				credit: 'Credit Card',
			},
			inputValidator: (value) => {
				if (!value) {
					return 'You need to select a payment method!';
				}
			},
		});

		if (paymentMethod) {
			console.log(
				`Selected payment method: ${paymentMethod === true ? 'Cash' : ''}`
			);
			// Handle the selected payment method here
		} else {
			console.log(
				`Selected payment method: ${paymentMethod === undefined ? 'Transfer' : ''}`
			);
			// Handle the selected payment method here
		}
	};

	const formattedTime = formatTime(ride.departure);

	if (loading) {
		return (
			<div className='fixed inset-0 flex items-center justify-center z-50'>
				<div className='bg-white rounded-lg shadow-lg p-5 w-[300px] h-[350px]'>
					<div className='flex flex-col justify-center items-center gap-10 text-[#028747] font-bold text-lg'>
						Cargando Información ...
						<div className='w-[150px] h-[150px] border-[10px] border-t-[10px] border-t-[#028747] border-gray-200 rounded-full animate-spin'></div>
					</div>
				</div>
			</div>
		);
	}

	if (!vehicle || !driver) {
		return null; // Do not render anything if data is not available
	}

	return (
		<div className='flex flex-col'>
			<div className='bg-[#D9D9D9] h-full px-4 py-3 rounded-lg gap-[5px] sm:gap-3 flex flex-col w-[280px] items-center justify-between border-2 border-[#696C70] border-opacity-50'>
				<Image
					width={400}
					height={400}
					className='h-[150px] w-[150px] object-fill sm:w-[180px] sm:h-[180px] rounded-[5px] border-[2px] border-[#696C70]'
					src={
						vehicle?.photo ||
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfoGbdjDFT0TjduR_2NklrEg6URCrDFb-cQ&s'
					}
					alt='Imagen carro'
					priority
				/>
				<section className='flex flex-col gap-[2px] sm:gap-2 w-full py-4'>
					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='min-h-[20px] sm:min-h-[30px] h-[20px] min-w-[20px] sm:min-w-[30px] w-[20px] sm:w-[30px] sm:h-[30px]'
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

					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='black'
								d='M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z'
							/>
						</svg>
						<div className='text-base sm:text-lg font-semibold'>
							{formattedTime}
						</div>
					</div>

					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='black'
								d='M8.5 6q-.825 0-1.412-.587T6.5 4t.588-1.412T8.5 2t1.413.588T10.5 4t-.587 1.413T8.5 6M13 20H7.55q-.825 0-1.512-.587T5.175 18l-1.95-9.8q-.1-.475.2-.837t.8-.363q.35 0 .625.225t.35.575L7.25 18H13q.425 0 .713.288T14 19t-.288.713T13 20m6 1.125L16.6 17H9.65q-.725 0-1.263-.437T7.7 15.4l-1.1-5.35q-.275-1.2.563-2.125T9.2 7q.875 0 1.588.525T11.7 8.95L12.8 14h3.25q.525 0 .975.275t.725.725l3 5.125q.2.35.088.763t-.463.612t-.763.088t-.612-.463'
							/>
						</svg>
						<div className='text-base sm:text-lg font-semibold'>
							{ride.available_seats > 1
								? `${ride.available_seats} disponibles`
								: ride.available_seats === 1
									? `${ride.available_seats} disponible`
									: 'Cupo lleno'}
						</div>
					</div>

					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='black'
								d='M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0'
							/>
							<path
								fill='black'
								d='M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599zM19.425 10H9.397l7.469-2.546l1.522-.487zM15.55 5.79L7.84 8.418l6.106-4.878zM3.5 18.169v-4.34A3 3 0 0 0 5.33 12h13.34a3 3 0 0 0 1.83 1.83v4.34A3 3 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169'
							/>
						</svg>
						<div className='text-base sm:text-lg font-semibold'>
							$ {ride.fee.toLocaleString()}
						</div>
					</div>

					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 512 512'
						>
							<path
								fill='black'
								d='M256 25C128.3 25 25 128.3 25 256s103.3 231 231 231s231-103.3 231-231S383.7 25 256 25m0 30c110.9 0 201 90.1 201 201s-90.1 201-201 201S55 366.9 55 256S145.1 55 256 55M80.52 203.9c-4.71 19.2-7.52 37-7.52 54c144.7 30.3 121.5 62.4 148 177.8c11.4 2.1 23 3.3 35 3.3s23.6-1.2 35-3.3c26.5-115.4 3.3-147.5 148-177.8c-.6-18.9-3-38.4-7.5-54C346.7 182.7 301.1 172 256 172s-90.7 10.7-175.48 31.9M256 183c40.2 0 73 32.8 73 73s-32.8 73-73 73s-73-32.8-73-73s32.8-73 73-73m0 18c-30.5 0-55 24.5-55 55s24.5 55 55 55s55-24.5 55-55s-24.5-55-55-55'
							/>
						</svg>
						<div className='text-base sm:text-lg font-semibold'>
							{`${driver.name} ${driver.lastname}`}
						</div>
					</div>

					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='black'
								d='m20.772 10.155l-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845M7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6M5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16m13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16'
							/>
						</svg>
						<div className='text-base sm:text-lg font-semibold'>
							{`${vehicle.brand} ${vehicle.model}`}
						</div>
					</div>

					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 2048 1536'
						>
							<path
								fill='black'
								d='M896 1084q0-54-7.5-100.5t-24.5-90t-51-68.5t-81-25q-64 64-156 64t-156-64q-47 0-81 25t-51 68.5t-24.5 90T256 1084q0 55 31.5 93.5T363 1216h426q44 0 75.5-38.5T896 1084M768 640q0-80-56-136t-136-56t-136 56t-56 136t56 136t136 56t136-56t56-136m1024 480v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23m-384-256v-64q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v64q0 14 9 23t23 9h320q14 0 23-9t9-23m384 0v-64q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v64q0 14 9 23t23 9h192q14 0 23-9t9-23m0-256v-64q0-14-9-23t-23-9h-704q-14 0-23 9t-9 23v64q0 14 9 23t23 9h704q14 0 23-9t9-23M128 256h1792v-96q0-14-9-23t-23-9H160q-14 0-23 9t-9 23zm1920-96v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1728q66 0 113 47t47 113'
							/>
						</svg>
						<div className='text-base sm:text-lg font-semibold'>
							{`${ride.vehicle_plate.slice(0, 3)} ${ride.vehicle_plate.slice(3, 6)}`}
						</div>
					</div>

					<div className='flex gap-[5px] sm:gap-3 items-center w-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[20px] w-[20px] sm:w-[30px] sm:h-[30px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='black'
								d='M21 16.42v3.536a1 1 0 0 1-.93.998Q19.415 21 19 21C10.163 21 3 13.837 3 5q0-.414.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45q.034.344.064.552A13.9 13.9 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.05 13.05 0 0 0 6.844 6.844l1.54-2.154a.46.46 0 0 1 .573-.149a13.9 13.9 0 0 0 4 1.205q.208.03.55.064a.5.5 0 0 1 .449.498'
							/>
						</svg>
						<div className='text-base sm:text-lg font-semibold'>
							{`(+57) ${driver?.contact.slice(0, 3)} ${driver?.contact.slice(3, 6)} ${driver?.contact.slice(6, 10)}`}
						</div>
					</div>
				</section>

				<section className='flex gap-3'>
					<button
						onClick={handlePaymentSelection}
						className='bg-[#028747] rounded-lg border-2 border-[#025C31] hover:bg-[#025C31] flex text-white font-semibold items-center justify-center px-1 text-lg sm:text-lg gap-1'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[40px] w-[40px] sm:h-[40px] sm:w-[40px]'
							viewBox='0 0 24 24'
						>
							<path
								fill='white'
								d='M6.25 2A2.25 2.25 0 0 0 4 4.25v15.5A2.25 2.25 0 0 0 6.25 22h7.5A2.25 2.25 0 0 0 16 19.771v-1.52a.75.75 0 0 0-.75-.75c-.453 0-.739-.123-.936-.282c-.208-.167-.38-.425-.511-.789c-.273-.755-.302-1.75-.302-2.68a.75.75 0 0 0-.202-.512l-.165-.177a3 3 0 0 0-.17-.173c-.074-.07-.3-.285-1.183-1.168c-.469-.469-.728-.865-.813-1.168a.6.6 0 0 1-.016-.325a.7.7 0 0 1 .205-.323a.7.7 0 0 1 .322-.204a.6.6 0 0 1 .324.016c.302.085.698.346 1.167.815c.54.54 1.053 1.047 1.512 1.5c.76.752 1.373 1.36 1.72 1.73a.75.75 0 0 0 1.097-1.023A55 55 0 0 0 16 11.424V8.06l2.842 2.842c.421.422.659.994.659 1.59v8.758a.75.75 0 0 0 1.5 0v-8.757a3.75 3.75 0 0 0-1.099-2.652L16 5.939v-1.69A2.25 2.25 0 0 0 13.75 2zm6.142 14.94c.097.268.222.534.384.782A2.25 2.25 0 0 0 11.5 19.75v.75h-3v-.75a2.25 2.25 0 0 0-2.25-2.25H5.5v-11h.75A2.25 2.25 0 0 0 8.5 4.25V3.5h3v.75a2.25 2.25 0 0 0 2.25 2.25h.75v3.438l-.469-.468c-.531-.531-1.148-1.008-1.821-1.198a2.1 2.1 0 0 0-1.104-.025a2 2 0 0 0-.632.285a3.5 3.5 0 1 0 1.55 6.324c.037.684.13 1.427.368 2.084M8 12a2 2 0 0 1 1.456-1.925a2.2 2.2 0 0 0 .068.883c.189.673.665 1.291 1.197 1.823l.665.662A2 2 0 0 1 8 12M5.5 4.25a.75.75 0 0 1 .75-.75H7v.75a.75.75 0 0 1-.75.75H5.5zM13 3.5h.75a.75.75 0 0 1 .75.75V5h-.75a.75.75 0 0 1-.75-.75zM14.5 19v.75a.75.75 0 0 1-.75.75H13v-.75a.75.75 0 0 1 .75-.75zM7 20.5h-.75a.75.75 0 0 1-.75-.75V19h.75a.75.75 0 0 1 .75.75z'
							/>
						</svg>
						Pagar
					</button>
					<button
						onClick={handleCancel}
						className='bg-[#c92323] rounded-lg border-2 border-[#9C0000] hover:bg-[#9C0000] flex text-white font-semibold items-center justify-center px-1 text-lg sm:text-lg gap-1'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-[25px] w-[25px] sm:h-[30px] sm:w-[30px]'
							viewBox='0 0 16 16'
						>
							<path
								fill='white'
								d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5'
							/>
						</svg>
						Cancelar
					</button>
				</section>
			</div>
		</div>
	);
}

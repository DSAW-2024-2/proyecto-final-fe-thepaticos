import { useState, useEffect } from 'react';
import { getRideById } from '@/app/helpers/api/ride';
import RouteStop from '../components/userDashboard/routeStop';
import { getVehicleByPlate } from '@/app/helpers/api/vehicles';
import { getUserById } from '@/app/helpers/api/user';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAxiosError } from 'axios';
import Loader from './Loader';
import { bookRide } from '@/app/helpers/api/user';
import formatTime from '@/app/helpers/timeformat';
import { useAuth } from '@/app/contexts/sessionContext';

export default function TripDetailsModal({
	rideId,
	isTripDetailsOpen,
	onClose,
}) {
	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	const [ride, setRide] = useState(null);
	const [vehicle, setVehicle] = useState(null);
	const [driver, setDriver] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { user } = useAuth();
	const searchParams = useSearchParams();
	const destination = searchParams.get('destination');

	useEffect(() => {
		const fetchData = async () => {
			if (!rideId) return;

			setLoading(true);
			try {
				const rideData = await getRideById(rideId);
				setRide(rideData);

				const resVehicle = await getVehicleByPlate(rideData.vehicle_plate);
				setVehicle(resVehicle);

				const resDriver = await getUserById(resVehicle.id_driver);
				setDriver(resDriver);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			setRide(null);
			setVehicle(null);
			setDriver(null);
		};
	}, [rideId]);

	if (!isTripDetailsOpen || loading) {
		return null;
	}

	const formattedTime = formatTime(ride.departure);

	const bookTrip = async () => {
		if (loading) return;
		setLoading(true);
		try {
			Swal.fire({
				title: 'Excelente!',
				text: 'Tu cupo ha sido reservado',
				icon: 'success',
			});
			await bookRide(user.id, rideId, [destination || ride.destination]);
			router.push('/reservations');
			handleClose();
		} catch (error) {
			if (isAxiosError(error)) {
				Swal.fire({
					title: 'Error!',
					text: error.response.data.message,
					icon: 'error',
				});
			} else {
				Swal.fire({
					title: 'Error!',
					text: 'Error del servidor',
					icon: 'error',
				});
			}
		} finally {
			setLoading(false); // Reset loading state after the operation completes
		}
	};

	if (loading) {
		return <Loader message={'Cargando información'} />;
	}

	return (
		<div
			className='absolute z-10 flex items-center justify-center h-full w-full inset-0 bg-gray-500 bg-opacity-80 transition-opacity'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
			onClick={handleClose}
		>
			<div
				className='bg-white rounded-lg p-3 w-fit h-fit flex flex-col justify-end items-end'
				onClick={(e) => e.stopPropagation()}
			>
				<button className='text-black' onClick={handleClose}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='relative top-0 right-15 w-10 h-10 opacity-50 hover:opacity-100'
						viewBox='0 0 24 24'
					>
						<path
							fill='#028747'
							d='M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3m-3.29 10.29a1 1 0 0 1 0 1.42a1 1 0 0 1-1.42 0L12 13.41l-1.29 1.3a1 1 0 0 1-1.42 0a1 1 0 0 1 0-1.42l1.3-1.29l-1.3-1.29a1 1 0 0 1 1.42-1.42l1.29 1.3l1.29-1.3a1 1 0 0 1 1.42 1.42L13.41 12Z'
						/>
					</svg>
				</button>
				<div className='bg-[#D9D9D9] h-full px-4 py-3 rounded-lg gap-[5px] sm:gap-3 flex flex-col w-[280px] items-center justify-between border-2 border-[#696C70] border-opacity-50'>
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
								{`$ ${ride.fee.toLocaleString()}`}
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
								{driver?.name + ' ' + driver?.lastname}
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
								{`${vehicle?.brand} ${vehicle?.model}`}
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
							onClick={(e) => {
								e.stopPropagation(); // Prevent the click from propagating
								bookTrip();
							}}
							className='bg-[#028747] rounded-lg border-2 border-[#025C31] hover:bg-[#025C31] flex text-white font-semibold items-center justify-center px-1 text-lg sm:text-lg gap-1'
						>
							Reservar Viaje
						</button>
					</section>
				</div>
			</div>
		</div>
	);
}

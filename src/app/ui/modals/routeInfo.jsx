import { useState, useEffect } from 'react';
import PassengersCard from '../components/driverDashboard/passengerCard';
import Swal from 'sweetalert2';
import Loader from './Loader';

export default function RouteInfo({ isRouteInfoOpen, onClose, ride }) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, []);

	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};
	if (loading) {
		return <Loader message={'Cargando información'} />;
	}
	if (!isRouteInfoOpen || loading) {
		return null;
	}
	const dateString = ride.departure;
	const date = new Date(dateString);
	const dateFormat = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};
	const formattedTime = date.toLocaleTimeString('en-US', dateFormat);

	const handleCancelTrip = async () => {
		const result = await Swal.fire({
			title: '¿Estás seguro que deseas cancelar el viaje?',
			text: 'No podrás revertir esta acción!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#9C0000',
			cancelButtonColor: '#028747',
			confirmButtonText: 'Sí, cancelar',
			cancelButtonText: 'No, mantener viaje',
		});

		if (result.isConfirmed) {
			// Perform the cancellation logic here
			Swal.fire('Cancelado!', 'El viaje ha sido cancelado.', 'success');
			handleClose();
		}
	};

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
								viewBox='0 0 20 20'
							>
								<path
									fill='black'
									d='M10 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M7.5 4.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0m8-.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0a2 2 0 0 1-4 0m-10 0a1 1 0 1 1 2 0a1 1 0 0 1-2 0m1-2a2 2 0 1 0 0 4a2 2 0 0 0 0-4m.6 11.998L5 15a2 2 0 0 1-2-2V9.25A.25.25 0 0 1 3.25 9h1.764c.04-.367.17-.708.365-1H3.25C2.56 8 2 8.56 2 9.25V13a3 3 0 0 0 3.404 2.973a5 5 0 0 1-.304-.975m9.496.975Q14.794 16 15 16a3 3 0 0 0 3-3V9.25C18 8.56 17.44 8 16.75 8h-2.129c.196.292.325.633.365 1h1.764a.25.25 0 0 1 .25.25V13a2 2 0 0 1-2.1 1.998a5 5 0 0 1-.304.975M7.25 8C6.56 8 6 8.56 6 9.25V14a4 4 0 0 0 8 0V9.25C14 8.56 13.44 8 12.75 8zM7 9.25A.25.25 0 0 1 7.25 9h5.5a.25.25 0 0 1 .25.25V14a3 3 0 1 1-6 0z'
								/>
							</svg>
							<PassengersCard passengersList={ride.passengers} />
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
										: 'No hay cupos disponibles'}
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
								{`Total: $ ${(ride.fee * ride.passengers.length).toLocaleString()}`}
							</div>
						</div>
					</section>

					<section className='flex gap-3'>
						<button
							onClick={handleCancelTrip}
							className='bg-[#c92323] rounded-lg border-2 border-[#9C0000] hover:bg-[#9C0000] flex text-white font-semibold items-center justify-center px-1 text-lg sm:text-lg gap-1'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-[25px] w-[25px] sm:h-[30px] sm:w-[30px] p-1'
								viewBox='0 0 16 16'
							>
								<path
									fill='white'
									d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5'
								/>
							</svg>
							Cancelar Viaje
						</button>
					</section>
				</div>
			</div>
		</div>
	);
}

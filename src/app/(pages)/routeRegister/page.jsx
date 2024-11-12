'use client';
import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { createRide, transmilenioRoutes } from '@/app/helpers/api/ride';
import { rideSchema } from '@/app/helpers/validators';
import MapView from '@/app/ui/components/Map';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function Page() {
	const router = useRouter();
	const { user } = useAuth();
	const { setLoading } = useLoading();
	const [stations, setStations] = useState([]);
	const [selectedStops, setSelectedStops] = useState([]);
	const [isSabanaStart, setIsSabanaStart] = useState(null);
	const MAX_STOPS = 5;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(rideSchema),
	});

	const errorsMes = (err) => {
		let errorMessage = '';
		for (const field in err) {
			if (err[field]._errors) {
				const fieldErrors = err[field]._errors.join(', ');
				errorMessage += `\n${field}: ${fieldErrors}`;
			}
		}
		return errorMessage;
	};

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const tripData = {
				...data,
				vehicle_plate: user.vehicle_plate,
				destination: selectedStops[selectedStops.length - 1],
				origin: selectedStops[0],
				departure: `${data?.departure}Z`,
				route: selectedStops,
			};
			console.log(validation);

			const validation = rideSchema.safeParse(tripData);
			console.log(validation);

			if (validation.success) {
				await createRide(validation.data);
				Swal.fire({
					title: 'Excelente!',
					text: 'Ruta Registrada Correctamente',
					icon: 'success',
				});
				router.push('/driverDashboard');
			} else {
				let errorMessages = '';
				validation.error.errors.forEach((err) => {
					errorMessages +=
						`Field: ${err.path.join('.')}, Error: ${err.message}\n\n` + '\n';
				});
				Swal.fire({
					title: 'Error! Validation failed',
					text: errorMessages,
					icon: 'error',
				});
			}
		} catch (error) {
			let validateErrors = '';
			if (error.response.data.errors) {
				validateErrors = errorsMes(error.response.data.errors);
			}

			if (isAxiosError(error)) {
				Swal.fire({
					title: 'Error!',
					text: `${error.response.data.message} ${validateErrors}`,
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
			setLoading(false);
		}
	};

	const handleSabanaStart = (startsAtSabana) => {
		setIsSabanaStart(startsAtSabana);
		console.log(startsAtSabana ? 'Si u' : 'No u');

		setSelectedStops((prevStops) => {
			const filteredStops = prevStops.filter((stop) => stop !== 'U. Sabana');
			if (startsAtSabana == true) {
				return ['U. Sabana', ...filteredStops];
			} else {
				return [...filteredStops, 'U. Sabana'];
			}
		});
	};

	const handleButtonClick = (stop) => {
		setSelectedStops((prev) => {
			if (prev.includes(stop)) {
				return prev.filter((s) => s !== stop);
			}
			if (prev.length === MAX_STOPS) {
				Swal.fire({
					title: 'Límite alcanzado',
					text: `No puedes realizar más de ${MAX_STOPS} paradas.`,
					icon: 'warning',
				});
				return prev;
			}
			if (isSabanaStart === null) {
				return [...prev, stop];
			} else {
				if (isSabanaStart == true) {
					return [...prev, stop];
				} else {
					const beforeLast = [...prev];
					beforeLast.splice(beforeLast.length - 1, 0, stop); // Insert the stop before the last element
					return beforeLast;
				}
			}
		});
	};

	useEffect(() => {
		async function fetchEstaciones() {
			try {
				const nombresEstacion = await transmilenioRoutes();
				setStations(['U. Sabana', 'Centro Chía', ...nombresEstacion].sort());
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchEstaciones();
	}, []);

	const stopsList = stations;

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full max-w-[600px] p-4 m-10 border rounded-lg shadow-lg'
			encType='multipart/form-data'
		>
			<Link
				className='text-gray-400 hover:text-gray-800 flex mb-5'
				href='/driverDashboard'
			>
				<ChevronLeft /> Volver
			</Link>

			<div className='mb-4'>
				<label className='block text-gray-700 mb-2'>
					¿Te encuentras en la Universidad de la Sabana?
				</label>
				<div className='flex gap-2'>
					<button
						type='button'
						onClick={() => {
							setIsSabanaStart(true), handleSabanaStart(true);
						}}
						className={`py-2 px-4 rounded-full group ${isSabanaStart === true ? 'bg-[#028747] text-white group-hover:bg-[#028747] group-hover:text-white' : 'bg-gray-200 hover:bg-[#696C70] hover:text-white'}`}
					>
						Sí
					</button>
					<button
						type='button'
						onClick={() => {
							setIsSabanaStart(false), handleSabanaStart(false);
						}}
						className={`py-2 px-4 rounded-full group ${isSabanaStart === false ? 'bg-[#028747] text-white group-hover:bg-[#028747] group-hover:text-white' : 'bg-gray-200 hover:bg-[#696C70] hover:text-white'}`}
					>
						No
					</button>
				</div>
			</div>

			<div className={`mb-4 ${isSabanaStart == null ? 'hidden' : ''}`}>
				<label className='block text-gray-700 mb-2'>
					Selecciona tus paradas:
				</label>
				<div className='overflow-x-auto whitespace-nowrap flex flex-wrap gap-1 h-[130px] overflow-auto'>
					{stopsList.map((stop) => (
						<button
							key={stop}
							type='button'
							onClick={() => handleButtonClick(stop)}
							className={`py-2 px-4 rounded-full group ${selectedStops.includes(stop) ? 'bg-[#028747] text-white group-hover:bg-[#028747] group-hover:text-white' : 'bg-gray-200 text-black hover:bg-[#696C70] hover:text-white'}`}
						>
							{stop}
						</button>
					))}
				</div>
			</div>

			<div className='mb-4'>
				<label className='block text-gray-700 mb-2'>
					{selectedStops.length > 0 ? 'Orden de esta ruta' : ''}
				</label>
				<ol className='list-disc pl-5'>
					{selectedStops.map((stop, index) => (
						<li key={index}>{stop}</li>
					))}
				</ol>
			</div>

			{['fee', 'available_seats'].map((field) => (
				<div key={field} className='mb-4'>
					<label
						htmlFor={field}
						className='block text-gray-700 mb-2 capitalize'
					>
						{field === 'available_seats'
							? 'Cupos disponibles'
							: 'Valor unico del wheels'}
					</label>
					<input
						type='text'
						id={field}
						{...register(field)}
						placeholder={`e.j: ${field === 'available_seats' ? '4' : '4000'}`}
						className='w-full px-3 py-2 border rounded-lg'
					/>
					{errors[field] && (
						<p className='text-red-500 text-sm mt-1'>
							*{errors[field]?.message}
						</p>
					)}
				</div>
			))}

			<div className='mb-4'>
				<input
					type='datetime-local'
					id='departure'
					{...register('departure')}
					className='text-xs sm:text-base'
				/>
			</div>
			{errors.departure && (
				<p className='text-red-500 text-sm mt-1'>{errors.departure.message}</p>
			)}

			<button
				type='submit'
				className='w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase'
			>
				Registrar Ruta
			</button>
			<MapView />
		</form>
	);
}

'use client';
import { useLoading } from '@/app/contexts/loadingContext';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/sessionContext';
import { createRide } from '@/app/helpers/api/ride';
import { rideSchema } from '@/app/helpers/validators';
//import { zodResolver } from '@hookform/resolvers/zod';

export default function Page() {
	const router = useRouter();
	const { user } = useAuth();
	const { setLoading } = useLoading();
	const [stations, setStations] = useState([]);
	const [selectedStops, setSelectedStops] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
				destination: selectedStops[selectedStops.length - 1].toString(),
				origin: selectedStops[0].toString(),
				departure: `${data?.departure}:00Z`,
				route: selectedStops,
			};
			const validation = rideSchema.safeParse(tripData);
			if (validation.success) {
				await createRide(validation.data);
				Swal.fire({
					title: 'Excelente!',
					text: 'Ruta Registrada Correctamente',
					icon: 'success',
				});
				router.push('/driverDashboard');
			}
		} catch (error) {
			let validateErros = '';
			if (error.response.data.errors) {
				validateErros = errorsMes(error.response.data.errors);
			}

			if (isAxiosError(error)) {
				Swal.fire({
					title: 'Error!',
					text: `${error.response.data.message} ${validateErros}`,
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

	const handleButtonClick = (stop) => {
		setSelectedStops((prev) => {
			if (prev.includes(stop)) {
				return prev.filter((s) => s !== stop);
			} else {
				return [...prev, stop];
			}
		});
	};

	useEffect(() => {
		async function fetchEstaciones() {
			const url =
				'https://gis.transmilenio.gov.co/arcgis/rest/services/Troncal/consulta_estaciones_troncales/FeatureServer/0/query?where=1%3D1&outFields=nombre_estacion&outSR=4326&f=json';
			try {
				const response = await fetch(url);
				const data = await response.json();
				if (data.features) {
					const nombresEstacion = data.features
						.map((feature) => feature.attributes.nombre_estacion.toString())
						.filter(
							(name) =>
								(name.includes('Calle') ||
									name.includes('Norte') ||
									name.includes('AV.')) &&
								!name.includes('-')
						);
					setStations(['U. Sabana', 'Centro Chía', ...nombresEstacion].sort());
				} else {
					console.error('No features found in the response');
				}
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
					Selecciona tus paradas:
				</label>
				<div className='overflow-x-auto whitespace-nowrap flex gap-1'>
					{stopsList.map((stop) => (
						<button
							key={stop}
							type='button'
							onClick={() => handleButtonClick(stop)}
							className={`py-2 px-4 rounded-full ${
								selectedStops.includes(stop)
									? 'bg-[#028747] text-white'
									: 'bg-gray-200 text-black'
							}`}
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
		</form>
	);
}

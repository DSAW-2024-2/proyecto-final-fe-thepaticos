'use client';
import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { recommendedFee } from '@/app/helpers/api/ride';
import { rideSchema } from '@/app/helpers/validators';
import { isAxiosError } from 'axios';
import { createRide } from '@/app/helpers/api/ride';
const MapView = dynamic(() => import('@/app/ui/components/Maps/Map'), {
	ssr: false,
});

export default function Page() {
	const router = useRouter();
	const { user, vehicle } = useAuth();
	const { setLoading } = useLoading();

	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState({});
	const [fee, setRecommendedFee] = useState(3000);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let stops = [];
		if (document.getElementById('paradas')?.children !== undefined) {
			stops = Array.from(document.getElementById('paradas')?.children)?.map(
				(child) => child.innerText.split(':')[1]?.trim().replace(',', '')
			);
			try {
				const recomFee = await recommendedFee(
					stops[0],
					stops[stops.length - 1]
				);
				setRecommendedFee(recomFee);
			} catch (error) {
				Swal.fire({
					title: 'Error!',
					text: 'Error del servidor al cargar la recomendación de tarifa',
					icon: 'error',
				});
			}
		}
		try {
			if (stops.length < 2) {
				Swal.fire({
					title: 'Error!',
					text: 'Por favor selecciona una ruta con origen y destino',
					icon: 'error',
				});
				return;
			}
			if (formData.available_seats > vehicle?.seats) {
				Swal.fire({
					title: 'Error!',
					text: `Por favor elije entre 1 a ${vehicle.seats} asientos`,
					icon: 'error',
				});
				return;
			}
			let origin = stops[0];
			let destination = stops[stops.length - 1];
			const tripData = {
				...formData,
				departure: formData.departure,
				vehicle_plate: user.vehicle_plate,
				destination: destination,
				origin: origin,
				route: stops,
			};
			const validation = rideSchema.safeParse(tripData);
			console.log(validation.data);
			if (validation.success) {
				await createRide(validation.data);
				Swal.fire({
					title: 'Excelente!',
					text: 'Ruta Registrada Correctamente',
					icon: 'success',
				});
				router.push('/driverDashboard');
			} else {
				setErrors(validation.error.flatten().fieldErrors);
			}
		} catch (error) {
			if (isAxiosError(error)) {
				Swal.fire({
					title: 'Error!',
					text: 'Algunos campos no estan llenos correctamente',
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

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-[600px] p-4 m-10 border rounded-lg shadow-lg'
			encType='multipart/form-data'
		>
			<Link
				className='text-gray-400 hover:text-gray-800 flex mb-5'
				href='/driverDashboard'
			>
				<ChevronLeft /> Volver
			</Link>
			<div className='flex flex-col justify-center items-center h-fit'>
				<MapView />
			</div>
			{errors.origin && (
				<p className='text-red-500 text-sm mt-1'>Origin: {errors.origin}</p>
			)}
			{errors.destination && (
				<p className='text-red-500 text-sm mt-1'>
					Destination: {errors.destination}
				</p>
			)}
			{errors.route && (
				<p className='text-red-500 text-sm mt-1'>Route: {errors.route}</p>
			)}
			{['fee', 'available_seats'].map((field) => (
				<div key={field} className='mb-4'>
					<label
						htmlFor={field}
						className='block text-gray-700 mb-2 capitalize'
					>
						{field === 'available_seats'
							? 'Cupos disponibles'
							: 'Tarifa única del Wheels'}
					</label>
					<input
						type='text'
						id={field}
						name={field}
						onChange={handleChange}
						value={formData[field] || ''}
						placeholder={
							field === 'available_seats'
								? vehicle?.seats
								: `Tarifa Sugerida: ${fee}`
						}
						className='w-full px-3 py-2 border rounded-lg'
					/>
					{errors[field] && (
						<p className='text-red-500 text-sm mt-1'>*{errors[field]}</p>
					)}
				</div>
			))}

			<div className='mb-4'>
				<label htmlFor='departure' className='block text-gray-700 mb-2'>
					Hora de Salida
				</label>
				<input
					type='datetime-local'
					id='departure'
					name='departure'
					value={formData.departure || ''}
					onChange={handleChange}
					className='w-full px-3 py-2 border rounded-lg'
				/>
				{errors.departure && (
					<p className='text-red-500 text-sm mt-1'>{errors.departure}</p>
				)}
			</div>

			<button
				type='submit'
				className='w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase'
			>
				Registrar Ruta
			</button>
		</form>
	);
}

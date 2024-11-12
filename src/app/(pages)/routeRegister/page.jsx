'use client';
import dynamic from 'next/dynamic';
import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { createRide, recommendedFee } from '@/app/helpers/api/ride';
import { rideSchema } from '@/app/helpers/validators';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
const MapView = dynamic(() => import('@/app/ui/components/Map'), {
	ssr: false,
});

export default function Page() {
	const router = useRouter();
	const { user } = useAuth();
	const { setLoading } = useLoading();
	const [route, setRoute] = useState([]);
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState({});
	const [fee, setRecommendedFee] = useState(3000);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (route.length < 2) {
				Swal.fire({
					title: 'Error!',
					text: 'Por favor selecciona una ruta',
					icon: 'error',
				});
				return;
			}
			const [origin, destination] =
				route[0].id === 'origin' ? [route[0], route[1]] : [route[1], route[0]];
			const recomFee = await recommendedFee(origin, destination);
			setRecommendedFee(recomFee);
			const routeNames = route.map((stop) => stop.name).slice(2);

			const tripData = {
				...formData,
				vehicle_plate: user.vehicle_plate,
				destination: destination.name,
				origin: origin.name,
				route: routeNames,
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
			} else {
				setErrors(validation.error.flatten().fieldErrors);
				Swal.fire({
					title: 'Error! Validation failed',
					icon: 'error',
				});
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
			<div className='mb-6'>
				<MapView setRoute={setRoute} />
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
							: `Valor unico del wheels, valor recomendado ${fee}`}
					</label>
					<input
						type='text'
						id={field}
						name={field}
						onChange={handleChange}
						value={formData.field}
						placeholder={`e.j: ${field === 'available_seats' ? '4' : '4000'}`}
						className='w-full px-3 py-2 border rounded-lg'
					/>
					{errors[field] && (
						<p className='text-red-500 text-sm mt-1'>*{errors[field]}</p>
					)}
				</div>
			))}

			<div className='mb-4'>
				<input
					type='datetime-local'
					id='departure'
					name='departure'
					value={formData.departure || ''}
					onChange={handleChange}
					className='text-xs sm:text-base'
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

'use client';
import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { createVehicle } from '@/app/helpers/api/vehicles';
import { vehicleSchema } from '@/app/helpers/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function Page() {
	const router = useRouter();
	const { user, setUser } = useAuth();
	const { setLoading } = useLoading();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(vehicleSchema),
	});
	const errorsMes = (err) => {
		let errorMessage;
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
			await createVehicle(data, user.id);
			setUser({ ...user, vehicle_plate: data.plate });
			Swal.fire({
				title: 'Excelente!',
				text: 'Vehiculo Registrado Correctamente',
				icon: 'success',
			});
			router.push('/driverDashboard');
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

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full max-w-[600px] p-4 m-10 border rounded-lg shadow-lg'
			encType='multipart/form-data'
		>
			<Link
				className='text-gray-400 hover:text-gray-800 flex mb-5'
				href='/dashboard'
			>
				<ChevronLeft /> Volver
			</Link>
			{['plate', 'brand', 'model', 'seats'].map((field) => (
				<div key={field} className='mb-4'>
					<label
						htmlFor={field}
						className='block text-gray-700 mb-2 capitalize'
					>
						{field === 'plate'
							? 'Placa'
							: field === 'brand'
								? 'Marca'
								: field === 'model'
									? 'Modelo'
									: field === 'seats'
										? 'Capacidad'
										: ''}
					</label>
					<input
						type={'text'}
						id={field}
						{...register(field)}
						placeholder={`e.j: ${
							field === 'plate'
								? 'ABC123'
								: field === 'brand'
									? 'Chevrolet'
									: field === 'model'
										? 'Cruz'
										: field === 'seats'
											? '5 (incluyendo conductor)'
											: ''
						}`}
						className='w-full px-3 py-2 border rounded-lg'
					/>
					{errors[field] && (
						<p className='text-red-500 text-sm mt-1'>
							*{errors[field]?.message}
						</p>
					)}
				</div>
			))}
			<label htmlFor={'soat'} className='block text-gray-700 mb-2 capitalize'>
				SOAT
			</label>
			<div className='mb-4'>
				<input
					type='file'
					id='soat'
					{...register('soat')}
					accept='image/jpeg, image/png, image/gif'
					className='text-xs sm:text-base'
					required
				/>
			</div>
			{errors.soat && (
				<p className='text-red-500 text-sm mt-1'>{errors.soat.message}</p>
			)}

			<label
				htmlFor={'vehiclePhoto'}
				className='block text-gray-700 mb-2 capitalize'
			>
				Foto Vehículo
			</label>
			<div className='mb-4'>
				<input
					type='file'
					id='vehiclePhoto'
					{...register('vehiclePhoto')}
					accept='image/jpeg, image/png, image/gif'
					className='text-xs sm:text-base'
					required
				/>
			</div>
			{errors.vehiclePhoto && (
				<p className='text-red-500 text-sm mt-1'>
					{errors.vehiclePhoto.message}
				</p>
			)}

			<button
				type='submit'
				className='w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase'
			>
				Registrar Vehículo
			</button>
		</form>
	);
}

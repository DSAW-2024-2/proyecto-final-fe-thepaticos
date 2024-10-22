'use client';
import { useLoading } from '@/app/contexts/loadingContext';
import { rideSchema } from '@/app/helpers/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function Page() {
	const router = useRouter();
	const { setLoading } = useLoading();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(rideSchema),
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

	const onSubmit = async () => {
		setLoading(true);
		try {
			Swal.fire({
				title: 'Excelente!',
				text: 'Ruta Registrada Correctamente',
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
				href='/driverDashboard'
			>
				<ChevronLeft /> Volver
			</Link>
			{['origin', 'destination', 'fee', 'available_seats'].map((field) => (
				<div key={field} className='mb-4'>
					<label
						htmlFor={field}
						className='block text-gray-700 mb-2 capitalize'
					>
						{field === 'origin'
							? 'Punto de recogida'
							: field === 'destination'
								? 'Punto destino'
								: field === 'available_seats'
									? 'Cupos disponibles'
									: field === 'fee'
										? 'Valor unico del wheels'
										: ''}
					</label>
					<input
						type='text'
						id={field}
						{...register(field)}
						placeholder={`e.j: ${
							field === 'origin'
								? 'Universidad de la sabana'
								: field === 'destination'
									? 'Portal Norte'
									: field === 'available_seats'
										? '4'
										: field === 'fee'
											? '40000'
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
			<div className='mb-4'>
				<input
					type='datetime-local'
					id='departure'
					{...register('departure')}
					accept='image/jpeg, image/png, image/gif'
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
				Registrarse
			</button>
		</form>
	);
}

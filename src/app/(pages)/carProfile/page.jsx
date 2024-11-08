'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { partialVehicleSchema } from '@/app/helpers/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { getVehicleByPlate } from '@/app/helpers/api/vehicles';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { modifyVehicle } from '@/app/helpers/api/vehicles';
import SoatModal from '@/app/ui/modals/SOAT';

export default function Page() {
	const { user } = useAuth();
	const router = useRouter();
	const { setLoading } = useLoading();
	const [car, setCar] = useState({ plate: user.vehicle_plate });
	const [SoatVisible, setSoatModal] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(partialVehicleSchema),
		defaultValues: {
			brand: '',
			model: '',
		},
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

	const toggleModal = () => {
		setSoatModal((prev) => !prev);
	};

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			Swal.fire({
				title: 'Excelente!',
				text: 'Cambios Realizados Correctamente',
				icon: 'success',
			});
			await modifyVehicle(data, car.plate);
			router.push('/driverDashboard');
		} catch (error) {
			let validateErrors = '';
			if (error.response?.data?.errors) {
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

	useEffect(() => {
		const fetchCar = async () => {
			const carData = await getVehicleByPlate(user.vehicle_plate);
			if (carData) {
				setCar(carData);
				reset({
					brand: carData.brand || '',
					model: carData.model || '',
				});
			}
		};
		fetchCar();
	}, [user.vehicle_plate, reset]);

	return (
		<section className=' w-full h-fit flex gap-4 justify-center items-center sm:items-start p-10 flex-col sm:flex-row'>
			<section className='relative flex flex-col justify-start items-center gap-4'>
				<Link
					className='absolute top-4 left-4 text-gray-400 hover:text-gray-800 flex'
					href='/driverDashboard'
				>
					<ChevronLeft /> Volver
				</Link>
				<div className='flex flex-col justify-center items-center gap-4 mt-12'>
					<Image
						src={car.photo || '/images/anonym.png'}
						alt='Foto del vehiculo'
						width={500}
						height={500}
						priority
						className='rounded-full object-cover max-w-[220px] max-h-[220px] min-w-[220px] min-h-[220px] border-2 sm:min-w-[260px] sm:max-w-[260px] sm:min-h-[260px] sm:max-h-[260px] cursor-pointer sm:border-4 border-[#025C31]'
					/>
				</div>
				<button
					onClick={toggleModal}
					className='bg-[#D9D9D9] hover:bg-gray-400 p-2 rounded-lg border-[1px] border-black font-semibold'
				>
					SOAT actual
				</button>
			</section>
			<SoatModal
				isActualSoatOpen={SoatVisible}
				onClose={toggleModal}
				car={car}
			/>

			<section>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full p-4 rounded-lg'
					encType='multipart/form-data'
				>
					{['brand', 'model'].map((field) => (
						<div key={field} className='mb-2'>
							<label htmlFor={field} className='text-gray-700 my-5 capitalize'>
								{field === 'brand' ? 'Marca' : 'Modelo'}
							</label>
							<input
								type='text'
								id={field}
								{...register(field)}
								className='w-full px-3 py-2 border rounded-lg capitalize'
							/>
							{errors[field] && (
								<p className='text-red-500 text-sm mt-1'>
									*{errors[field]?.message}
								</p>
							)}
						</div>
					))}
					<div className='mb-4'>
						<p className='text-gray-700 my-2 capitalize'>Imagen</p>
						<input
							type='file'
							id='vehiclePhoto'
							{...register('vehiclePhoto')}
							accept='image/jpeg, image/png, image/gif'
							className='text-xs sm:text-base w-full'
						/>
					</div>
					{errors.vehiclePhoto && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.vehiclePhoto.message}
						</p>
					)}

					<div className='mb-4'>
						<p className='text-gray-700 my-2 capitalize'>SOAT</p>
						<input
							type='file'
							id='soat'
							{...register('soat')}
							accept='image/jpeg, image/png, image/gif'
							className='text-xs sm:text-base w-full'
						/>
					</div>
					{errors.soat && (
						<p className='text-red-500 text-sm mt-1'>{errors.soat.message}</p>
					)}

					<div className='flex flex-col'>
						<button
							type='submit'
							className='w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase'
						>
							Guardar Cambios
						</button>
						<button className='w-full bg-[#9C0000] text-white py-2 rounded-md font-semibold uppercase mt-3 flex justify-center items-center gap-1'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-[15px] w-[15px] sm:h-[20px] sm:w-[20px]'
								viewBox='0 0 16 16'
							>
								<path
									fill='white'
									d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5'
								/>
							</svg>
							Eliminar vehiculo
						</button>
					</div>
				</form>
			</section>
		</section>
	);
}

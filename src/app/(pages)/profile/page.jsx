'use client';
import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { modifyUser } from '@/app/helpers/api/user';
import { userModifySchema } from '@/app/helpers/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function Page() {
	const { user, setUser } = useAuth();
	const router = useRouter();
	const { setLoading } = useLoading();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userModifySchema),
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
			const patchUser = await modifyUser(data, user.id);
			setUser(patchUser);
			Swal.fire({
				title: 'Excelente!',
				text: 'Cambios Realizados Correctamente',
				icon: 'success',
			});
			router.push('/dashboard');
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

	return (
		<section className=' w-full h-fit flex gap-4 justify-center items-center sm:items-start p-10 flex-col sm:flex-row'>
			<section className='flex flex-col justify-start items-start gap-4'>
				<Link
					className='text-gray-400 hover:text-gray-800 flex'
					href='/dashboard'
				>
					<ChevronLeft /> Volver
				</Link>
				<div className='flex flex-col justify-center items-center gap-4'>
					<Image
						src={user.photo || '/images/anonym.png'}
						alt='Picture of the author'
						width={500}
						height={500}
						priority
						className='rounded-full object-cover max-w-[220px] max-h-[220px] min-w-[220px] min-h-[220px] border-2 sm:min-w-[260px] sm:max-w-[260px] sm:min-h-[260px] sm:max-h-[260px] cursor-pointer sm:border-4 border-[#025C31] '
					/>
				</div>
			</section>

			<section>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full p-4 rounded-lg'
					encType='multipart/form-data'
				>
					{['name', 'lastname', 'contact'].map((field) => (
						<div key={field} className='mb-2'>
							<label htmlFor={field} className='text-gray-700 my-5 capitalize'>
								{field === 'contact'
									? 'Contacto'
									: field === 'name'
										? 'Nombre'
										: field === 'lastname'
											? 'Apellido'
											: ''}
							</label>
							<input
								type='text'
								id={field}
								{...register(field)}
								defaultValue={`${
									field === 'contact'
										? user?.contact
										: field === 'name'
											? user?.name
											: field === 'lastname'
												? user?.lastname
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
						<p className='text-gray-700 my-2 capitalize'>Imagen</p>
						<input
							type='file'
							id='photo'
							{...register('photo')}
							accept='image/jpeg, image/png, image/gif'
							className='text-xs sm:text-base w-full'
						/>
					</div>
					{errors.photo && (
						<p className='text-red-500 text-sm mt-1'>{errors.photo.message}</p>
					)}

					<button
						type='submit'
						className='w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase'
					>
						Guardar Cambios
					</button>
				</form>
			</section>
		</section>
	);
}

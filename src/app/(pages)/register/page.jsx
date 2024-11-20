'use client';
import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { userRegSchema } from '@/app/helpers/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function Page() {
	const router = useRouter();
	const { signup } = useAuth();
	const { setLoading } = useLoading();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userRegSchema),
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
			await signup(data);
			Swal.fire({
				title: 'Excelente!',
				text: 'Usuario Registrado Correctamente',
				icon: 'success',
			});
			router.push('/dashboard');
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
			<Link className='text-gray-400 hover:text-gray-800 flex mb-5' href='/'>
				<ChevronLeft /> Volver
			</Link>
			{['name', 'lastname', 'email', 'id', 'contact', 'password'].map(
				(field) => (
					<div key={field} className='mb-4'>
						<label
							htmlFor={field}
							className='block text-gray-700 mb-2 capitalize'
						>
							{field === 'email'
								? 'Email'
								: field === 'contact'
									? 'Contacto'
									: field === 'name'
										? 'Nombre'
										: field === 'lastname'
											? 'Apellido'
											: field === 'id'
												? 'Id'
												: field === 'password'
													? 'Contraseña'
													: ''}
						</label>
						<input
							type='text'
							id={field}
							{...register(field)}
							placeholder={`e.j: ${
								field === 'email'
									? 'ejemplo@unisabana.edu.co'
									: field === 'contact'
										? '3124567890'
										: field === 'name'
											? 'Pepito'
											: field === 'lastname'
												? 'Perez'
												: field === 'id'
													? '123456'
													: field === 'password'
														? 'P@ssWord_123'
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
				)
			)}
			<div className='mb-4'>
				<input
					type='file'
					id='photo'
					{...register('photo')}
					accept='image/jpeg, image/png, image/gif'
					className='text-xs sm:text-base'
				/>
			</div>
			{errors.photo && (
				<p className='text-red-500 text-sm mt-1'>{errors.photo.message}</p>
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

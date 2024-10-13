'use client';
import { Auth } from '@/app/helpers/api/auth';
import { userRegSchema } from '@/app/helpers/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userRegSchema),
	});

	const onSubmit = async (data) => {
		try {
			await Auth.signup(data);
			Swal.fire({
				title: 'Excelente!',
				text: 'Usuario Registrado Correctamente',
				icon: 'success',
			});
			router.push('/');
		} catch (error) {
			if (isAxiosError(error)) {
				Swal.fire({
					title: 'Error!',
					text: error.response.data.message_error,
					icon: 'error',
				});
			} else {
				Swal.fire({
					title: 'Error!',
					text: 'Error del servidor',
					icon: 'error',
				});
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='max-w-lg mx-auto mt-6 p-4 border rounded-lg'
			encType='multipart/form-data'
		>
			{['name', 'lastname', 'email', 'id', 'contact', 'password'].map(
				(field) => (
					<div key={field} className='mb-4'>
						<label
							htmlFor={field}
							className='block text-gray-700 mb-2 capitalize'
						>
							{field.toUpperCase()}
						</label>
						<input
							type='text'
							id={field}
							{...register(field)}
							placeholder={`e.j: ${
								field === 'email'
									? 'ejemplo@unisabana.edu.co'
									: field === 'contact'
									? '312 456 7890'
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
					{...register('photo')}
					accept='image/jpeg, image/png, image/gif' //
				/>
			</div>
			{errors.photo && (
				<p className='text-red-500 text-sm mt-1'>{errors.photo.message}</p>
			)}

			<button
				type='submit'
				className='w-full bg-green-600 text-white py-2 rounded-md font-semibold'
			>
				Registrarse
			</button>
		</form>
	);
}

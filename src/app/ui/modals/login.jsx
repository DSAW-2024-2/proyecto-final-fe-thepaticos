import { useAuth } from '@/app/contexts/sessionContext';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function ModalLogin({ onClose }) {
	const { signin } = useAuth();
	const router = useRouter();

	const onSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const email = formData.get('email');
		const password = formData.get('password');
		try {
			await signin(email, password);
			Swal.fire({
				title: 'Excelente!',
				text: 'Usuario Logueado Correctamente',
				icon: 'success',
			}).then(() => {
				router.push('/dashboard');
			});
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
		<div
			className='absolute z-10 flex items-center justify-center h-screen w-screen inset-0 bg-gray-500 bg-opacity-80 transition-opacity'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div>
				<button
					className='absolute text-gray-600 rounded-md font-semibold m-2'
					onClick={onClose}
				>
					<ChevronLeft />
				</button>
				<form
					onSubmit={onSubmit}
					className='max-w-lg mx-auto p-4 pt-10 border rounded-lg bg-white'
					encType='multipart/form-data'
				>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-700 mb-2 capitalize'
						>
							Email
						</label>
						<input
							type='text'
							id='email'
							name='email'
							placeholder='ejemplo@unisabana.edu.co'
							className='w-full px-3 py-2 border rounded-lg'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-gray-700 mb-2 capitalize'
						>
							Password
						</label>
						<input
							type='text'
							name='password'
							id='password'
							placeholder='ejemplo@unisabana.edu.co'
							className='w-full px-3 py-2 border rounded-lg'
						/>
					</div>

					<button
						type='submit'
						className='w-full bg-green-600 text-white py-2 rounded-md font-semibold'
					>
						Loguearse
					</button>
				</form>
			</div>
		</div>
	);
}

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
			<div className='w-auto flex justify-center items-center'>
				<form
					onSubmit={onSubmit}
					className='flex flex-col bg-white w-auto rounded-lg'
					encType='multipart/form-data'
				>
					<button className='text-gray-400 flex py-3 px-1' onClick={onClose}>
						<ChevronLeft /> Volver
					</button>
					<section className='p-4 w-auto flex flex-col gap-4'>
						<div className='w-auto'>
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
								className='w-auto min-w-[250px] px-3 py-2 border rounded-lg'
							/>
						</div>
						<div className='w-auto'>
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
								placeholder='ej: P@assWord_123'
								className='w-full px-3 py-2 border rounded-lg'
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-green-600 text-white py-2 rounded-md font-semibold mt-4'
						>
							Iniciar Sesión
						</button>
					</section>
				</form>
			</div>
		</div>
	);
}

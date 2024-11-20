import { useLoading } from '@/app/contexts/loadingContext';
import { useAuth } from '@/app/contexts/sessionContext';
import { isAxiosError } from 'axios';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useEffect, useRef, useState } from 'react';

export default function ModalLogin({ onClose }) {
	const { signin } = useAuth();
	const { setLoading } = useLoading();
	const [typeInput, setInputType] = useState('password');
	const router = useRouter();
	const formRef = useRef(null); // Create a ref for the form

	const onSubmit = async (event) => {
		setLoading(true);
		event.preventDefault();
		const formData = new FormData(event.target);
		const email = formData.get('email');
		const password = formData.get('password');
		try {
			await signin(email, password);
			Swal.fire({
				title: 'Excelente!',
				text: 'Has iniciado sesión correctamente',
				icon: 'success',
			}).then(() => {
				router.push('/dashboard');
			});
		} catch (error) {
			if (isAxiosError(error)) {
				Swal.fire({
					title: 'Error!',
					text: error.response.data.message,
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

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Prevent the default action of Enter key
			if (formRef.current) {
				formRef.current.requestSubmit(); // Simulate a form submission
			}
		}
	};

	useEffect(() => {
		// Adding event listener for keydown
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			// Cleanup the event listener
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div
			className='absolute z-10 flex items-center justify-center h-full w-full inset-0 bg-gray-500 bg-opacity-80 transition-opacity'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div className='w-auto flex justify-center items-center'>
				<form
					ref={formRef} // Attach the ref to the form
					onSubmit={onSubmit}
					className='flex flex-col bg-white w-auto rounded-lg'
					encType='multipart/form-data'
				>
					<button
						className='text-gray-400 hover:text-gray-800 flex py-3 px-1'
						onClick={onClose}
					>
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
							<div className='flex border rounded-lg'>
								<input
									type={typeInput}
									name='password'
									id='password'
									placeholder='ej: P@assWord_123'
									className='w-full px-3 py-2'
								/>
								<button
									type='button'
									onClick={() =>
										setInputType((prev) =>
											prev === 'password' ? 'text' : 'password'
										)
									}
									className='text-gray-400 hover:text-gray-800 border-l px-3'
								>
									{typeInput === 'password' ? <Eye /> : <EyeOff />}
								</button>
							</div>
						</div>
						<button
							type='submit'
							className='w-full bg-[#028747] hover:bg-[#025C31] text-white py-2 rounded-md font-semibold mt-4'
						>
							Iniciar Sesión
						</button>
					</section>
				</form>
			</div>
		</div>
	);
}

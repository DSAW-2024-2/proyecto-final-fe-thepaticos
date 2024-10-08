import React from 'react';
import LoginForm from '../forms/login';
import { ChevronLeft } from 'lucide-react';

export default function ModalLogin({ onClose }) {
	return (
		<div
			className='absolute z-10 flex items-center justify-center h-screen w-screen inset-0 bg-gray-500 bg-opacity-80 transition-opacity'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div>
				<button
					className='absolute text-gray-600 rounded-md font-semibold'
					onClick={onClose}
				>
					<ChevronLeft />
				</button>
				<LoginForm />
			</div>
		</div>
	);
}

'use client';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ModalLogin from './ui/modals/login';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ad from '/public/images/Ad_portas.jpg';
import ad_2 from '/public/images/Ad_portas_2.png';

export default function Home() {
	const searchParams = useSearchParams();
	const message = searchParams.get('message');
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (message === 'loginRequired') {
			Swal.fire({
				title: 'Error!',
				text: 'Debes iniciar sesión primero',
				icon: 'error',
			});
		}
	}, [message]);

	const handleClose = () => {
		setShowModal(false);
	};

	const carousel = [ad, ad_2];
	const [currentIndex, setCurrentIndex] = useState(0);
	const changeImage = (index) => {
		if (0 <= index && index < carousel.length) {
			setCurrentIndex(index);
		}
	};

	return (
		<div className='flex flex-col w-full'>
			{showModal && <ModalLogin onClose={handleClose} />}
			<div className='relative flex-1 shadow-gray-500 shadow-md'>
				<Image
					src={carousel[currentIndex]}
					alt='Modern university building'
					className='w-full min-h-[200px] max-h-[300px] object-cover'
				/>
				<button className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1'>
					<ChevronLeft
						size={24}
						onClick={() => {
							changeImage(currentIndex - 1);
						}}
					/>
				</button>
				<button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1'>
					<ChevronRight
						size={24}
						onClick={() => {
							changeImage(currentIndex + 1);
						}}
					/>
				</button>
			</div>

			<div className='p-4 flex gap-2 justify-end items-start'>
				<div className='flex flex-col p-1 w-1/2 justify-end items-center'>
					<button
						className='bg-[#028747] p-3 w-full max-w-[360px] text-white rounded-md font-semibold mb-3 text-base sm:text-2xl hover:bg-[#025C31]'
						onClick={() => {
							setShowModal(true);
						}}
					>
						Iniciar sesión
					</button>
					<p className='w-full min-w-40 text-xs sm:text-lg flex justify-center gap-2'>
						No tienes cuenta?
						<Link
							href='/register'
							className='text-blue-400 hover:text-blue-900 font-semibold'
						>
							Crea una
						</Link>
					</p>
				</div>
				<p className='flex text-sm sm:text-2xl w-full pl-4'>
					Conecta con tus compañeros y vive viajes inolvidables. Tu comunidad
					universitaria viaja contigo...
				</p>
			</div>
		</div>
	);
}

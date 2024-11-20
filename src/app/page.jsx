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
		<div className='w-full flex flex-col gap-0'>
			{showModal && <ModalLogin onClose={handleClose} />}

			<section className='flex flex-col items-center justify-center bg-gradient-to-r from-[#028747] to-[#025C31] text-white p-10 rounded-t-xl mt-5'>
				<h1 className='text-4xl sm:text-4xl mb-4 text-center'>
					Conecta con tus compañeros y vive viajes inolvidables
				</h1>
				<p className='text-lg sm:text-xl mb-8'>
					Tu comunidad universitaria viaja contigo...
				</p>
				<button
					className='cta-button bg-[#028747] capitaliza p-3 w-full max-w-[360px] text-white font-bold text-xl rounded-md hover:bg-[#025C31] mb-4'
					onClick={() => {
						setShowModal(true);
					}}
				>
					Iniciar Sesión
				</button>
				<p className='min-w-60 text-xs sm:text-lg'>
					¿No tienes cuenta?{' '}
					<Link href='/register' className='text-blue-400'>
						Crea una
					</Link>
				</p>
			</section>

			<div className='relative'>
				<div className='carousel-container'>
					<Image
						src={carousel[currentIndex]}
						alt='carousel image'
						className='carousel-transition h-[400px] object-cover rounded-b-xl'
						priority
					/>
				</div>
				<button
					className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1'
					onClick={() => changeImage(currentIndex - 1)}
				>
					<ChevronLeft size={24} />
				</button>
				<button
					className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1'
					onClick={() => changeImage(currentIndex + 1)}
				>
					<ChevronRight size={24} />
				</button>
			</div>
			<section className='my-16 text-center'>
				<h2 className='text-3xl mb-4 text-center text-[#028747] font-semibold'>
					Lo que dicen nuestros usuarios...
				</h2>
				<div className='flex gap-4 justify-center'>
					<div className='testimonial bg-gray-100 p-4 rounded-md shadow-md w-full max-w-xs'>
						<p>
							"¡Me encanta esta plataforma! Es muy fácil encontrar compañeros
							para compartir viajes."
						</p>
						<p className='text-[#028747]'>- Juan Pérez, Estudiante</p>
					</div>
					<div className='testimonial bg-gray-100 p-4 rounded-md shadow-md w-full max-w-xs'>
						<p>
							"La experiencia de viaje es increíble y segura. ¡Recomiendo 100%!"
						</p>
						<p className='text-[#028747]'>- María López, Estudiante</p>
					</div>
				</div>
			</section>
		</div>
	);
}

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

	const carousel = [ad,ad_2];
	const [currentIndex, setCurrentIndex] = useState(0);
	const changeImage = (index) => {
		if (0 <= index && index < carousel.length ){
			setCurrentIndex(index);
		}
	  };

	return (
		<div className='flex flex-col flex-1'>
			{showModal && <ModalLogin onClose={handleClose} />}
			<div className='relative flex-1'>
				<Image
					src={carousel[currentIndex]}
					alt='Modern university building'
					className='w-full h-48 object-cover shadow-lg'
				/>
				<button className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1'>
					<ChevronLeft size={24} onClick={()=>{changeImage(currentIndex-1)}}/>
				</button>
				<button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1'>
					<ChevronRight size={24} onClick={()=>{changeImage(currentIndex+1)}} />
				</button>
			</div>

			<div className='p-4 flex-1 flex gap-2 '>
				<div className='flex-1 p-1'>
					<button
						className='bg-[#028747] p-3 w-full text-white rounded-md font-semibold mb-3'
						onClick={() => {
							setShowModal(true);
						}}
					>
						Iniciar sesión
					</button>
					<p className='w-full min-w-40 text-xs flex justify-center gap-2'>
						No tienes cuenta?
						<Link href='/register' className='text-blue-500'>
							Crea una
						</Link>
					</p>
				</div>
				<p className='flex-1 text-sm'>
					Conecta con tus compañeros y vive viajes inolvidables. Tu comunidad
					universitaria viaja contigo...
				</p>
			</div>
		</div>
	);
}

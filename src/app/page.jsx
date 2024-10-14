'use client';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ModalLogin from './ui/modals/login';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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
	return (
		<main className='w-full flex flex-col '>
			{showModal && <ModalLogin onClose={handleClose} />}
			<section className='w-full shadow-xl'>
				<img
					src='https://www.unisabana.edu.co/fileadmin/_processed_/8/8/csm_Ad-portas-edificio-unisabana_5925d366bd.jpg'
					alt='Modern university building'
					className='w-full'
				/>
				<button className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1'>
					<ChevronLeft size={24} />
				</button>
				<button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1'>
					<ChevronRight size={24} />
				</button>
			</section>

			<section className='p-5 justify-between flex gap-5'>
				<div className='flex flex-col w-full'>
					<button
						className='bg-[#028747] text-white p-2 rounded-md font-semibold'
						onClick={() => {
							setShowModal(true);
						}}
					>
						Iniciar sesión
					</button>
					<span className='text-xs flex justify-between items-center min-w-full'>
						<p>No tienes cuenta?</p>
						<Link href='/register' className='text-blue-500 w-full'>
							Crea una
						</Link>
					</span>
				</div>
				<p className='flex text-sm'>
					Conecta con tus compañeros y vive viajes inolvidables. Tu comunidad
					universitaria viaja contigo...
				</p>
			</section>
		</main>
	);
}

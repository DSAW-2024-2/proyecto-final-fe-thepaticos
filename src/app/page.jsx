'use client';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ModalLogin from './ui/modals/login';
import { useState } from 'react';

export default function Home() {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => {
		setShowModal(false);
	};
	return (
		<Suspense fallback={<div>Cargando...</div>}>
			<div className='flex flex-col flex-1'>
				{showModal && <ModalLogin onClose={handleClose} />}
				<div className='relative flex-1'>
					<Image
						src='/placeholder.svg'
						alt='Modern university building'
						width={400}
						height={200}
						className='w-full h-48 object-cover'
					/>
					<button className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1'>
						<ChevronLeft size={24} />
					</button>
					<button className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1'>
						<ChevronRight size={24} />
					</button>
				</div>

				<div className='p-6 flex-1 flex gap-2 '>
					<div className='flex-1 p-5'>
						<button
							className='w-full bg-green-600 text-white py-2 rounded-md font-semibold mb-4'
							onClick={() => {
								setShowModal(true);
							}}
						>
							Iniciar sesión
						</button>
						<p className='text-sm flex justify-center gap-2'>
							No tienes cuenta?
							<Link href='/register' className='text-blue-500'>
								Crea una
							</Link>
						</p>
					</div>
					<p className='flex-1'>
						Conecta con tus compañeros y vive viajes inolvidables. Tu comunidad
						universitaria viaja contigo...
					</p>
				</div>
			</div>
		</Suspense>
	);
}

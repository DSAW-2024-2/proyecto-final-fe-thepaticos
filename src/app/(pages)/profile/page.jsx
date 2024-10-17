'use client';
import { useAuth } from '@/app/contexts/sessionContext';
import Image from 'next/image';

export default function Page() {
	const { user, signout } = useAuth();

	return (
		<div className=' w-full h-fit flex gap-4 justify-center items-center p-10 flex-col sm:flex-row'>
			<section className='flex flex-col justify-center items-center gap-4'>
				<Image
					src={user.photo || '/images/anonym.png'}
					alt='Picture of the author'
					width={500}
					height={500}
					className='rounded-full object-cover max-w-[220px] max-h-[220px] min-w-[220px] min-h-[220px] border-2 sm:min-w-[260px] sm:max-w-[260px] sm:min-h-[260px] sm:max-h-[260px] cursor-pointer sm:border-4 border-[sm:border-2 sm:border-[#025C31]]'
				/>
				<button className='w-fit h-fit p-2 bg-[#D9D9D9] rounded-md flex'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-30 h-30'
						viewBox='0 0 24 24'
					>
						<g
							fill='none'
							stroke='black'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
						>
							<path d='M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
							<path d='M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z' />
						</g>
					</svg>
					<p className='w-full'>Editar Imagen</p>
				</button>
			</section>
			<section>
				<h1>Página de perfil protegida</h1>
			</section>
		</div>
	);
}

import { Facebook, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import logo from '/public/images/logo.png';
import { usePathname } from 'next/navigation';

export default function Footer() {
	const pathname = usePathname();
	if (pathname !== '/') {
		return null;
	}

	return (
		<div className='bg-[#028747] text-white p-4 flex justify-between items-center'>
			<div className='flex items-center justify-between gap-2'>
				<a
					href='https://www.facebook.com/groups/950625678281628/?locale=es_LA'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Facebook size={24} />
				</a>
				<a
					href='https://www.instagram.com/parkingwheelsunisabana/?hl=es'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Instagram size={24} />
				</a>
				<a
					href='https://www.youtube.com/user/sabanahoy'
					target='_blank'
					rel='noopener noreferrer'
				>
					<Youtube size={30} />
				</a>
			</div>
			<div className='text-lg flex gap-2 font-semibold'>
				<Image
					src={logo}
					alt='Logo Wheel US'
					className='w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]'
				/>
				WHEEL US
			</div>
		</div>
	);
}

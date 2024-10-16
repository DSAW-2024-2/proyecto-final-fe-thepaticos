import { Facebook, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import logo from '/public/images/logo.png';
import { usePathname } from 'next/navigation'; // Import usePathname

export default function Footer() {
	const pathname = usePathname();
	if (pathname !== '/') {
		return null;
	}

	return (
		<div className='bg-[#028747] text-white p-4 flex justify-between items-center'>
			<div className='flex items-center justify-between gap-2'>
				<Facebook size={24} />
				<Instagram size={24} />
				<Youtube size={30} />
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

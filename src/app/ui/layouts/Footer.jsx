import { Facebook, Instagram, Youtube } from 'lucide-react';
export default function Footer() {
	return (
		<div className='bg-[#028747] text-white p-4 flex justify-between items-center'>
			<div className='flex gap-1 justify-center items-center'>
				<Facebook size={24} />
				<Instagram size={24} />
				<Youtube size={30} />
			</div>
			<div className='text-lg font-bold'>WHEEL US</div>
		</div>
	);
}
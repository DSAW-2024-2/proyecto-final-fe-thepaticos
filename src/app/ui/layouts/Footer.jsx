import { Facebook, Instagram, Youtube } from 'lucide-react';
export default function Footer() {
	return (
		<div className='bg-green-600 text-white p-4 flex justify-between items-center'>
			<div className='flex space-x-4'>
				<Facebook size={24} />
				<Instagram size={24} />
				<Youtube size={24} />
			</div>
			<div className='text-lg font-bold'>WHEEL US</div>
		</div>
	);
}

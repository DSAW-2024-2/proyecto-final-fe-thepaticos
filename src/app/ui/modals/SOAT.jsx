import Image from 'next/image';

export default function SoatModal({ car, isActualSoatOpen, onClose }) {
	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	if (!isActualSoatOpen) {
		return null;
	}

	return (
		<div
			className='absolute z-10 flex items-center justify-center h-full w-full inset-0 bg-gray-500 bg-opacity-80 transition-opacity'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
			onClick={handleClose}
		>
			<div
				className='bg-white rounded-lg p-3 w-fit h-fit flex flex-col justify-end items-end'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex flex-col justify-center items-center gap-4'>
					<Image
						src={car.SOAT || '/images/anonym.png'}
						alt='Foto del vehiculo'
						width={500}
						height={500}
						priority
						className='object-cover w-full h-fit overflow-auto border-2 border-black rounded-lg'
					/>
				</div>
			</div>
		</div>
	);
}

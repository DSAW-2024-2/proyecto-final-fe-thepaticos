import { useState, useEffect } from 'react';
import { getRideById } from '@/app/helpers/api/ride';

export default function TripDetailsModal({
	rideId,
	isTripDetailsOpen,
	onClose,
}) {
	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	const [ride, setRide] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getRide = async () => {
			if (!rideId) return;

			setLoading(true);
			try {
				const rideData = await getRideById(rideId);
				setRide(rideData);
			} catch (error) {
				console.error('Error fetching ride:', error);
			} finally {
				setLoading(false);
			}
		};

		getRide();

		return () => {
			setRide(null);
		};
	}, [rideId]);

	if (!isTripDetailsOpen) {
		return null;
	}

	return (
		<div
			className='absolute z-10 flex items-center justify-center h-screen w-screen inset-0 bg-gray-500 bg-opacity-80 transition-opacity'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
			onClick={handleClose}
		>
			<div
				className='bg-white rounded-lg p-6'
				onClick={(e) => e.stopPropagation()}
			>
				{' '}
				<button onClick={handleClose}>X</button>
				<h2 id='modal-title'>
					{loading ? 'Loading...' : ride ? 'Sucess' : 'Ride not found'}
				</h2>
				{ride ? <pre>{JSON.stringify(ride, null, 2)}</pre> : <p>Loading...</p>}
			</div>
		</div>
	);
}

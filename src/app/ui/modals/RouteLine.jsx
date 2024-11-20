'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { MapWithAddresses } from '../components/Maps/RouteMap';
import useGoogleMaps from '../../hooks/useMap';
import { RingLoader } from 'react-spinners';
import RouteLineItem from '../components/Maps/RouteLineItem';

export default function RouteLine({ items = [] }) {
	const [showModal, setShowModal] = useState(false);
	const modalRef = useRef(null);

	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	const isGoogleMapsLoaded = useGoogleMaps(apiKey);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, []);

	const handleOutsideClick = useCallback(
		(event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				closeModal();
			}
		},
		[closeModal]
	);

	useEffect(() => {
		if (showModal) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [showModal, handleOutsideClick]);

	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className='px-4 py-2 bg-[#028747] text-white rounded-md hover:bg-[#025C31] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
			>
				Ver ruta
			</button>
			{showModal && (
				<div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center'>
					<div
						ref={modalRef}
						className='bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 relative'
					>
						<button
							onClick={closeModal}
							className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
							aria-label='Cerrar modal'
						>
							<X className='h-6 w-6' />
						</button>
						<div className='p-4'>
							<h2 className='text-2xl font-bold mb-4'>Mapa de la Ruta</h2>
							<div className='flex'>
								{isGoogleMapsLoaded && (
									<div className='w-full h-[60vh] rounded-lg overflow-hidden'>
										<MapWithAddresses addresses={items} />
									</div>
								)}
								{!isGoogleMapsLoaded && <RingLoader />}
								<div className='w-1/2 h-[60vh] rounded-lg overflow-hidden'>
									<RouteLineItem items={items} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

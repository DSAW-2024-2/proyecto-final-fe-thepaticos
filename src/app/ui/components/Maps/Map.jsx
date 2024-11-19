import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useGoogleMaps from '../../../hooks/useMap';
import { RingLoader } from 'react-spinners';

const containerStyle = {
	width: '100%',
	height: '400px',
};

const sabanaLocation = {
	lat: 4.8609881,
	lng: -74.0332402879779,
};

const sabanaAddress = 'Universidad de La Sabana, Chía, Colombia';

const center = {
	lat: 4.8609881,
	lng: -74.0332402879779,
};

const MyMapComponent = () => {
	const [isSabanaStart, setIsSabanaStart] = useState(null);
	const [markers, setMarkers] = useState([sabanaLocation]);
	const [addresses, setAddressesState] = useState([sabanaAddress]);
	const [showQuestion, setShowQuestion] = useState(true);
	const [directions, setDirections] = useState(null);
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	const isGoogleMapsLoaded = useGoogleMaps(apiKey);

	const calculateRoute = useCallback(() => {
		if (markers.length < 2) return;

		const directionsService = new window.google.maps.DirectionsService();
		const waypoints = markers
			.slice(1, -1)
			.map((marker) => ({ location: marker, stopover: true }));

		directionsService.route(
			{
				origin: markers[0],
				destination: markers[markers.length - 1],
				waypoints,
				travelMode: window.google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					setDirections(result);
				} else {
					Swal.fire({
						title: 'Error!',
						text: 'Error del servidor al calcular la ruta',
						icon: 'error',
					});
				}
			}
		);
	}, [markers]);

	useEffect(() => {
		calculateRoute();
	}, [markers, calculateRoute]);

	const onMapClick = (event) => {
		if (markers.length >= 5) {
			Swal.fire({
				icon: 'warning',
				title: 'Límite alcanzado',
				text: 'Solo puedes realizar hasta 5 paradas!',
			});
			return;
		}

		const latLng = event.latLng;
		const newMarker = { lat: latLng.lat(), lng: latLng.lng() };
		setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

		const geocoder = new window.google.maps.Geocoder();
		geocoder
			.geocode({ location: latLng })
			.then((response) => {
				const address =
					response.results[0]?.formatted_address || 'Dirección no encontrada';
				setAddressesState((prevAddresses) => {
					const updatedAddresses = [...prevAddresses, address];
					setAddressesState(updatedAddresses);
					return updatedAddresses;
				});
			})
			.catch(() => {
				const errorAddress = 'Error with geocoding';
				setAddressesState((prevAddresses) => {
					const updatedAddresses = [...prevAddresses, errorAddress];
					setAddressesState(updatedAddresses);
					return updatedAddresses;
				});
			});
	};

	const onMarkerClick = (index) => {
		if (markers.length > 2) {
			if (
				(index === 0 && isSabanaStart) ||
				(index === markers.length - 1 && !isSabanaStart)
			) {
				return;
			}
			Swal.fire({
				title: 'Eliminar parada',
				text: `¿Deseas eliminar la parada ${index + 1}?`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#9C0000',
				cancelButtonColor: '#028747',
				confirmButtonText: 'Si, eliminar!',
			}).then((result) => {
				if (result.isConfirmed) {
					setMarkers((prevMarkers) =>
						prevMarkers.filter((_, i) => i !== index)
					);
					setAddressesState((prevAddresses) => {
						const updatedAddresses = prevAddresses.filter(
							(_, i) => i !== index
						);
						setAddressesState(updatedAddresses);
						return updatedAddresses;
					});
					Swal.fire(
						'Eliminada!',
						`Se elimino la parada ${index + 1}`,
						'success'
					);
				}
			});
		} else if (markers.length <= 2) {
			Swal.fire({
				icon: 'warning',
				title: 'No se puede borrar la parada',
				text: 'Debes elegir al menos dos paradas',
			});
		}
	};

	const finalMarkers = isSabanaStart
		? [sabanaLocation, ...markers.slice(1)]
		: [...markers.slice(1), sabanaLocation];

	const finalAddresses = isSabanaStart
		? [sabanaAddress, ...addresses.slice(1)]
		: [...addresses.slice(1), sabanaAddress];

	const handleSabanaChoice = (choice) => {
		setIsSabanaStart(choice);
		setShowQuestion(false);
	};

	const renderQuestionModal = () => (
		<div className='flex flex-col justify-center items-center p-4 text-center mb-4 rounded-lg w-80'>
			<h2 className='text-lg mb-6'>
				¿Esta ruta inicia o termina en la Universidad de la Sabana?
			</h2>
			<div className='flex space-x-4'>
				<button
					className='bg-[#028747] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#025C31]'
					onClick={() => handleSabanaChoice(true)}
				>
					Inicia
				</button>
				<button
					className='bg-[#028747] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#025C31]'
					onClick={() => handleSabanaChoice(false)}
				>
					Termina
				</button>
			</div>
		</div>
	);

	if (showQuestion) {
		return renderQuestionModal();
	}

	return (
		<>
			{isGoogleMapsLoaded && (
				<>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={12}
						onClick={onMapClick}
						options={{ streetViewControl: false }}
					>
						{finalMarkers.map((marker, index) => (
							<Marker
								key={index}
								position={marker}
								onClick={() => onMarkerClick(index)}
							/>
						))}
						{directions && <DirectionsRenderer directions={directions} />}
					</GoogleMap>

					<div className='flex flex-col w-full my-5'>
						<h3 className='text-lg font-semibold mb-3'>Lista de Paradas:</h3>
						{finalAddresses.length === 0 ? (
							<p>No hay ubicaciones disponibles aún.</p>
						) : (
							<ul className='space-y-1 list-disc pl-5' id='paradas'>
								{finalAddresses.map((address, index) => (
									<li key={index} className='text-sm'>
										{`Parada ${index + 1}: ${address.replace(', Colombia', '')}`}
									</li>
								))}
							</ul>
						)}
					</div>
				</>
			)}
			{!isGoogleMapsLoaded && <RingLoader />}
		</>
	);
};

export default MyMapComponent;

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Swal from 'sweetalert2';

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
	const [addresses, setAddresses] = useState([sabanaAddress]);
	const [showQuestion, setShowQuestion] = useState(true);
	const [hoveredMarker, setHoveredMarker] = useState(null);

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
				if (response.results[0]) {
					setAddresses((prevAddresses) => [
						...prevAddresses,
						response.results[0].formatted_address,
					]);
				} else {
					setAddresses((prevAddresses) => [
						...prevAddresses,
						'Dirección no encontrada',
					]);
				}
			})
			.catch(() => {
				setAddresses((prevAddresses) => [
					...prevAddresses,
					'Error with geocoding',
				]);
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
					setAddresses((prevAddresses) =>
						prevAddresses.filter((_, i) => i !== index)
					);
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
		<div className='flex flex-col justify-center items-center p-4 mb-4 rounded-lg shadow-lg w-80'>
			<h2 className='text-lg font-semibold mb-6'>
				¿Esta ruta inicia o termina en la Universidad de la Sabana?
			</h2>
			<div className='flex space-x-4'>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-400'
					onClick={() => handleSabanaChoice(true)}
				>
					Inicia
				</button>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-400'
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

	const key = 'AIzaSyCA108_XZ3nzqyzm_GWS9haD8pMOzQPGDQ';

	return (
		<LoadScript googleMapsApiKey={key}>
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
						onMouseOver={() => setHoveredMarker(index)}
						onMouseOut={() => setHoveredMarker(null)}
					/>
				))}
				{hoveredMarker !== null && (
					<div className='absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md z-10 w-fit'>
						<p>{`Parada ${hoveredMarker + 1}: ${finalAddresses[hoveredMarker]}`}</p>
					</div>
				)}
			</GoogleMap>

			<div className='flex flex-col w-full my-5'>
				<h3 className='text-lg font-semibold mb-3'>Lista de Paradas:</h3>
				{finalAddresses.length === 0 ? (
					<p>No hay ubicaciones disponibles aún.</p>
				) : (
					<ul className='space-y-1 list-disc pl-5'>
						{finalAddresses.map((address, index) => (
							<li key={index} className='text-sm'>
								{`Parada ${index + 1}: ${address.replace(', Colombia', '')}`}
							</li>
						))}
					</ul>
				)}
			</div>
		</LoadScript>
	);
};

export default MyMapComponent;

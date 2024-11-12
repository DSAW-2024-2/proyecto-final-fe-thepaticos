import { reverseGeocodeAndShowMarker } from '@/app/helpers/api/map';
import { icon } from 'leaflet';
import React, { useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from 'react-leaflet';

const defaultIcon = icon({
	iconUrl: '/icons/map-pin.svg',
	iconSize: [35, 51],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

const MapView = () => {
	const [markers, setMarkers] = useState([]);
	const [route, setRoute] = useState(null);

	// Función que se ejecutará al hacer clic en el mapa
	const handleMapClick = async (e) => {
		await reverseGeocodeAndShowMarker(e.latlng.lat, e.latlng.lng);
		const newMarker = {
			id: Date.now(), // id único para cada marcador
			position: e.latlng,
			info: `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`,
		};
		console.log();
		
		setMarkers([...markers, newMarker]);
	};

	// Manejar el clic en un marcador para eliminarlo
	const handleMarkerClick = (id) => {
		setMarkers(markers.filter((marker) => marker.id !== id));
	};

	// Componente para capturar eventos del mapa
	const MapClickHandler = () => {
		useMapEvents({
			click: handleMapClick,
		});
		return null;
	};

	return (
		<MapContainer
			center={[4.86329, -74.03502]}
			zoom={13}
			style={{ height: '100vh', width: '100%', zIndex: 0 }}
		>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapClickHandler />

			{/* Mostrar marcadores con la opción de eliminarlos al hacer clic */}
			{markers.map((marker) => (
				<Marker
					key={marker.id}
					position={marker.position}
					icon={defaultIcon}
					eventHandlers={{
						click: () => handleMarkerClick(marker.id),
					}}
				>
					<Popup>{marker.info}</Popup>
				</Marker>
			))}

			{/* Aquí puedes agregar el componente para la ruta, que veremos en el siguiente paso */}
		</MapContainer>
	);
};

export default MapView;

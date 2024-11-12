'use client';
import L from 'leaflet';
import { reverseGeocodeAndShowMarker } from '@/app/helpers/api/map';
import { icon } from 'leaflet';
import React, { useState, useRef } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from 'react-leaflet';

const markIcon = icon({
	iconUrl: '/icons/map-pin.svg',
	iconSize: [35, 51],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

const universityPosition = [4.86329, -74.03502];

const MapView = ({ setRoute }) => {
	const [markers, setMarkers] = useState([]);
	const [isUniversityStart, setIsUniversityStart] = useState(null);
	const [isRouteSet, setIsRouteSet] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const routeRef = useRef(null);
	const handleUniversityChoice = (choice) => {
		setIsUniversityStart(choice === 'origin');
		const universityMarker = {
			id: choice,
			position: universityPosition,
			info: 'Universidad',
			name: 'Universidad de la Sabana',
		};
		setMarkers([universityMarker]);
		setRoute([universityMarker]);
	};

	const handleMapClick = async (e, map) => {
		const name = await reverseGeocodeAndShowMarker(e.latlng.lat, e.latlng.lng);
		if (!isRouteSet) {
			setIsLoading(true);
			const newMarker = {
				id: isUniversityStart ? 'destination' : 'origin',
				position: e.latlng,
				info: `Destino: Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`,
				name: isUniversityStart ? 'Universidad de la Sabana' : name,
			};
			setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
			setRoute((prevMarkers) => [...prevMarkers, newMarker]);
			setIsRouteSet(true);
			setIsLoading(false);

			const start = isUniversityStart ? markers[0].position : e.latlng;
			const end = isUniversityStart ? e.latlng : markers[0].position;

			// Crear la polilínea y guardarla en routeRef
			routeRef.current = L.polyline([start, end], { color: 'blue' }).addTo(map);
		} else {
			// Verifica si el clic está cerca de la línea
			const nearestPoint = routeRef.current.closestLayerPoint(
				map.latLngToLayerPoint(e.latlng)
			);
			const isNearRoute = nearestPoint && nearestPoint.distance <= 100; // Define la tolerancia en pixeles

			if (isNearRoute) {
				const newMarker = {
					id: Date.now(),
					position: e.latlng,
					info: `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`,
					name: name,
				};
				setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
				setRoute((prevMarkers) => [...prevMarkers, newMarker]);
			}
		}
	};

	const handleMarkerClick = (id) => {
		if (id !== 'origin' && id !== 'destination') {
			setMarkers(markers.filter((marker) => marker.id !== id));
			setRoute(markers.filter((marker) => marker.id !== id));
		}
	};

	const MapContent = () => {
		const map = useMap();
		useMapEvents({
			click: (e) => handleMapClick(e, map),
		});

		return (
			<>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{markers.map((marker) => (
					<Marker
						key={marker.id}
						position={marker.position}
						icon={markIcon}
						eventHandlers={{
							click: () => handleMarkerClick(marker.id),
						}}
					>
						<Popup>{marker.info}</Popup>
					</Marker>
				))}
			</>
		);
	};

	if (isUniversityStart === null) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '40vh',
				}}
			>
				<h2
					style={{
						fontSize: '1.5rem',
						fontWeight: 'bold',
						marginBottom: '1rem',
					}}
				>
					¿Dónde comienza tu viaje?
				</h2>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.5rem',
					}}
				>
					<label
						style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
					>
						<input
							type='radio'
							name='universityChoice'
							value='origin'
							onChange={() => handleUniversityChoice('origin')}
						/>
						Inicio en la universidad
					</label>
					<label
						style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
					>
						<input
							type='radio'
							name='universityChoice'
							value='destination'
							onChange={() => handleUniversityChoice('destination')}
						/>
						Termino en la universidad
					</label>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				position: 'relative',
				height: '40vh',
				width: '100%',
				zIndex: '0',
			}}
		>
			<MapContainer
				center={universityPosition}
				zoom={13}
				style={{ height: '100%', width: '100%' }}
			>
				<MapContent />
			</MapContainer>
			{!isRouteSet && (
				<div
					style={{
						position: 'absolute',
						top: '1rem',
						left: '50%',
						transform: 'translateX(-50%)',
						backgroundColor: 'white',
						padding: '1rem',
						borderRadius: '0.25rem',
						boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
						zIndex: 1000,
					}}
				>
					<p style={{ textAlign: 'center' }}>
						{isUniversityStart
							? 'Haz clic en el mapa para seleccionar tu destino'
							: 'Haz clic en el mapa para seleccionar tu punto de partida'}
					</p>
				</div>
			)}
			{isLoading && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundColor: 'rgba(0,0,0,0.5)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1001,
					}}
				>
					<div
						style={{
							width: '4rem',
							height: '4rem',
							border: '4px solid white',
							borderTopColor: 'transparent',
							borderRadius: '50%',
							animation: 'spin 1s linear infinite',
						}}
					></div>
				</div>
			)}
			<style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
		</div>
	);
};

export default MapView;

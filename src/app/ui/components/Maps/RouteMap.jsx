'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
	width: 'full',
	height: '60vh',
};

const center = {
	lat: 4.8609881,
	lng: -74.0332402879779,
};

export const MapWithAddresses = ({ addresses }) => {
	const [markers, setMarkers] = useState([]);
	const [directionsResponse, setDirectionsResponse] = useState(null);

	const geocodeAddresses = useCallback(async () => {
		const geocoder = new window.google.maps.Geocoder();
		const markerPromises = addresses.map((address) =>
			geocoder.geocode({ address }).then((result) => {
				if (result.results.length > 0) {
					const location = result.results[0].geometry.location;
					return { lat: location.lat(), lng: location.lng() };
				}
				return null;
			})
		);
		// eslint-disable-next-line no-undef
		const resolvedMarkers = await Promise.all(markerPromises);
		setMarkers(resolvedMarkers.filter((marker) => marker !== null));
	}, [addresses]);

	const calculateRoute = useCallback(async () => {
		if (markers.length < 2) return;

		const directionsService = new window.google.maps.DirectionsService();
		const waypoints = markers.slice(1, -1).map((location) => ({
			location,
			stopover: true,
		}));

		const result = await directionsService.route({
			origin: markers[0],
			destination: markers[markers.length - 1],
			waypoints,
			travelMode: window.google.maps.TravelMode.DRIVING,
		});

		setDirectionsResponse(result);
	}, [markers]);

	const handleMapLoad = useCallback(async () => {
		if (addresses.length > 0) {
			await geocodeAddresses();
		}
	}, [addresses, geocodeAddresses]);
	useEffect(() => {
		handleMapLoad();
		calculateRoute();
	}, [markers, calculateRoute, handleMapLoad]);

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={12}
			options={{
				gestureHandling: 'greedy',
			}}
		>
			{markers.map((marker, index) => (
				<Marker
					key={index}
					position={marker}
					label={{
						text: String.fromCharCode(65 + index),
						color: 'white',
						fontSize: '14px',
					}}
				/>
			))}
			{directionsResponse && (
				<DirectionsRenderer directions={directionsResponse} />
			)}
		</GoogleMap>
	);
};

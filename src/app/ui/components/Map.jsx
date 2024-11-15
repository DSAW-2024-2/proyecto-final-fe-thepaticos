import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
	console.error(
		'Google Maps API key is not defined. Please check your .env file.'
	);
}

const containerStyle = {
	width: '100%',
	height: '400px',
};

const center = {
	lat: 4.8609881, // Latitude for Universidad de La Sabana (example)
	lng: -74.0332402879779, // Longitude for Universidad de La Sabana
};

const MyMapComponent = () => {
	return googleMapsApiKey ? (
		<LoadScript googleMapsApiKey={googleMapsApiKey}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	) : (
		<p>Error: Google Maps API key is missing.</p>
	);
};

export default MyMapComponent;

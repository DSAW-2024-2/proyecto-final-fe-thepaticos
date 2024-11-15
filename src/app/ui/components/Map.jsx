import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const containerStyle = {
	width: '100%',
	height: '400px',
};

const center = {
	lat: 4.8609881, // Latitud de Nueva York
	lng: -74.0332402879779, // Longitud de Nueva York
};

const MyMapComponent = () => {
	return (
		<LoadScript googleMapsApiKey={googleMapsApiKey}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	);
};

export default MyMapComponent;

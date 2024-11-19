import { useState, useEffect } from 'react';

const useGoogleMaps = (apiKey) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Verificar si el script ya está cargado
		if (document.querySelector('script[src*="maps.googleapis.com"]')) {
			setIsLoaded(true);
			return;
		}

		// Cargar el script de Google Maps
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
		script.async = true;
		script.defer = true; // Mejora la carga asíncrona
		script.onload = () => setIsLoaded(true);
		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, [apiKey]);

	return isLoaded;
};

export default useGoogleMaps;

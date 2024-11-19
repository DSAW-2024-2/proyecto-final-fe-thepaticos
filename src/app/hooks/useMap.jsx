import { useState, useEffect } from 'react';

const useGoogleMaps = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const existingScript = document.querySelector(
			'script[src*="maps.googleapis.com"]'
		);
		if (existingScript) {
			existingScript.onload = () => setIsLoaded(true);
			return;
		}
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
		script.async = true;
		script.defer = true;

		script.onload = () => setIsLoaded(true);
		script.onerror = () => setError('Failed to load Google Maps script.');

		document.head.appendChild(script);

		return () => {
			if (script.parentNode) {
				document.head.removeChild(script);
			}
		};
	}, []);

	return { isLoaded, error };
};

export default useGoogleMaps;

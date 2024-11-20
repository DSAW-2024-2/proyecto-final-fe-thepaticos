import axios from 'axios';

const api = axios.create({
	baseURL: `${'https://nominatim.openstreetmap.org/'}`,
});

export async function reverseGeocodeAndShowMarker(latitude, longitude) {
	const url = `reverse?format=json&lat=${latitude}&lon=${longitude}`;
	const res = await api.get(url);
	const formattedAddress = res.data.display_name
		.split(',')
		.slice(0, 3)
		.join('');

	return formattedAddress;
}

import axios from 'axios';
import L from 'leaflet';

const api = axios.create({
	baseURL: `${'https://nominatim.openstreetmap.org/'}`,
});

export async function reverseGeocodeAndShowMarker(latitude, longitude) {
	const url = `reverse?format=json&lat=${latitude}&lon=${longitude}`;
	const res = await api.get(url);
	console.log(res.data);
}

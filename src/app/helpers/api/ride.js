import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
	headers: {
		Authorization: `Bearer ${Cookies.get('authToken')}`,
	},
});
export async function getAvaliableRides({
	origin = '',
	destination = '',
	seats = 1,
}) {
	const res = await api.get(
		`/ride?origin=${origin}&destination=${destination}&seats=${seats}`
	);
	return res.data.rides;
}
export async function getOrigins() {
	const res = await api.get('/ride/start-routes');

	return res.data.origins;
}
export async function getDestinations() {
	const res = await api.get('/ride/end-routes');

	return res.data.destinations;
}
export async function getRideById(rideId) {
	const res = await api.get(`/ride/${rideId}`);
	return res.data.ride;
}
export async function createRide(data) {
	const res = await api.post('/ride/', data);
	return res;
}

export async function deleteRide(rideId) {
	const res = await api.delete(`/ride/${rideId}`);
	return res;
}

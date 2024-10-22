import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
	headers: {
		Authorization: `Bearer ${Cookies.get('authToken')}`,
	},
});
export async function getAvaliableRides() {
	const res = await api.get(`/ride/`);

	return res.data.rides;
}

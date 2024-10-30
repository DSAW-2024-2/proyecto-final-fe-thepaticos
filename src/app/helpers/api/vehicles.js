import axios from 'axios';
import Cookies from 'js-cookie';

// Create a base API instance without authorization header
const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

// Function to set the authorization header
const setAuthHeader = () => {
	const token = Cookies.get('authToken');
	if (token) {
		api.defaults.headers['Authorization'] = `Bearer ${token}`;
	} else {
		delete api.defaults.headers['Authorization']; // Remove the header if no token
	}
};

export async function createVehicle(newData, userId) {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	setAuthHeader(); // Ensure the header is set before the request

	const formData = new FormData();
	formData.append('brand', newData.brand);
	formData.append('model', newData.model);
	formData.append('plate', newData.plate);
	formData.append('seats', newData.seats);
	formData.append('id_driver', userId);

	if (newData.vehiclePhoto && newData.vehiclePhoto.length > 0) {
		formData.append('vehiclePhoto', newData.vehiclePhoto[0]);
	}
	if (newData.soat && newData.soat.length > 0) {
		formData.append('soat', newData.soat[0]);
	}

	await api.post('/vehicle/', formData, config);
}

export async function modifyVehicle(updateData, plate) {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	setAuthHeader(); // Ensure the header is set before the request

	const formData = new FormData();
	formData.append('brand', updateData.brand);
	formData.append('model', updateData.model);
	if (updateData.vehiclePhoto && updateData.vehiclePhoto.length > 0) {
		formData.append('vehiclePhoto', updateData.vehiclePhoto[0]);
	}
	if (updateData.soat && updateData.soat.length > 0) {
		formData.append('soat', updateData.soat[0]);
	}

	await api.patch(`/vehicle/${plate}`, formData, config);
}

export async function getVehicleByPlate(plate) {
	setAuthHeader(); // Ensure the header is set before the request

	const res = await api.get(`/vehicle/${plate}`);
	return res.data.vehicle;
}

export async function getVehicleRides(plate) {
	setAuthHeader(); // Ensure the header is set before the request

	const res = await api.get(`/vehicle/${plate}/rides`);
	return res.data.vehicleRides;
}

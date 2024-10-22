import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
	headers: {
		Authorization: `Bearer ${Cookies.get('authToken')}`, // Ensure correct Bearer prefix
	},
});
export async function createVehicle(newData, userId) {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	const formData = new FormData();

	formData.append('brand', newData.brand);
	formData.append('model', newData.model);
	formData.append('plate', newData.plate);
	formData.append('seats', newData.seats);
	formData.append('id_driver', userId);

	// Añadir archivos (debe ser newData.vehiclePhoto[0] si es un FileList)
	if (newData.vehiclePhoto && newData.vehiclePhoto.length > 0) {
		formData.append('vehiclePhoto', newData.vehiclePhoto[0]); // Asocia la imagen del vehículo
	}
	if (newData.soat && newData.soat.length > 0) {
		formData.append('soat', newData.soat[0]); // Asocia la imagen del SOAT
	}

	await api.post('/vehicle/', formData, config);
}
export async function getVehicleByPlate(plate) {
	const res = await api.get(`/vehicle/${plate}`);
    
	return res.data.vehicle;
}

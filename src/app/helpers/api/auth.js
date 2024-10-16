import axios from 'axios';

const api = axios.create({
	baseURL: 'https://proyecto-final-be-thepaticos.vercel.app',
});
export class Auth {
	static async signin({ email, password }) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({ email, password });
		const res = await api.post('/auth/login', body, config);
		return res.data.accessToken;
	}
	static async signup(data) {
		const formData = new FormData();
		if (data.photo instanceof FileList && data.photo.length > 0) {
			formData.append('profilePhoto', data.photo[0]); // Enviamos solo el primer archivo como 'profilePhoto'
		} else if (data.photo instanceof File) {
			formData.append('profilePhoto', data.photo); // Si es un archivo ya
		}

		// Agregar el resto de los datos al FormData
		for (const key in data) {
			if (key !== 'photo' && key in data) {
				formData.append(key, data[key]);
			}
		}
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const res = await api.post('/auth/register', formData, config);
		return res.data.accessToken;
	}
	static async getUserByToken(token) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`, // Ensure correct Bearer prefix
			},
		};
		const res = await api.get('/user/', config);
		return res.data;
	}
}

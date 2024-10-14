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
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
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
}

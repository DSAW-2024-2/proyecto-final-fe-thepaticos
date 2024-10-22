import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});
export async function authSignin({ email, password }) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ email, password });
	const res = await api.post('/auth/login', body, config);
	return res.data.accessToken;
}
export async function authSignup(data) {
	const formData = new FormData();
	if (data.photo && data.photo.length > 0) {
		formData.append('profilePhoto', data.photo[0]);
	}

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
export async function getUserByToken(token) {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await api.get('/user/', config);
	return res.data.user;
}

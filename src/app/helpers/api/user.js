import axios from 'axios';
import Cookies from 'js-cookie';
import { getUserByToken } from './auth';

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
	headers: {
		Authorization: `Bearer ${Cookies.get('authToken')}`,
	},
});
export async function modifyUser(newData, userId) {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	const { name, lastname, contact, photo } = newData;
	const formData = new FormData();
	formData.append('name', name);
	formData.append('lastname', lastname);
	formData.append('contact', contact);
	if (photo && photo.length > 0) {
		formData.append('profilePhoto', photo[0]);
	}
	const res = await api.patch(`user/${userId}`, formData, config);
	if (res.status === 200) {
		const newDataUser = await getUserByToken(Cookies.get('authToken'));

		return newDataUser;
	}
}
export async function getUserReservations(userId) {
	const res = await api.get(`/user/${userId}/rides`);
	return res.data.userRides;
}

export async function getUserById(userId) {
	const res = await api.get(`/user/${userId}`);
	return res.data.user;
}

export async function bookRide(userId, rideId, arrivalPoints) {
	const data = {
		rideId: rideId,
		arrivalPoints: arrivalPoints,
	};
	const res = await api.patch(`/user/${userId}/rides`, data);
	return res;
}

export async function deleteBooking(userId, rideId, point) {
	const res = await api.delete(`/user/${userId}/rides`, {
		params: { rideId, point },
	});
	return res;
}

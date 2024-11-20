import React, { createContext, useState, useEffect } from 'react';
import { getNotifications } from '../helpers/api/user';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		if (Cookies.get('authToken')) {
			const interval = setInterval(async () => {
				const notifications = await getNotifications();
				if (notifications.length > 0) {
					notifications.map((notification) => {
						toast.info(notification, {
							autoClose: 5000,
						});
					});
				}
				setNotifications(notifications);
			}, 10000);
			return () => clearInterval(interval);
		}
	}, [notifications]);

	return (
		<>
			<ToastContainer />
			<NotificationsContext.Provider value={{ notifications }}>
				{children}
			</NotificationsContext.Provider>
		</>
	);
};

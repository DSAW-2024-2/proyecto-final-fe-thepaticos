import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Auth } from '../helpers/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = Cookies.get('authToken');
		if (token) {
			// Aquí podrías hacer una llamada a tu API para obtener la información del usuario
			setUser({ token }); // Ajusta según la estructura de tu usuario
		}
	}, []);
	const signup = async (data) => {
		const token = await Auth.signup(data);
		Cookies.set('authToken', token, {
			path: '/',
			sameSite: 'Strict',
		});
		setUser({ token }); // Ajusta según la estructura de tu usuario
	};

	const signin = async (email, password) => {
		const token = await Auth.signin({ email, password });
		Cookies.set('authToken', token, {
			path: '/',
			sameSite: 'Strict',
		});
		setUser({ token }); // Ajusta según la estructura de tu usuario
	};

	const signout = () => {
		Cookies.remove('authToken');
		setUser(null);
		router.push('/');
	};

	return (
		<AuthContext.Provider value={{ user, signin, signout, signup }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook para usar el contexto
export const useAuth = () => {
	return useContext(AuthContext);
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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

	const signin = async (email, password) => {
		// Aquí llamas a tu función signin para obtener el token
		const token = await Auth.signin({ email, password });
		setUser({ token }); // Ajusta según la estructura de tu usuario
	};

	const signout = () => {
		Cookies.remove('authToken');
		setUser(null);
		router.push('/');
	};

	return (
		<AuthContext.Provider value={{ user, signin, signout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook para usar el contexto
export const useAuth = () => {
	return useContext(AuthContext);
};

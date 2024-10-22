'use client';
import { createContext, useContext, useState } from 'react';
import { useAuth } from './sessionContext';
const RolContext = createContext();

export const RolProvider = ({ children }) => {
	const { user } = useAuth();
	const [currentRole, setCurrentRole] = useState('passenger');

	const changeCurrentRole = () => {
		if (currentRole === 'driver') {
			setCurrentRole('passenger');
		}
		if (user.vehicle_plate && user.vehicle_plate !== null) {
			setCurrentRole('driver');
		}
	};
	return (
		<RolContext.Provider
			value={{ currentRole, setCurrentRole, changeCurrentRole }}
		>
			{children}
		</RolContext.Provider>
	);
};
export const useRol = () => {
	return useContext(RolContext);
};
export default RolContext;

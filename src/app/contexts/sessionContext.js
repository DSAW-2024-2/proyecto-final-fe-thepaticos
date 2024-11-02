import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { authSignin, authSignup, getUserByToken } from '../helpers/api/auth';
import { getVehicleByPlate } from '../helpers/api/vehicles';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [vehicle, setVehicle] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get('authToken');
		if (token && !user) {
			setLoading(true);
			getUserByToken(token)
				.then((res) => {
					setUser(res);
					setLoading(false);
				})
				.catch(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [user]);

	const signup = async (data) => {
		const token = await authSignup(data);
		Cookies.set('authToken', token, {
			path: '/',
			sameSite: 'Strict',
		});
		const res = await getUserByToken(token);
		setUser(res);
	};

	const signin = async (email, password) => {
		const token = await authSignin({ email, password });
		Cookies.set('authToken', token, {
			path: '/',
			sameSite: 'Strict',
		});
		const res = await getUserByToken(token);
		setUser(res);
		if (res.vehicle_plate !== undefined) {
			const carData = await getVehicleByPlate(res.vehicle_plate);
			setVehicle(carData);
		} else {
			setVehicle(null);
		}
	};

	const signout = () => {
		Swal.fire({
			title: '¿Seguro deseas cerrar sesión?',
			text: 'volverás al la página de inicio',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#9C0000',
			cancelButtonColor: '#028747',
			confirmButtonText: 'Si, cerrar sesión!',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				setLoading(true);
				Cookies.remove('authToken');
				setUser(null);
				setVehicle(null);
				router.push('/');
				setLoading(false);
			}
		});
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen text-[#028747] font-bold text-2xl'>
				<div className='flex flex-col justify-center items-center h-screen gap-10'>
					Cargando ...
					<div className='w-[150px] h-[150px] border-[10px] border-t-[10px] border-t-[#028747] border-gray-200 rounded-full animate-spin'></div>
				</div>
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{ user: user, vehicle: vehicle, signin, signout, signup, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

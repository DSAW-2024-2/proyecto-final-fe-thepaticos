import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authSignin, authSignup, getUserByToken } from '../helpers/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
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
	};

	const signout = () => {
		Cookies.remove('authToken');
		setUser(null);
		router.push('/');
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
			value={{ user: user, signin, signout, signup, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

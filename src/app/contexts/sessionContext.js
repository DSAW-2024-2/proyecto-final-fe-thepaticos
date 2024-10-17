import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Auth } from '../helpers/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const userMemo = useMemo(() => user, [user]);

	useEffect(() => {
		const token = Cookies.get('authToken');
		if (token && !user) {
			setLoading(true);
			Auth.getUserByToken(token)
				.then((res) => {
					setUser(res.user);
					setLoading(false);
				})
				.catch(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [user]);

	const signup = async (data) => {
		const token = await Auth.signup(data);
		Cookies.set('authToken', token, {
			path: '/',
			sameSite: 'Strict',
		});
		const res = await Auth.getUserByToken(token);
		setUser(res.user);
	};

	const signin = async (email, password) => {
		const token = await Auth.signin({ email, password });
		Cookies.set('authToken', token, {
			path: '/',
			sameSite: 'Strict',
		});
		const res = await Auth.getUserByToken(token);
		setUser(res.user);
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
		<AuthContext.Provider value={{ user: userMemo, signin, signout, signup }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

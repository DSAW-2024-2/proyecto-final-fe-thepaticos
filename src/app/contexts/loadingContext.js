import { createContext, useContext, useState } from 'react';
import Loader from '../ui/modals/Loader';
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{loading && <Loader />}
			{children}
		</LoadingContext.Provider>
	);
};
export const useLoading = () => {
	return useContext(LoadingContext);
};
export default LoadingContext;

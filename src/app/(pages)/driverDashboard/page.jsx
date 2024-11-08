'use client';
import { useAuth } from '@/app/contexts/sessionContext';
import { getVehicleRides } from '@/app/helpers/api/vehicles';
import RouteCard from '@/app/ui/components/driverDashboard/routeCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';
import { useEffect, useState } from 'react';
import Loader from '@/app/ui/modals/Loader';

export default function DashboardPage() {
	const [rides, setRides] = useState([]);
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getRides = async () => {
			try {
				if (user?.vehicle_plate) {
					const resRides = await getVehicleRides(user.vehicle_plate);
					setRides(resRides);
				}
			} catch (error) {
				console.error('Error fetching rides:', error);
			} finally {
				setLoading(false);
			}
		};
		getRides();
	}, []);

	const reloadRides = async () => {
		setLoading(true);
		try {
			if (user?.vehicle_plate) {
				const resRides = await getVehicleRides(user.vehicle_plate);
				setRides(resRides);
			}
		} catch (error) {
			console.error('Error reloading rides:', error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <Loader message={'Cargando información'} />;
	}

	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<FilterButton />
			<section className='w-full h-screen p-5 flex justify-center'>
				<div
					className={`bg-[#D9D9D9] shadow-gray-600 shadow-md bg-opacity-50 max-w-[98%] w-fit h-fit gap-3 overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg 
					${
						rides.length === 1
							? 'grid grid-cols-1 w-fit justify-center'
							: 'grid grid-cols-1 lg:grid-cols-2 justify-center items-center'
					}`}
				>
					{rides.length === 0 ? (
						<p className='text-gray-500 text-lg col-span-2 font-semibold'>
							No tienes rutas publicadas.
						</p>
					) : (
						rides.map((ride, index) => {
							return (
								<RouteCard key={index} ride={ride} reloadRides={reloadRides} />
							);
						})
					)}
				</div>
			</section>
		</section>
	);
}

'use client';
import { useAuth } from '@/app/contexts/sessionContext';
import { getVehicleRides } from '@/app/helpers/api/vehicles';
import RouteCard from '@/app/ui/components/driverDashboard/routeCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
	const [rides, setRides] = useState([]);
	const { user } = useAuth();
	useEffect(() => {
		const getRides = async () => {
			try {
				const resRides = await getVehicleRides(user.vehicle_plate);
				setRides(resRides);
			} catch (error) {
				console.error('Error fetching rides:', error);
			}
		};
		getRides();
	}, [user.vehicle_plate]);
	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<FilterButton />
			<section className='w-full h-screen p-5 flex justify-center'>
				<div className='bg-[#D9D9D9] shadow-gray-600 shadow-md bg-opacity-50 w-[98%] h-fit gap-3 overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg grid grid-cols-1 lg:grid-cols-2 justify-center items-center'>
					{rides &&
						rides.map((ride, index) => {
							return <RouteCard key={index} ride={ride} />;
						})}
				</div>
			</section>
		</section>
	);
}

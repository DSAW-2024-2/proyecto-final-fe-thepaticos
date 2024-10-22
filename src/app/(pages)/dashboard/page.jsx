'use client';
import { useEffect, useState } from 'react';
import AvailableTripCard from '@/app/ui/components/userDashboard/AvailableTripCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';
import Cookies from 'js-cookie';
import { getAvaliableRides } from '@/app/helpers/api/ride';

export default function DashboardPage() {
	const [rides, setRides] = useState([]);

	useEffect(() => {
		const getRides = async () => {
			try {
				const AvaliableRides = await getAvaliableRides();
				setRides(AvaliableRides);
			} catch (error) {
				console.error('Error fetching rides:', error);
			}
		};
		getRides();
	}, []);

	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<FilterButton />
			<section className='w-full h-screen p-5 pt-0 flex justify-center'>
				<div className='bg-[#D9D9D9] justify-center items-center shadow-gray-600 shadow-md bg-opacity-50 w-[98%] h-[70%] overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg flex flex-col lg:grid lg:grid-cols-2 gap-2'>
					{rides &&
						rides.map((ride, index) => (
							<AvailableTripCard key={index} ride={ride} />
						))}
				</div>
			</section>
		</section>
	);
}

'use client';
import { getAvaliableRides } from '@/app/helpers/api/ride';
import AvailableTripCard from '@/app/ui/components/userDashboard/AvailableTripCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DashboardPage() {
	const [rides, setRides] = useState([]);
	const searchParams = useSearchParams();
	const seats = searchParams.get('seats');
	const origin = searchParams.get('origin');
	const destination = searchParams.get('destination');

	useEffect(() => {
		const getRides = async () => {
			try {
				const queryParams = {
					origin: origin || '',
					destination: destination || '',
					seats: seats ? Number(seats) : 1,
				};

				const AvaliableRides = await getAvaliableRides(queryParams);

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
				<div className='flex flex-col bg-[#D9D9D9] justify-start items-start shadow-gray-600 shadow-md bg-opacity-50 w-[98%] h-[70%] overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg lg:grid lg:grid-cols-2 gap-2'>
					{rides &&
						rides.map((ride, index) => (
							<AvailableTripCard key={index} ride={ride} />
						))}
				</div>
			</section>
		</section>
	);
}

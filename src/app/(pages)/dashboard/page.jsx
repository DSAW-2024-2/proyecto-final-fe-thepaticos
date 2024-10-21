'use client';
import { useEffect, useState } from 'react';
import AvailableTripCard from '@/app/ui/components/userDashboard/AvailableTripCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';
import Cookies from 'js-cookie';

export default function DashboardPage() {
	const [tripCards, setTripCards] = useState([]);

	const getRides = async (authToken) => {
		try {
			if (!authToken) {
				console.error('Authorization token is missing');
				return;
			}

			const response = await fetch(
				'https://proyecto-final-be-thepaticos.vercel.app/ride/',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch rides');
			}

			const data = await response.json();
			const rides = data.rides || [];

			const tripCardsArray = rides.map((ride, index) => (
				<AvailableTripCard key={index} route={ride.route} />
			));

			setTripCards(tripCardsArray);
		} catch (error) {
			console.error('Error fetching rides:', error);
		}
	};

	useEffect(() => {
		const token = Cookies.get('authToken');
		getRides(token);
	}, []);

	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<FilterButton />
			<section className='w-full h-screen p-5 pt-0 flex justify-center'>
				<div className='bg-[#D9D9D9] justify-center items-center shadow-gray-600 shadow-md bg-opacity-50 w-[98%] h-[70%] overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg flex flex-col lg:grid lg:grid-cols-2 gap-2'>
					{tripCards.length > 0 ? tripCards : 'No available trips'}
				</div>
			</section>
		</section>
	);
}

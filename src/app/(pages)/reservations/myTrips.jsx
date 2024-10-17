'use client';
import AvailableTripCard from '@/app/ui/components/userDashboard/AvailableTripCard';

export default function myTrips() {
	const tripCards = [];

	for (let i = 0; i < 10; i++) {
		tripCards.push(<AvailableTripCard key={i} />);
	}

	return <div className='text-black'>Hola mundo</div>;
}

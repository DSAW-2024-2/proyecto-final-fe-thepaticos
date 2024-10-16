'use client';
import AvailableTripCard from '@/app/ui/components/userDashboard/AvailableTripCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';

export default function DashboardPage() {
	const tripCards = [];

	for (let i = 0; i < 10; i++) {
		tripCards.push(<AvailableTripCard key={i} />);
	}

	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<FilterButton />
			<section className='w-full h-screen p-5 pt-0 flex justify-center'>
				<div className='bg-[#D9D9D9] shadow-gray-600 shadow-md bg-opacity-50 w-[98%] h-[70%] overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-4'>
					{tripCards}
				</div>
			</section>
		</section>
	);
}

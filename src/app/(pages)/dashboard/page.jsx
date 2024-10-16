'use client';
import AvailableTripCard from '@/app/ui/components/userDashboard/AvailableTripCard';
import FilterButton from '@/app/ui/components/userDashboard/filterButton';

export default function DashboardPage() {
	return (
		<main className='w-full h-fit flex flex-col items-center'>
			<FilterButton />
			<section className='w-full h-fit bg-white p-5 pt-0'>
				<div className='bg-[#D9D9D9] h-[350px] bg-opacity-50 w-full flex flex-col gap-3 p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 shadow-md rounded-lg'>
					<AvailableTripCard />
				</div>
			</section>
		</main>
	);
}

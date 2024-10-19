'use client';
import RouteCard from '@/app/ui/components/driverDashboard/routeCard';
export default function DashboardPage() {
	const tripCards = [];

	for (let i = 0; i < 3; i++) {
		tripCards.push(<RouteCard key={i} />);
	}

	return (
		<section className='flex flex-col justify-center w-full items-center bg-white'>
			<section className='w-full h-screen p-5 flex justify-center'>
				<div className='bg-[#D9D9D9] shadow-gray-600 shadow-md bg-opacity-50 w-[98%] h-fit gap-3 overflow-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg grid grid-cols-1 lg:grid-cols-2 justify-center items-center'>
					{tripCards}
				</div>
			</section>
		</section>
	);
}

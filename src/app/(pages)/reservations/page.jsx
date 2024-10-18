'use client';
import ReservationCard from '@/app/ui/components/userReservations/reservationCard';

export default function DashboardPage() {
	const reservationCards = [];

	for (let i = 0; i < 10; i++) {
		reservationCards.push(<ReservationCard key={i} />);
	}

	return (
		<section className='flex flex-col justify-center w-full h-full items-center bg-white p-2'>
			<section className='w-full h-fit p-2 flex justify-center items-start'>
				<div className='bg-[#D9D9D9] shadow-gray-600 shadow-md bg-opacity-50 w-fit max-w-[99%] h-fit overflow-x-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg flex gap-3'>
					{reservationCards}
				</div>
			</section>
		</section>
	);
}

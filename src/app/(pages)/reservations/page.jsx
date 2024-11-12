'use client';
import { useAuth } from '@/app/contexts/sessionContext';
import { getUserReservations } from '@/app/helpers/api/user';
import ReservationCard from '@/app/ui/components/userReservations/reservationCard';
import { useEffect, useState } from 'react';
import Loader from '@/app/ui/modals/Loader';

export default function DashboardPage() {
	const [reservations, setReservations] = useState([]);
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getReservations = async () => {
			try {
				const resReservations = await getUserReservations(user.id);
				setReservations(resReservations);
			} catch (error) {
				console.error('Error fetching rides:', error);
			} finally {
				setLoading(false);
			}
		};
		getReservations();
	}, [user.id]);

	const reloadReservations = async () => {
		setLoading(true);
		const getReservations = async () => {
			try {
				const resReservations = await getUserReservations(user.id);
				setReservations(resReservations);
			} catch (error) {
				console.error('Error fetching rides:', error);
			} finally {
				setLoading(false);
			}
		};
		getReservations();
	};

	if (loading) {
		return <Loader message={'Cargando información'} />;
	}

	return (
		<section className='flex flex-col justify-center w-full h-full items-center bg-white p-2'>
			<section className='w-full h-full p-2 flex justify-center items-start'>
				<div className='bg-[#D9D9D9] shadow-gray-600 shadow-md bg-opacity-50 w-fit max-w-[99%] h-full overflow-x-auto p-3 border-solid border-[1px] border-[#696C70] border-opacity-50 rounded-lg flex gap-3'>
					{reservations.length > 0 ? (
						reservations.map((reservation, index) => (
							<ReservationCard
								key={index}
								item={reservation}
								reloadReservations={reloadReservations}
							/>
						))
					) : (
						<div className='text-center text-gray-500 font-semibold text-lg'>
							No tienes reservaciones guardadas
						</div>
					)}
				</div>
			</section>
		</section>
	);
}
